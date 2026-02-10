package ports

import (
	"context"
)

// PaymentProvider - abstraction for all payment providers
type PaymentProvider interface {
	// Create wallet for user
	CreateWallet(ctx context.Context, userID string) (*Wallet, error)

	// Transfer funds
	Transfer(ctx context.Context, req TransferRequest) (*TransferResponse, error)

	// Get wallet balance
	GetBalance(ctx context.Context, walletID string) (*Balance, error)

	// Provider name (for logging/monitoring)
	Name() string
}

// Domain models for Payment Ports
type Wallet struct {
	ID       string
	Balance  string
	Currency string
}

type TransferRequest struct {
	IdempotencyKey     string
	SourceWalletID     string
	DestinationAddress string
	Amount             string
	Chain              string // ETH, MATIC, BASE
	Memo               string
}

type TransferResponse struct {
	TransferID      string
	Status          string // pending, processing, complete, failed
	TransactionHash string
	Fee             string
}

type Balance struct {
	Available string
	Pending   string
	Currency  string
}
