package services

import (
	"context"
	"encoding/csv"
	"time"
	"velo/internal/core"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ReportingService struct {
	DB *gorm.DB
}

func NewReportingService(db *gorm.DB) *ReportingService {
	return &ReportingService{DB: db}
}

// GenerateBatchReportCSV creates a CSV byte slice for a specific batch's transactions
func (s *ReportingService) GenerateBatchReportCSV(ctx context.Context, companyID uuid.UUID, batchID uuid.UUID) ([]byte, error) {
	var batch core.PayrollBatch
	if err := s.DB.Preload("Patterns").Where("id = ? AND company_id = ?", batchID, companyID).First(&batch).Error; err != nil {
		return nil, err
	}

	// Create CSV in memory
	var b []byte
	writer := csv.NewWriter(&bytesBuffer{buffer: &b})

	// Header
	header := []string{"Transaction ID", "Recipient Name", "Recipient Email", "Amount", "Currency", "Status", "Created At"}
	if err := writer.Write(header); err != nil {
		return nil, err
	}

	// Rows
	for _, payment := range batch.Patterns {
		row := []string{
			payment.ID.String(),
			payment.RecipientName,
			payment.RecipientEmail,
			payment.Amount.StringFixed(2),
			payment.Currency,
			payment.Status,
			payment.CreatedAt.Format(time.RFC3339),
		}
		if err := writer.Write(row); err != nil {
			return nil, err
		}
	}

	writer.Flush()
	if err := writer.Error(); err != nil {
		return nil, err
	}

	return b, nil
}

// Simple buffer wrapper for CSV writer
type bytesBuffer struct {
	buffer *[]byte
}

func (b *bytesBuffer) Write(p []byte) (n int, err error) {
	*b.buffer = append(*b.buffer, p...)
	return len(p), nil
}

// GetCompanyAnalytics aggregates data for the dashboard charts
func (s *ReportingService) GetCompanyAnalytics(ctx context.Context, companyID uuid.UUID, startDate, endDate time.Time) (map[string]interface{}, error) {
	var totalVolume float64
	var completedBatches int64
	var failedTransactions int64

	// Simplified aggregation (in a real app, do this more efficiently in SQL)
	s.DB.Model(&core.PayrollBatch{}).
		Where("company_id = ? AND status = ? AND created_at BETWEEN ? AND ?", companyID, "completed", startDate, endDate).
		Select("COALESCE(SUM(total_amount), 0)").Scan(&totalVolume)

	s.DB.Model(&core.PayrollBatch{}).
		Where("company_id = ? AND status = ? AND created_at BETWEEN ? AND ?", companyID, "completed", startDate, endDate).
		Count(&completedBatches)

	s.DB.Model(&core.Payment{}).
		Joins("JOIN payroll_batches ON payroll_batches.id = payments.batch_id").
		Where("payroll_batches.company_id = ? AND payments.status = ? AND payments.created_at BETWEEN ? AND ?", companyID, "failed", startDate, endDate).
		Count(&failedTransactions)

	return map[string]interface{}{
		"total_volume":        totalVolume,
		"completed_batches":   completedBatches,
		"failed_transactions": failedTransactions,
		"period_start":        startDate,
		"period_end":          endDate,
	}, nil
}
