package services_test

import (
	"strings"
	"testing"

	"velo/internal/core/services"

	"github.com/shopspring/decimal"
	"github.com/stretchr/testify/assert"
)

func TestParsePayrollCSV(t *testing.T) {
	csvContent := `Name,Email,Wallet,Amount
John Doe,john@example.com,0x1234567890123456789012345678901234567890,100.50
Jane Doe,jane@example.com,0x0987654321098765432109876543210987654321,200.00`

	reader := strings.NewReader(csvContent)
	payments, err := services.ParsePayrollCSV(reader, "")

	assert.NoError(t, err)
	assert.Len(t, payments, 2)

	assert.Equal(t, "John Doe", payments[0].RecipientName)
	assert.Equal(t, "john@example.com", payments[0].RecipientEmail)
	assert.Equal(t, "0x1234567890123456789012345678901234567890", payments[0].RecipientWallet)
	assert.Equal(t, decimal.NewFromFloat(100.50).String(), payments[0].Amount.String())
}

func TestParsePayrollCSV_InvalidFormat(t *testing.T) {
	csvContent := `Name,Email
John Doe,john@example.com`

	reader := strings.NewReader(csvContent)
	_, err := services.ParsePayrollCSV(reader, "")

	assert.Error(t, err)
	assert.Contains(t, err.Error(), "invalid csv format")
}
