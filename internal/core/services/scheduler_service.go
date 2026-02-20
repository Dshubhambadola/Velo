package services

import (
	"log"
	"time"
	"velo/internal/core"

	"gorm.io/gorm"
)

type SchedulerService struct {
	db             *gorm.DB
	payrollService *PayrollService
}

func NewSchedulerService(db *gorm.DB, payrollService *PayrollService) *SchedulerService {
	return &SchedulerService{
		db:             db,
		payrollService: payrollService,
	}
}

// StartScheduler starts a ticker to check for recurring payments
func (s *SchedulerService) StartScheduler(interval time.Duration) {
	ticker := time.NewTicker(interval)
	go func() {
		for range ticker.C {
			s.ProcessRecurringBatches()
		}
	}()
}

// ProcessRecurringBatches finds due batches and creates new instances
func (s *SchedulerService) ProcessRecurringBatches() {
	var templates []core.PayrollBatch
	now := time.Now()

	// Find batches that are recurring and due
	if err := s.db.Where("recurrence_rule != ? AND next_execution_at <= ?", "none", now).Find(&templates).Error; err != nil {
		log.Printf("Scheduler: Failed to fetch templates: %v", err)
		return
	}

	for _, template := range templates {
		if err := s.ExecuteRecurringBatch(&template); err != nil {
			log.Printf("Scheduler: Failed to process batch %s: %v", template.ID, err)
			continue
		}
	}
}

func (s *SchedulerService) ExecuteRecurringBatch(template *core.PayrollBatch) error {
	return s.db.Transaction(func(tx *gorm.DB) error {
		// 1. Create new batch from template
		newBatch := core.PayrollBatch{
			CompanyID:      template.CompanyID,
			SubmittedBy:    template.SubmittedBy, // Or system user?
			Status:         "pending",            // Require approval/execution? Or "processing"? Let's do pending for safety.
			TotalAmount:    template.TotalAmount,
			Currency:       template.Currency,
			RecipientCount: template.RecipientCount,
			Description:    template.Description + " (Recurring: " + time.Now().Format("2006-01-02") + ")",
			CreatedAt:      time.Now(),
			UpdatedAt:      time.Now(),
		}

		if err := tx.Create(&newBatch).Error; err != nil {
			return err
		}

		// 2. Copy Patterns (Payments)
		var payments []core.Payment
		if err := tx.Where("batch_id = ?", template.ID).Find(&payments).Error; err != nil {
			return err
		}

		for _, payment := range payments {
			newPayment := core.Payment{
				BatchID:         newBatch.ID,
				RecipientName:   payment.RecipientName,
				RecipientEmail:  payment.RecipientEmail,
				RecipientWallet: payment.RecipientWallet,
				Amount:          payment.Amount,
				Currency:        payment.Currency,
				Status:          "pending",
				CreatedAt:       time.Now(),
				UpdatedAt:       time.Now(),
			}
			if err := tx.Create(&newPayment).Error; err != nil {
				return err
			}
		}

		// 3. Update Template NextExecutionAt
		nextTime := s.calculateNextExecution(template.NextExecutionAt, template.RecurrenceRule)
		if err := tx.Model(template).Update("next_execution_at", nextTime).Error; err != nil {
			return err
		}

		log.Printf("Scheduler: Created new batch %s from template %s", newBatch.ID, template.ID)
		return nil
	})
}

func (s *SchedulerService) calculateNextExecution(current time.Time, rule string) time.Time {
	switch rule {
	case "weekly":
		return current.AddDate(0, 0, 7)
	case "bi-weekly":
		return current.AddDate(0, 0, 14)
	case "monthly":
		return current.AddDate(0, 1, 0)
	default:
		return current.AddDate(0, 0, 1) // Default sanity fallback
	}
}
