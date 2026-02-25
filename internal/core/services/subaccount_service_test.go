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

func setupSubAccountTestDB(testName string) *gorm.DB {
	db, _ := gorm.Open(sqlite.Open("file:"+testName+"?mode=memory&cache=shared"), &gorm.Config{})
	db.AutoMigrate(&core.Company{}, &core.User{}, &core.Wallet{}, &core.SubAccount{})
	return db
}

func TestSubAccountService(t *testing.T) {
	db := setupSubAccountTestDB(uuid.NewString())
	walletService := NewWalletService(db, nil) // Mock nil provider
	service := NewSubAccountService(db, walletService)

	companyID := uuid.New()
	userID := uuid.New()

	db.Create(&core.Company{ID: companyID, Name: "SubAccount Corp"})
	db.Create(&core.User{ID: userID, CompanyID: companyID, Email: "owner@sub.com"})

	// Prepare funded wallet (100k USDC)
	wallet := core.Wallet{
		ID:       uuid.New(),
		UserID:   userID,
		Balance:  "100000.00",
		Currency: "USDC",
	}
	db.Create(&wallet)

	t.Run("Create SubAccount", func(t *testing.T) {
		subAcc, err := service.CreateSubAccount(context.Background(), companyID, userID, "Marketing", 2500000, nil, 500000) // $25k, $5k limit
		assert.NoError(t, err)
		assert.NotNil(t, subAcc)
		assert.Equal(t, 2500000, subAcc.Balance)

		// Verify Treasury Balance deducted
		var updatedWallet core.Wallet
		db.First(&updatedWallet, "user_id = ?", userID)
		assert.Equal(t, "75000.00", updatedWallet.Balance)
	})

	t.Run("Create Exceeds Balance", func(t *testing.T) {
		_, err := service.CreateSubAccount(context.Background(), companyID, userID, "Engineering", 10000000, nil, 0) // 100k exceeds remaining 75k
		assert.Error(t, err)
		assert.Contains(t, err.Error(), "insufficient funds")
	})

	t.Run("Deposit Funds", func(t *testing.T) {
		accs, _ := service.GetSubAccounts(context.Background(), companyID)
		firstAcc := accs[0]

		err := service.DepositFunds(context.Background(), userID, firstAcc.ID, 500000) // $5k
		assert.NoError(t, err)

		// Verify new state
		db.First(&firstAcc, "id = ?", firstAcc.ID)
		assert.Equal(t, 3000000, firstAcc.Balance) // $30k

		var updatedWallet core.Wallet
		db.First(&updatedWallet, "user_id = ?", userID)
		assert.Equal(t, "70000.00", updatedWallet.Balance)
	})
}
