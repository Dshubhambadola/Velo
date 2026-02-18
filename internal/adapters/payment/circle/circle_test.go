package circle

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestCircleAdapter_SimulationMode(t *testing.T) {
	// Initialize with empty API key to trigger simulation mode
	adapter := NewCircleAdapter("", true)

	assert.Equal(t, "circle-simulation", adapter.Name())

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Test CreateWallet
	wallet, err := adapter.CreateWallet(ctx, "test-user-id")
	assert.NoError(t, err)
	assert.NotNil(t, wallet)
	assert.NotEmpty(t, wallet.ID)
	assert.Equal(t, "1000.00", wallet.Balance)
	assert.Equal(t, "USD", wallet.Currency)

	// Test GetBalance
	balance, err := adapter.GetBalance(ctx, wallet.ID)
	assert.NoError(t, err)
	assert.NotNil(t, balance)
	assert.Equal(t, "1000.00", balance.Available)

	// Test GetTransactions
	txs, err := adapter.GetTransactions(ctx, wallet.ID)
	assert.NoError(t, err)
	assert.NotEmpty(t, txs)
	assert.Equal(t, "deposit", txs[0].Type)
}
