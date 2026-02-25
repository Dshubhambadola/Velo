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

type InvoiceService struct {
	DB            *gorm.DB
	WalletService *WalletService
}

func NewInvoiceService(db *gorm.DB, walletService *WalletService) *InvoiceService {
	db.AutoMigrate(&core.Invoice{})
	return &InvoiceService{
		DB:            db,
		WalletService: walletService,
	}
}

// CreateInvoice generates a new invoice for a client
func (s *InvoiceService) CreateInvoice(ctx context.Context, companyID uuid.UUID, clientName, clientEmail string, amount int, currency string, dueDays int) (*core.Invoice, error) {
	if amount <= 0 {
		return nil, errors.New("invoice amount must be greater than zero")
	}

	invoice := core.Invoice{
		ID:          uuid.New(),
		CompanyID:   companyID,
		ClientName:  clientName,
		ClientEmail: clientEmail,
		Amount:      amount,
		Currency:    currency,
		Status:      "pending",
		DueDate:     time.Now().AddDate(0, 0, dueDays),
	}

	if err := s.DB.Create(&invoice).Error; err != nil {
		return nil, err
	}

	return &invoice, nil
}

// GetCompanyInvoices returns all invoices issued by a company
func (s *InvoiceService) GetCompanyInvoices(ctx context.Context, companyID uuid.UUID) ([]core.Invoice, error) {
	var invoices []core.Invoice
	err := s.DB.Where("company_id = ?", companyID).Order("created_at desc").Find(&invoices).Error
	return invoices, err
}

// GetInvoice returns a single invoice (publicly accessible by clients)
func (s *InvoiceService) GetInvoice(ctx context.Context, invoiceID uuid.UUID) (*core.Invoice, error) {
	var invoice core.Invoice
	if err := s.DB.First(&invoice, "id = ?", invoiceID).Error; err != nil {
		return nil, err
	}
	return &invoice, nil
}

// PayInvoice simulates a client paying an invoice via a hosted link
func (s *InvoiceService) PayInvoice(ctx context.Context, invoiceID uuid.UUID) error {
	var invoice core.Invoice
	if err := s.DB.First(&invoice, "id = ?", invoiceID).Error; err != nil {
		return err
	}

	if invoice.Status == "paid" {
		return errors.New("invoice is already paid")
	}
	if invoice.Status == "cancelled" {
		return errors.New("cannot pay a cancelled invoice")
	}

	// 1. Mark as paid
	invoice.Status = "paid"
	if err := s.DB.Save(&invoice).Error; err != nil {
		return err
	}

	// 2. Fund the company's wallet
	// Finding the company owner or simply the company to deposit
	// We'll deposit to the primary company wallet. To find it, we lookup the primary user of the company.
	var owner core.User
	if err := s.DB.Where("company_id = ?", invoice.CompanyID).First(&owner).Error; err != nil {
		return err
	}

	// In reality we might use a dedicated deposit method, we'll reuse FundWallet or direct deposit.
	// For simplicity, we ensure wallet exists and fund it.
	wallet, err := s.WalletService.EnsureWallet(ctx, owner.ID)
	if err != nil {
		return err
	}

	// Add funds
	currentBalance, _ := strconv.ParseFloat(wallet.Balance, 64)
	newBalance := currentBalance + (float64(invoice.Amount) / 100.0)
	wallet.Balance = fmt.Sprintf("%.2f", newBalance)
	if err := s.DB.Save(wallet).Error; err != nil {
		return err
	}

	return nil
}
