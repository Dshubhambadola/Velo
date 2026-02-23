package services

import (
	"context"
	"errors"
	"time"

	"velo/internal/core"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type YieldService struct {
	DB *gorm.DB
}

func NewYieldService(db *gorm.DB) *YieldService {
	return &YieldService{DB: db}
}

// GetBalance retrieves the yield balance for a company
func (s *YieldService) GetBalance(ctx context.Context, companyID uuid.UUID) (*core.YieldBalance, error) {
	var balance core.YieldBalance
	err := s.DB.Where("company_id = ?", companyID).First(&balance).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			balance = core.YieldBalance{
				CompanyID:       companyID,
				AllocatedAmount: 0,
				EarnedInterest:  0,
				CurrentAPY:      4.25, // Mock initial APY
				LastAccrualTime: time.Now(),
			}
			if createErr := s.DB.Create(&balance).Error; createErr != nil {
				return nil, createErr
			}
			return &balance, nil
		}
		return nil, err
	}
	return &balance, nil
}

// AllocateFunds moves funds from main balance to yield protocol (simulated)
// In reality, this would require interacting with WalletService to debit the main wallet
func (s *YieldService) AllocateFunds(ctx context.Context, companyID uuid.UUID, amount int) error {
	if amount <= 0 {
		return errors.New("invalid amount")
	}

	return s.DB.Transaction(func(tx *gorm.DB) error {
		balance, err := s.GetBalance(ctx, companyID)
		if err != nil {
			return err
		}

		balance.AllocatedAmount += amount
		balance.UpdatedAt = time.Now()

		return tx.Save(balance).Error
	})
}

// WithdrawFunds moves funds from yield protocol back to main balance
// Also requires interacting with WalletService to credit main wallet
func (s *YieldService) WithdrawFunds(ctx context.Context, companyID uuid.UUID, amount int) error {
	if amount <= 0 {
		return errors.New("invalid amount")
	}

	return s.DB.Transaction(func(tx *gorm.DB) error {
		balance, err := s.GetBalance(ctx, companyID)
		if err != nil {
			return err
		}

		if balance.AllocatedAmount < amount {
			return errors.New("insufficient allocated funds")
		}

		balance.AllocatedAmount -= amount
		balance.UpdatedAt = time.Now()

		return tx.Save(balance).Error
	})
}

// AccrueInterest calculates and adds daily interest to the balance
func (s *YieldService) AccrueInterest(ctx context.Context) error {
	// Formula: (AllocatedAmount * (APY / 100)) / 365

	// Fast-forward simulation: for testing we might accrue more frequently,
	// but standard logic is daily.

	return s.DB.Transaction(func(tx *gorm.DB) error {
		var balances []core.YieldBalance
		if err := tx.Where("allocated_amount > 0").Find(&balances).Error; err != nil {
			return err
		}

		now := time.Now()

		for _, balance := range balances {
			// Calculate days since last accrual (prevent double-accrual on same day if called manually)
			hoursSince := now.Sub(balance.LastAccrualTime).Hours()
			if hoursSince < 24 {
				continue // Skip if already accrued today
			}

			daysToAccrue := int(hoursSince / 24)

			// Daily interest
			annualInterest := float64(balance.AllocatedAmount) * (balance.CurrentAPY / 100.0)
			dailyInterest := annualInterest / 365.0

			totalNewInterest := int(dailyInterest * float64(daysToAccrue))

			if totalNewInterest > 0 {
				balance.EarnedInterest += totalNewInterest
				balance.AllocatedAmount += totalNewInterest // Auto-compounding
				balance.LastAccrualTime = now
				balance.UpdatedAt = now

				if err := tx.Save(&balance).Error; err != nil {
					return err
				}
			}
		}

		return nil
	})
}
