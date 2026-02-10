package services

import (
	"context"
	"errors"
	"fmt"
	"time"

	"velo/internal/core"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
	"gorm.io/gorm"
)

type PayrollService struct {
	DB *gorm.DB
}

func NewPayrollService(db *gorm.DB) *PayrollService {
	return &PayrollService{DB: db}
}

// CreateBatch creates a new payroll batch from parsed data
func (s *PayrollService) CreateBatch(ctx context.Context, companyID, userID uuid.UUID, payments []core.Payment, description string) (*core.PayrollBatch, error) {
	totalAmount := decimal.Zero
	for _, p := range payments {
		if p.Amount.LessThanOrEqual(decimal.Zero) {
			return nil, errors.New("invalid payment amount")
		}
		totalAmount = totalAmount.Add(p.Amount)
	}

	batch := core.PayrollBatch{
		CompanyID:      companyID,
		SubmittedBy:    userID,
		Status:         "pending",
		TotalAmount:    totalAmount,
		RecipientCount: len(payments),
		Description:    description,
		Patterns:       payments,
	}

	if err := s.DB.Create(&batch).Error; err != nil {
		return nil, err
	}

	// Check if approval is needed (Rule: > $100k or specific role)
	// For MVP: approval needed if amount > 100,000
	limit := decimal.NewFromInt(100000)
	if totalAmount.GreaterThan(limit) {
		approval := core.PaymentApproval{
			BatchID:     batch.ID,
			RequestedBy: userID,
			Status:      "pending",
			Comments:    fmt.Sprintf("Auto-flagged: Amount exceeds $%s", limit.String()),
		}
		s.DB.Create(&approval)

		// Update batch status
		s.DB.Model(&batch).Update("status", "awaiting_approval")
	}

	return &batch, nil
}

// GetBatch retrieves a batch by ID
func (s *PayrollService) GetBatch(batchID uuid.UUID) (*core.PayrollBatch, error) {
	var batch core.PayrollBatch
	if err := s.DB.Preload("Patterns").First(&batch, "id = ?", batchID).Error; err != nil {
		return nil, err
	}
	return &batch, nil
}

// ApproveBatch approves a batch for processing
func (s *PayrollService) ApproveBatch(ctx context.Context, approvalID, approverID uuid.UUID) error {
	var approval core.PaymentApproval
	if err := s.DB.First(&approval, "id = ?", approvalID).Error; err != nil {
		return err
	}

	if approval.Status != "pending" {
		return errors.New("approval is not pending")
	}

	// Update Approval
	approval.Status = "approved"
	approval.ApprovedBy = approverID
	approval.DecidedAt = time.Now()
	s.DB.Save(&approval)

	// Update Batch Status
	s.DB.Model(&core.PayrollBatch{}).Where("id = ?", approval.BatchID).Update("status", "ready_for_processing")

	// Trigger Async Processing (In a real system, send to Kafka/Queue)
	// go s.ProcessBatch(approval.BatchID)

	return nil
}
