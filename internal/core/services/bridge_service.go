package services

import (
	"math/rand"
	"time"
	"velo/internal/core"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type BridgeService struct {
	DB *gorm.DB
}

func NewBridgeService(db *gorm.DB) *BridgeService {
	return &BridgeService{DB: db}
}

type BridgeQuote struct {
	ID            string  `json:"id"`
	SourceChain   string  `json:"source_chain"`
	DestChain     string  `json:"dest_chain"`
	Token         string  `json:"token"`
	Amount        float64 `json:"amount"`
	Fee           float64 `json:"fee"`
	EstimatedTime string  `json:"estimated_time"`
	ExchangeRate  float64 `json:"exchange_rate"`
	ExpiresAt     int64   `json:"expires_at"`
}

func (s *BridgeService) GetQuote(sourceChain, destChain, token string, amount float64) (*BridgeQuote, error) {
	// Mock logic for quote generation
	feeRate := 0.001 // 0.1%
	if sourceChain == "Ethereum" {
		feeRate = 0.005 // Higher fee for ETH
	}

	fee := amount * feeRate
	if fee < 1.0 {
		fee = 1.0 // Minimum fee
	}

	return &BridgeQuote{
		ID:            uuid.New().String(),
		SourceChain:   sourceChain,
		DestChain:     destChain,
		Token:         token,
		Amount:        amount,
		Fee:           fee,
		EstimatedTime: "5-10 mins",
		ExchangeRate:  1.0, // 1:1 for stablecoins usually
		ExpiresAt:     time.Now().Add(15 * time.Minute).Unix(),
	}, nil
}

func (s *BridgeService) ExecuteBridge(userID uuid.UUID, quoteID string) (*core.Transaction, error) {
	// Find user's wallet
	var wallet core.Wallet
	if err := s.DB.Where("user_id = ?", userID).First(&wallet).Error; err != nil {
		return nil, gorm.ErrRecordNotFound
	}
	// Create a transaction record
	tx := core.Transaction{
		WalletID:    wallet.ID,
		Type:        core.TransactionTypeWithdrawal, // Treated as withdrawal from source
		Amount:      100.0,                          // Mocked amount, effectively we'd need to store the quote state
		Currency:    "USDC",
		Status:      core.TransactionStatusPending,
		Description: "Bridge Transfer " + quoteID,
		Metadata:    core.JSONB{"reference_id": quoteID},
	}

	// Used random amount for demo if we don't have persistence for quotes
	if rand.Intn(2) == 0 {
		tx.Status = core.TransactionStatusCompleted
	}

	err := s.DB.Create(&tx).Error
	if err != nil {
		return nil, err
	}

	return &tx, nil
}
