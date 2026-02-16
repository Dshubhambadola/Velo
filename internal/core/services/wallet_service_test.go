package services_test

import (
	"context"
	"errors"
	"testing"
	"time"

	"velo/internal/core"
	"velo/internal/core/services"
	"velo/internal/ports"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Mock Payment Provider
type MockPaymentProvider struct {
	mock.Mock
}

func (m *MockPaymentProvider) Name() string {
	return "mock_provider"
}

func (m *MockPaymentProvider) CreateWallet(ctx context.Context, userID string) (*ports.Wallet, error) {
	args := m.Called(ctx, userID)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*ports.Wallet), args.Error(1)
}

func (m *MockPaymentProvider) GetBalance(ctx context.Context, walletID string) (*ports.Balance, error) {
	args := m.Called(ctx, walletID)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*ports.Balance), args.Error(1)
}

func (m *MockPaymentProvider) GetTransactions(ctx context.Context, walletID string) ([]ports.Transaction, error) {
	args := m.Called(ctx, walletID)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).([]ports.Transaction), args.Error(1)
}

func (m *MockPaymentProvider) Transfer(ctx context.Context, req ports.TransferRequest) (*ports.TransferResponse, error) {
	args := m.Called(ctx, req)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*ports.TransferResponse), args.Error(1)
}

func setupWalletDB(t *testing.T) *gorm.DB {
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	require.NoError(t, err)
	err = db.AutoMigrate(&core.Wallet{}, &core.WalletSetting{}, &core.WalletLimit{}, &core.Transaction{})
	require.NoError(t, err)
	return db
}

func TestWalletService_EnsureWallet(t *testing.T) {
	db := setupWalletDB(t)
	mockProvider := new(MockPaymentProvider)
	service := services.NewWalletService(db, mockProvider)

	ctx := context.Background()
	userID := uuid.New()

	// Mock Provider Response
	mockWallet := &ports.Wallet{
		ID:       "ext_wallet_123",
		Currency: "USD",
		Balance:  "0.00",
	}
	mockProvider.On("CreateWallet", ctx, userID.String()).Return(mockWallet, nil)

	// Call Service
	wallet, err := service.EnsureWallet(ctx, userID)

	require.NoError(t, err)
	require.NotNil(t, wallet)
	assert.Equal(t, "ext_wallet_123", wallet.ExternalID)
	assert.Equal(t, "mock_provider", wallet.Provider)

	// Verify DB Persistence
	var dbWallet core.Wallet
	err = db.First(&dbWallet, "user_id = ?", userID).Error
	assert.NoError(t, err)

	// Verify Default Settings Created
	var settings core.WalletSetting
	err = db.First(&settings, "user_id = ?", userID).Error
	assert.NoError(t, err)
}

func TestWalletService_GetBalance(t *testing.T) {
	db := setupWalletDB(t)
	mockProvider := new(MockPaymentProvider)
	service := services.NewWalletService(db, mockProvider)
	ctx := context.Background()
	userID := uuid.New()

	// Seed Wallet with explicit ID
	wallet := core.Wallet{
		ID:         uuid.New(),
		UserID:     userID,
		ExternalID: "ext_123",
		Balance:    "100.00",
		Currency:   "USD",
	}
	err := db.Create(&wallet).Error
	require.NoError(t, err)

	// Mock Balance Call
	mockBalance := &ports.Balance{Available: "150.00", Currency: "USD"}
	mockProvider.On("GetBalance", ctx, "ext_123").Return(mockBalance, nil)

	// Test
	balance, err := service.GetBalance(ctx, userID)

	require.NoError(t, err)
	assert.Equal(t, "150.00", balance.Available)

	// Wait for async update (optional in unit test, but good practice)
	time.Sleep(10 * time.Millisecond)

	// Verify DB Update
	var updatedWallet core.Wallet
	db.First(&updatedWallet, "user_id = ?", userID)
	assert.Equal(t, "150.00", updatedWallet.Balance)
}

func TestWalletService_GetBalance_ProviderError(t *testing.T) {
	db := setupWalletDB(t)
	mockProvider := new(MockPaymentProvider)
	service := services.NewWalletService(db, mockProvider)
	ctx := context.Background()
	userID := uuid.New()

	// Seed Wallet with explicit ID
	wallet := core.Wallet{
		ID:         uuid.New(),
		UserID:     userID,
		ExternalID: "ext_123",
		Balance:    "100.00", // Old balance
		Currency:   "USD",
	}
	err := db.Create(&wallet).Error
	require.NoError(t, err)

	// Mock Provider Failure
	mockProvider.On("GetBalance", ctx, "ext_123").Return(nil, errors.New("provider down"))

	// Test - Should fall back to DB balance
	balance, err := service.GetBalance(ctx, userID)

	require.NoError(t, err)
	assert.Equal(t, "100.00", balance.Available)
}
