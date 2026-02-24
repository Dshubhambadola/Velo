package services

import (
	"context"
	"errors"
	"fmt"
	"math/rand"
	"strconv"

	"velo/internal/core"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type FXService struct {
	DB *gorm.DB
}

func NewFXService(db *gorm.DB) *FXService {
	return &FXService{DB: db}
}

// GetRate simulates returning the exchange rate from source to target.
func (s *FXService) GetRate(ctx context.Context, source, target string) (float64, error) {
	if source == target {
		return 1.0, nil
	}

	// Mock base rates to USDC
	baseRates := map[string]float64{
		"EUR":  1.08, // 1 EUR = 1.08 USDC
		"GBP":  1.26, // 1 GBP = 1.26 USDC
		"USD":  1.00, // 1 USD = 1.00 USDC
		"USDC": 1.00,
	}

	sourceRate, okSource := baseRates[source]
	targetRate, okTarget := baseRates[target]

	if !okSource || !okTarget {
		return 0, fmt.Errorf("unsupported currency pair: %s to %s", source, target)
	}

	// Add minor random fluctuation for simulation realism if it's not stablecoin parity
	fluctuation := (rand.Float64() - 0.5) * 0.005 // +/- 0.25%
	if source == "USD" && target == "USDC" || source == "USDC" && target == "USD" {
		fluctuation = 0
	}

	rate := (sourceRate / targetRate) + fluctuation
	return rate, nil
}

// Convert processes an auto-conversion by deducting from the source balance and adding to the target
func (s *FXService) Convert(ctx context.Context, walletID uuid.UUID, sourceCurrency, targetCurrency string, amount float64) error {
	var wallet core.Wallet
	if err := s.DB.First(&wallet, "id = ?", walletID).Error; err != nil {
		return err
	}

	rate, err := s.GetRate(ctx, sourceCurrency, targetCurrency)
	if err != nil {
		return err
	}

	convertedAmount := amount * rate

	// Parse current balances
	fiatBalances := wallet.FiatBalances
	if fiatBalances == nil {
		fiatBalances = make(core.JSON)
	}

	// Helper to get float from map or string
	getBalance := func(curr string) float64 {
		if curr == wallet.Currency {
			val, _ := strconv.ParseFloat(wallet.Balance, 64)
			return val
		}
		if valStr, ok := fiatBalances[curr].(string); ok {
			val, _ := strconv.ParseFloat(valStr, 64)
			return val
		}
		return 0
	}

	// Helper to set float
	setBalance := func(curr string, val float64) {
		valStr := fmt.Sprintf("%.2f", val)
		if curr == wallet.Currency {
			wallet.Balance = valStr
		} else {
			fiatBalances[curr] = valStr
		}
	}

	sourceBal := getBalance(sourceCurrency)
	if sourceBal < amount {
		return errors.New("insufficient balance for conversion")
	}

	targetBal := getBalance(targetCurrency)

	setBalance(sourceCurrency, sourceBal-amount)
	setBalance(targetCurrency, targetBal+convertedAmount)

	wallet.FiatBalances = fiatBalances

	return s.DB.Save(&wallet).Error
}
