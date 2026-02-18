package circle

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"velo/internal/ports"

	"github.com/google/uuid"
)

type CircleAdapter struct {
	apiKey     string
	baseURL    string
	client     *http.Client
	simulation bool
}

func NewCircleAdapter(apiKey string, sandbox bool) ports.PaymentProvider {
	baseURL := "https://api.circle.com"
	if sandbox {
		baseURL = "https://api-sandbox.circle.com"
	}

	simulation := apiKey == ""
	if simulation {
		log.Println("[CircleAdapter] API Key not set. Running in SIMULATION mode.")
	}

	return &CircleAdapter{
		apiKey:     apiKey,
		baseURL:    baseURL,
		client:     &http.Client{Timeout: 30 * time.Second},
		simulation: simulation,
	}
}

func (c *CircleAdapter) Name() string {
	if c.simulation {
		return "circle-simulation"
	}
	return "circle"
}

func (c *CircleAdapter) CreateWallet(ctx context.Context, userID string) (*ports.Wallet, error) {
	if c.simulation {
		// Return a mock wallet
		return &ports.Wallet{
			ID:       uuid.New().String(),
			Balance:  "1000.00", // Initial mock balance
			Currency: "USD",
		}, nil
	}

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
		return nil, fmt.Errorf("failed to parse wallet response: %w", err)
	}

	balance := "0.00"
	if len(result.Data.Balances) > 0 {
		balance = result.Data.Balances[0].Amount
	}

	return &ports.Wallet{
		ID:       result.Data.WalletID,
		Balance:  balance,
		Currency: "USD",
	}, nil
}

func (c *CircleAdapter) Transfer(ctx context.Context, req ports.TransferRequest) (*ports.TransferResponse, error) {
	if c.simulation {
		return &ports.TransferResponse{
			TransferID:      uuid.New().String(),
			Status:          "complete",
			TransactionHash: "0xsimulatedhash" + uuid.New().String(),
		}, nil
	}

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
		return nil, fmt.Errorf("failed to parse transfer response: %w", err)
	}

	return &ports.TransferResponse{
		TransferID:      result.Data.ID,
		Status:          result.Data.Status,
		TransactionHash: result.Data.TransactionHash,
	}, nil
}

func (c *CircleAdapter) GetBalance(ctx context.Context, walletID string) (*ports.Balance, error) {
	if c.simulation {
		return &ports.Balance{
			Available: "1000.00",
			Pending:   "0.00",
			Currency:  "USD",
		}, nil
	}

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
		return nil, fmt.Errorf("failed to parse balance response: %w", err)
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

func (c *CircleAdapter) GetTransactions(ctx context.Context, walletID string) ([]ports.Transaction, error) {
	if c.simulation {
		return []ports.Transaction{
			{
				ID:              uuid.New().String(),
				Amount:          "100.00",
				Currency:        "USD",
				Status:          "complete",
				TransactionHash: "0xsimulated" + uuid.New().String(),
				Type:            "deposit",
				Timestamp:       time.Now(),
			},
		}, nil
	}

	endpoint := fmt.Sprintf("/v1/transfers?walletIds=%s", walletID)
	resp, err := c.makeRequest(ctx, "GET", endpoint, nil)
	if err != nil {
		return nil, err
	}

	var result struct {
		Data []struct {
			ID     string `json:"id"`
			Amount struct {
				Amount   string `json:"amount"`
				Currency string `json:"currency"`
			} `json:"amount"`
			Status          string `json:"status"`
			TransactionHash string `json:"transactionHash"`
			Source          struct {
				Type string `json:"type"`
				ID   string `json:"id"`
			} `json:"source"`
			Destination struct {
				Type    string `json:"type"`
				Address string `json:"address"`
			} `json:"destination"`
			CreateDate time.Time `json:"createDate"`
		} `json:"data"`
	}

	if err := json.Unmarshal(resp, &result); err != nil {
		return nil, fmt.Errorf("failed to parse transactions response: %w", err)
	}

	var transactions []ports.Transaction
	for _, t := range result.Data {
		transactions = append(transactions, ports.Transaction{
			ID:              t.ID,
			Amount:          t.Amount.Amount,
			Currency:        t.Amount.Currency,
			Status:          t.Status,
			TransactionHash: t.TransactionHash,
			FromAddress:     t.Source.ID,
			ToAddress:       t.Destination.Address,
			Timestamp:       t.CreateDate,
			Type:            "transfer", // Simplified
		})
	}

	return transactions, nil
}

func (c *CircleAdapter) makeRequest(ctx context.Context, method, endpoint string, body interface{}) ([]byte, error) {
	var reqBody io.Reader
	if body != nil {
		jsonData, err := json.Marshal(body)
		if err != nil {
			return nil, fmt.Errorf("failed to marshal request body: %w", err)
		}
		reqBody = bytes.NewBuffer(jsonData)
	}

	req, err := http.NewRequestWithContext(ctx, method, c.baseURL+endpoint, reqBody)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}
	req.Header.Set("Authorization", "Bearer "+c.apiKey)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")

	resp, err := c.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	respBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	if resp.StatusCode >= 400 {
		return nil, fmt.Errorf("Circle API error: %d - %s", resp.StatusCode, string(respBytes))
	}

	return respBytes, nil
}
