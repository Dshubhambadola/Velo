package circle

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"velo/internal/ports"

	"github.com/google/uuid"
)

type CircleAdapter struct {
	apiKey  string
	baseURL string
	client  *http.Client
}

func NewCircleAdapter(apiKey string, sandbox bool) ports.PaymentProvider {
	baseURL := "https://api.circle.com"
	if sandbox {
		baseURL = "https://api-sandbox.circle.com"
	}

	return &CircleAdapter{
		apiKey:  apiKey,
		baseURL: baseURL,
		client:  &http.Client{Timeout: 30 * time.Second},
	}
}

func (c *CircleAdapter) CreateWallet(ctx context.Context, userID string) (*ports.Wallet, error) {
	// For Circle API v1, managing wallets usually involves "Master Wallet" or "User Controlled Wallets".
	// For MVP, we might assume a single master wallet or generating addresses.
	// But let's follow the PRD logic of creating a wallet.

	payload := map[string]interface{}{
		"idempotencyKey": uuid.New().String(),
		"description":    "Wallet for user " + userID,
	}

	resp, err := c.makeRequest(ctx, "POST", "/v1/wallets", payload)
	if err != nil {
		return nil, err
	}

	var result struct {
		Data struct {
			WalletID string `json:"walletId"`
			Balances []struct {
				Amount   string `json:"amount"`
				Currency string `json:"currency"`
			} `json:"balances"`
		} `json:"data"`
	}

	if err := json.Unmarshal(resp, &result); err != nil {
		return nil, err
	}

	balance := "0.00"
	if len(result.Data.Balances) > 0 {
		balance = result.Data.Balances[0].Amount
	}

	return &ports.Wallet{
		ID:       result.Data.WalletID,
		Balance:  balance,
		Currency: "USD", // Circle uses USD for USDC storage usually in their API context
	}, nil
}

func (c *CircleAdapter) Transfer(ctx context.Context, req ports.TransferRequest) (*ports.TransferResponse, error) {
	payload := map[string]interface{}{
		"idempotencyKey": req.IdempotencyKey,
		"source": map[string]string{
			"type": "wallet",
			"id":   req.SourceWalletID,
		},
		"destination": map[string]interface{}{
			"type":    "blockchain",
			"address": req.DestinationAddress,
			"chain":   req.Chain,
		},
		"amount": map[string]interface{}{
			"amount":   req.Amount,
			"currency": "USD",
		},
	}

	respData, err := c.makeRequest(ctx, "POST", "/v1/transfers", payload)
	if err != nil {
		return nil, err
	}

	var result struct {
		Data struct {
			ID              string `json:"id"`
			Status          string `json:"status"`
			TransactionHash string `json:"transactionHash"`
		} `json:"data"`
	}

	if err := json.Unmarshal(respData, &result); err != nil {
		return nil, err
	}

	return &ports.TransferResponse{
		TransferID:      result.Data.ID,
		Status:          result.Data.Status,
		TransactionHash: result.Data.TransactionHash,
	}, nil
}

func (c *CircleAdapter) GetBalance(ctx context.Context, walletID string) (*ports.Balance, error) {
	resp, err := c.makeRequest(ctx, "GET", "/v1/wallets/"+walletID, nil)
	if err != nil {
		return nil, err
	}

	var result struct {
		Data struct {
			Balances []struct {
				Amount   string `json:"amount"`
				Currency string `json:"currency"`
			} `json:"balances"`
		} `json:"data"`
	}

	if err := json.Unmarshal(resp, &result); err != nil {
		return nil, err
	}

	amount := "0.00"
	if len(result.Data.Balances) > 0 {
		amount = result.Data.Balances[0].Amount
	}

	return &ports.Balance{
		Available: amount,
		Currency:  "USD",
	}, nil
}

func (c *CircleAdapter) Name() string {
	return "circle"
}

func (c *CircleAdapter) makeRequest(ctx context.Context, method, endpoint string, body interface{}) ([]byte, error) {
	var reqBody io.Reader
	if body != nil {
		jsonData, _ := json.Marshal(body)
		reqBody = bytes.NewBuffer(jsonData)
	}

	req, _ := http.NewRequestWithContext(ctx, method, c.baseURL+endpoint, reqBody)
	req.Header.Set("Authorization", "Bearer "+c.apiKey)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")

	resp, err := c.client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	respBytes, _ := io.ReadAll(resp.Body)

	if resp.StatusCode >= 400 {
		return nil, fmt.Errorf("Circle API error: %d - %s", resp.StatusCode, string(respBytes))
	}

	return respBytes, nil
}
