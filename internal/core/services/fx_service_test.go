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

func setupFXTestDB() *gorm.DB {
	db, _ := gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{})
	db.AutoMigrate(&core.Wallet{})
	return db
}

func TestFXService_GetRate(t *testing.T) {
	db := setupFXTestDB()
	service := NewFXService(db)

	rate, err := service.GetRate(context.Background(), "EUR", "USDC")
	assert.NoError(t, err)
	assert.Greater(t, rate, 1.0) // EUR > USDC

	rate, err = service.GetRate(context.Background(), "USD", "USDC")
	assert.NoError(t, err)
	assert.Equal(t, 1.0, rate)

	_, err = service.GetRate(context.Background(), "INVALID", "USDC")
	assert.Error(t, err)
}

func TestFXService_Convert(t *testing.T) {
	db := setupFXTestDB()
	service := NewFXService(db)

	fiatBalances := make(core.JSON)
	fiatBalances["EUR"] = "100.00"

	wallet := core.Wallet{
		ID:           uuid.New(),
		Currency:     "USDC",
		Balance:      "50.00",
		FiatBalances: fiatBalances,
	}
	db.Create(&wallet)

	t.Run("Convert EUR to USDC", func(t *testing.T) {
		err := service.Convert(context.Background(), wallet.ID, "EUR", "USDC", 50.00)
		assert.NoError(t, err)

		var updatedWallet core.Wallet
		db.First(&updatedWallet, "id = ?", wallet.ID)

		// EUR should be 50.00 now
		assert.Equal(t, "50.00", updatedWallet.FiatBalances["EUR"])

		// USDC should be > 100 since 50 EUR > 50 USDC
		assert.NotEqual(t, "50.00", updatedWallet.Balance)
	})

	t.Run("Convert USDC to GBP", func(t *testing.T) {
		err := service.Convert(context.Background(), wallet.ID, "USDC", "GBP", 10.00)
		assert.NoError(t, err)

		var updatedWallet core.Wallet
		db.First(&updatedWallet, "id = ?", wallet.ID)

		assert.NotEmpty(t, updatedWallet.FiatBalances["GBP"])
	})

	t.Run("Insufficient Balance", func(t *testing.T) {
		err := service.Convert(context.Background(), wallet.ID, "EUR", "USDC", 1000.00)
		assert.Error(t, err)
		assert.Contains(t, err.Error(), "insufficient balance")
	})
}
