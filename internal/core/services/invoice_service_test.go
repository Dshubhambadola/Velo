package services

import (
	"context"
	"testing"
	"velo/internal/core"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupInvoiceTestDB(testName string) *gorm.DB {
	db, _ := gorm.Open(sqlite.Open("file:"+testName+"?mode=memory&cache=shared"), &gorm.Config{})
	db.AutoMigrate(&core.Company{}, &core.User{}, &core.Wallet{}, &core.Invoice{})
	return db
}

func TestInvoiceLifecycle(t *testing.T) {
	db := setupInvoiceTestDB(uuid.NewString())
	walletService := NewWalletService(db, nil)
	invoiceService := NewInvoiceService(db, walletService)

	companyID := uuid.New()
	userID := uuid.New()
	db.Create(&core.Company{ID: companyID, Name: "Invoicer Corp"})
	db.Create(&core.User{ID: userID, CompanyID: companyID, Email: "owner@invoicercorp.com"})

	t.Run("Create Invoice", func(t *testing.T) {
		inv, err := invoiceService.CreateInvoice(context.Background(), companyID, "Acme Corp", "billing@acme.com", 50000, "USDC", 30)
		assert.NoError(t, err)
		assert.NotNil(t, inv)
		assert.Equal(t, 50000, inv.Amount)
		assert.Equal(t, "pending", inv.Status)
	})

	t.Run("Pay Invoice", func(t *testing.T) {
		inv, _ := invoiceService.CreateInvoice(context.Background(), companyID, "Acme Corp", "billing@acme.com", 25000, "USDC", 15)

		db.Create(&core.Wallet{ID: uuid.New(), UserID: userID, Balance: "0.00", Currency: "USDC"})

		err := invoiceService.PayInvoice(context.Background(), inv.ID)
		assert.NoError(t, err)

		// Verify status
		paidInv, _ := invoiceService.GetInvoice(context.Background(), inv.ID)
		assert.Equal(t, "paid", paidInv.Status)

		// Verify Wallet funded
		var wallet core.Wallet
		db.First(&wallet, "user_id = ?", userID)
		assert.Equal(t, "250.00", wallet.Balance)
	})

	t.Run("Cannot Pay Twice", func(t *testing.T) {
		inv, _ := invoiceService.CreateInvoice(context.Background(), companyID, "Acme Corp", "billing@acme.com", 10000, "USDC", 10)

		// The wallet is already created from the previous test run if we reuse db, but to be safe:
		// db.Create(...)
		err := invoiceService.PayInvoice(context.Background(), inv.ID)
		assert.NoError(t, err)

		err = invoiceService.PayInvoice(context.Background(), inv.ID)
		assert.Error(t, err)
		assert.Contains(t, err.Error(), "already paid")
	})
}
