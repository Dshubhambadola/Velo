package services

import (
	"context"
	"testing"
	"time"
	"velo/internal/core"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupYieldTestDB(testName string) *gorm.DB {
	db, _ := gorm.Open(sqlite.Open("file:"+testName+"?mode=memory&cache=shared"), &gorm.Config{})
	db.AutoMigrate(&core.Company{}, &core.YieldBalance{})
	return db
}

func TestYieldAllocation(t *testing.T) {
	db := setupYieldTestDB(uuid.NewString())
	service := NewYieldService(db)

	companyID := uuid.New()
	db.Create(&core.Company{ID: companyID, Name: "Yield Corp"})

	t.Run("Get Initial Balance", func(t *testing.T) {
		balance, err := service.GetBalance(context.Background(), companyID)
		assert.NoError(t, err)
		assert.Equal(t, 0, balance.AllocatedAmount)
		assert.Equal(t, 4.25, balance.CurrentAPY)
	})

	t.Run("Allocate Funds", func(t *testing.T) {
		err := service.AllocateFunds(context.Background(), companyID, 100000) // $1,000.00
		assert.NoError(t, err)

		balance, _ := service.GetBalance(context.Background(), companyID)
		assert.Equal(t, 100000, balance.AllocatedAmount)
	})

	t.Run("Withdraw Funds", func(t *testing.T) {
		err := service.WithdrawFunds(context.Background(), companyID, 50000) // $500.00
		assert.NoError(t, err)

		balance, _ := service.GetBalance(context.Background(), companyID)
		assert.Equal(t, 50000, balance.AllocatedAmount)
	})

	t.Run("Withdraw Insufficient Funds", func(t *testing.T) {
		err := service.WithdrawFunds(context.Background(), companyID, 100000)
		assert.Error(t, err)
		assert.Contains(t, err.Error(), "insufficient allocated funds")
	})
}

func TestYieldAccrual(t *testing.T) {
	db := setupYieldTestDB(uuid.NewString())
	service := NewYieldService(db)

	companyID := uuid.New()
	db.Create(&core.Company{ID: companyID, Name: "Yield Corp"})

	// Setup initial highly funded account 10 days ago
	daysToSimulate := 10
	initialAmount := 1000000 // $10,000.00
	pastDate := time.Now().AddDate(0, 0, -daysToSimulate)

	balance := &core.YieldBalance{
		CompanyID:       companyID,
		AllocatedAmount: initialAmount,
		EarnedInterest:  0,
		CurrentAPY:      5.0, // 5% APY
		LastAccrualTime: pastDate,
	}
	db.Create(balance)

	t.Run("Accrue Interest After 10 Days", func(t *testing.T) {
		err := service.AccrueInterest(context.Background())
		assert.NoError(t, err)

		updatedBalance, _ := service.GetBalance(context.Background(), companyID)

		// Expected formula: 1000000 * 0.05 / 365 * 10 = ~136.98 cents = 136
		expectedInterest := int(float64(initialAmount) * 0.05 / 365.0 * float64(daysToSimulate))

		assert.Equal(t, expectedInterest, updatedBalance.EarnedInterest)
		// Auto compounding
		assert.Equal(t, initialAmount+expectedInterest, updatedBalance.AllocatedAmount)

		// Ensure time updated to recent
		assert.WithinDuration(t, time.Now(), updatedBalance.LastAccrualTime, 1*time.Minute)
	})
}
