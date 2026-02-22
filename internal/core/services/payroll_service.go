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
func (s *PayrollService) CreateBatch(ctx context.Context, companyID, userID uuid.UUID, payments []core.Payment, description string, recurrenceRule string, firstExecutionAt time.Time) (*core.PayrollBatch, error) {
	batchID := uuid.New()
	totalAmount := decimal.Zero
	for i, p := range payments {
		if p.Amount.LessThanOrEqual(decimal.Zero) {
			return nil, errors.New("invalid payment amount")
		}
		// Assign ID and BatchID to payment
		payments[i].ID = uuid.New()
		payments[i].BatchID = batchID
		totalAmount = totalAmount.Add(p.Amount)
	}

	batch := core.PayrollBatch{
		ID:              batchID,
		CompanyID:       companyID,
		SubmittedBy:     userID,
		Status:          "pending",
		TotalAmount:     totalAmount,
		RecipientCount:  len(payments),
		Description:     description,
		RecurrenceRule:  recurrenceRule,
		NextExecutionAt: firstExecutionAt,
		Patterns:        payments,
	}

	if err := s.DB.Create(&batch).Error; err != nil {
		return nil, err
	}

	// Check if approval is needed
	// For MVP: approval needed if amount > 10000. Required approvals: 2.
	limit := decimal.NewFromInt(10000)
	if totalAmount.GreaterThan(limit) {
		approval := core.PaymentApproval{
			ID:                uuid.New(),
			BatchID:           batch.ID,
			RequestedBy:       userID,
			RequiredApprovals: 2,
			CurrentApprovals:  0,
			Status:            "pending",
			Comments:          fmt.Sprintf("Auto-flagged: Amount exceeds $%s. Requires 2 approvals.", limit.String()),
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

// ApproveBatch approves a batch for processing (or adds a signature for multi-approval)
func (s *PayrollService) ApproveBatch(ctx context.Context, approvalID, approverID uuid.UUID) error {
	var approval core.PaymentApproval
	if err := s.DB.Preload("Signatures").First(&approval, "id = ?", approvalID).Error; err != nil {
		return err
	}

	if approval.Status == "approved" || approval.Status == "rejected" {
		return errors.New("approval is already finalized")
	}

	// Rule 1: Maker cannot be Checker
	if approval.RequestedBy == approverID {
		return errors.New("creator cannot approve their own batch")
	}

	// Rule 2: Cannot approve multiple times
	for _, sig := range approval.Signatures {
		if sig.UserID == approverID {
			return errors.New("user has already approved this batch")
		}
	}

	// Record the signature
	signature := core.PaymentApprovalSignature{
		ID:         uuid.New(),
		ApprovalID: approval.ID,
		UserID:     approverID,
		Status:     "approved",
		CreatedAt:  time.Now(),
	}
	s.DB.Create(&signature)

	// Update Approval counters
	approval.CurrentApprovals++
	if approval.CurrentApprovals >= approval.RequiredApprovals {
		approval.Status = "approved"
		now := time.Now()
		approval.DecidedAt = &now

		// Update Batch Status
		s.DB.Model(&core.PayrollBatch{}).Where("id = ?", approval.BatchID).Update("status", "ready_for_processing")
	} else {
		approval.Status = "partially_approved"
	}
	s.DB.Save(&approval)

	return nil
}

// ListBatches retrieves all batches for a company
func (s *PayrollService) ListBatches(companyID uuid.UUID) ([]core.PayrollBatch, error) {
	var batches []core.PayrollBatch
	if err := s.DB.Where("company_id = ?", companyID).Order("created_at desc").Find(&batches).Error; err != nil {
		return nil, err
	}
	return batches, nil
}

// GetBatchDetails retrieves a batch by ID with payments
func (s *PayrollService) GetBatchDetails(batchID uuid.UUID) (*core.PayrollBatch, error) {
	var batch core.PayrollBatch
	if err := s.DB.Preload("Patterns").First(&batch, "id = ?", batchID).Error; err != nil {
		return nil, err
	}
	return &batch, nil
}

// ExecuteBatch processes a batch
func (s *PayrollService) ExecuteBatch(ctx context.Context, batchID uuid.UUID) error {
	var batch core.PayrollBatch
	if err := s.DB.First(&batch, "id = ?", batchID).Error; err != nil {
		return err
	}

	if batch.Status == "completed" || batch.Status == "processing" {
		return errors.New("batch is already processed")
	}

	// Update Status
	batch.Status = "processing"
	s.DB.Save(&batch)

	// Mock Execution (In real app, call Wallet Service)
	time.Sleep(2 * time.Second) // Simulate processing

	batch.Status = "completed"
	s.DB.Save(&batch)

	return nil
}
