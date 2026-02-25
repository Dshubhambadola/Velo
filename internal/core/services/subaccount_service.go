package services

import (
	"context"
	"errors"
	"fmt"
	"strconv"
	"time"

	"velo/internal/core"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type SubAccountService struct {
	DB            *gorm.DB
	WalletService *WalletService
}

func NewSubAccountService(db *gorm.DB, walletService *WalletService) *SubAccountService {
	db.AutoMigrate(&core.SubAccount{})
	return &SubAccountService{
		DB:            db,
		WalletService: walletService,
	}
}

// CreateSubAccount creates a new departmental account and funds it from the main treasury
func (s *SubAccountService) CreateSubAccount(ctx context.Context, companyID, userID uuid.UUID, name string, initialFunding int, managerID *uuid.UUID, spendLimit int) (*core.SubAccount, error) {
	if initialFunding < 0 {
		return nil, errors.New("initial funding cannot be negative")
	}

	wallet, err := s.WalletService.EnsureWallet(ctx, userID)
	if err != nil {
		return nil, err
	}

	// Validate balance
	currentBalance, _ := strconv.ParseFloat(wallet.Balance, 64)
	fundingDollars := float64(initialFunding) / 100.0

	if currentBalance < fundingDollars {
		return nil, errors.New("insufficient funds in treasury to fund sub-account")
	}

	// Deduct from treasury
	wallet.Balance = fmt.Sprintf("%.2f", currentBalance-fundingDollars)
	if err := s.DB.Save(wallet).Error; err != nil {
		return nil, err
	}

	// Create SubAccount
	subAcc := core.SubAccount{
		ID:         uuid.New(),
		CompanyID:  companyID,
		WalletID:   wallet.ID,
		Name:       name,
		Balance:    initialFunding,
		Currency:   "USDC",
		ManagerID:  managerID,
		SpendLimit: spendLimit,
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
	}

	if err := s.DB.Create(&subAcc).Error; err != nil {
		return nil, err
	}

	return &subAcc, nil
}

// GetSubAccounts returns all subaccounts for a company
func (s *SubAccountService) GetSubAccounts(ctx context.Context, companyID uuid.UUID) ([]core.SubAccount, error) {
	var accounts []core.SubAccount
	if err := s.DB.Where("company_id = ?", companyID).Find(&accounts).Error; err != nil {
		return nil, err
	}
	return accounts, nil
}

// DepositFunds moves money from Treasury to SubAccount
func (s *SubAccountService) DepositFunds(ctx context.Context, userID, subAccountID uuid.UUID, amount int) error {
	if amount <= 0 {
		return errors.New("deposit amount must be greater than zero")
	}

	wallet, err := s.WalletService.EnsureWallet(ctx, userID)
	if err != nil {
		return err
	}

	var subAcc core.SubAccount
	if err := s.DB.First(&subAcc, "id = ?", subAccountID).Error; err != nil {
		return err
	}

	currentBalance, _ := strconv.ParseFloat(wallet.Balance, 64)
	fundingDollars := float64(amount) / 100.0

	if currentBalance < fundingDollars {
		return errors.New("insufficient treasury funds")
	}

	// Transaction
	return s.DB.Transaction(func(tx *gorm.DB) error {
		wallet.Balance = fmt.Sprintf("%.2f", currentBalance-fundingDollars)
		if err := tx.Save(wallet).Error; err != nil {
			return err
		}

		subAcc.Balance += amount
		return tx.Save(&subAcc).Error
	})
}
