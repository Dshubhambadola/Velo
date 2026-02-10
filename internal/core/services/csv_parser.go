package services

import (
	"encoding/csv"
	"errors"
	"io"
	"strconv"
	"strings"

	"velo/internal/core"

	"github.com/shopspring/decimal"
)

// ParsePayrollCSV parses a CSV file and returns a list of Payment objects
func ParsePayrollCSV(file io.Reader, batchID string) ([]core.Payment, error) {
	reader := csv.NewReader(file)

	// Skip header
	if _, err := reader.Read(); err != nil {
		return nil, err
	}

	var payments []core.Payment
	line := 1

	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}
		line++

		if len(record) < 4 {
			return nil, errors.New("invalid csv format")
		}

		// Expected format: Name, Email, Wallet, Amount
		name := strings.TrimSpace(record[0])
		email := strings.TrimSpace(record[1])
		wallet := strings.TrimSpace(record[2])
		amountStr := strings.TrimSpace(record[3])

		amount, err := decimal.NewFromString(amountStr)
		if err != nil {
			return nil, errors.New("invalid amount at line " + strconv.Itoa(line))
		}

		payment := core.Payment{
			RecipientName:   name,
			RecipientEmail:  email,
			RecipientWallet: wallet,
			Amount:          amount,
			Status:          "pending",
		}

		payments = append(payments, payment)
	}

	return payments, nil
}
