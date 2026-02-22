package services

import (
	"bytes"
	"context"
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"velo/internal/core"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type WebhookService struct {
	DB         *gorm.DB
	HttpClient *http.Client
}

func NewWebhookService(db *gorm.DB) *WebhookService {
	return &WebhookService{
		DB: db,
		HttpClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

// CreateEndpoint registers a new webhook target
func (s *WebhookService) CreateEndpoint(ctx context.Context, companyID uuid.UUID, url, desc string, events []string) (*core.WebhookEndpoint, error) {
	// Generate a signing secret
	secretBytes := make([]byte, 24)
	if _, err := rand.Read(secretBytes); err != nil {
		return nil, err
	}
	secret := base64.URLEncoding.EncodeToString(secretBytes)

	var eventsJSONMap core.JSON = make(map[string]interface{})
	for i, e := range events {
		eventsJSONMap[fmt.Sprintf("%d", i)] = e
	}

	endpoint := &core.WebhookEndpoint{
		ID:          uuid.New(),
		CompanyID:   companyID,
		URL:         url,
		Secret:      fmt.Sprintf("whsec_%s", secret),
		Description: desc,
		IsActive:    true,
		Events:      eventsJSONMap,
	}

	if err := s.DB.Create(endpoint).Error; err != nil {
		return nil, err
	}

	return endpoint, nil
}

// ListEndpoints returns all webhooks for a company
func (s *WebhookService) ListEndpoints(ctx context.Context, companyID uuid.UUID) ([]core.WebhookEndpoint, error) {
	var endpoints []core.WebhookEndpoint
	if err := s.DB.Where("company_id = ?", companyID).Find(&endpoints).Error; err != nil {
		return nil, err
	}
	return endpoints, nil
}

// DeleteEndpoint removes a webhook endpoint
func (s *WebhookService) DeleteEndpoint(ctx context.Context, companyID, endpointID uuid.UUID) error {
	result := s.DB.Where("id = ? AND company_id = ?", endpointID, companyID).Delete(&core.WebhookEndpoint{})
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return fmt.Errorf("endpoint not found")
	}
	return nil
}

// DispatchEvent synchronously (for MVP) sends an event to all subscribed endpoints for a company
func (s *WebhookService) DispatchEvent(ctx context.Context, companyID uuid.UUID, eventType string, payload interface{}) error {
	var endpoints []core.WebhookEndpoint
	if err := s.DB.Where("company_id = ? AND is_active = ?", companyID, true).Find(&endpoints).Error; err != nil {
		return err
	}

	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	eventID := uuid.New().String()
	timestamp := fmt.Sprintf("%d", time.Now().Unix())

	for _, endpoint := range endpoints {
		// Basic check if endpoint is subscribed to this event type
		// In a real app, parse the JSON array. For MVP, string match is okayish but let's do it right.
		isSubscribed := false
		for _, e := range endpoint.Events {
			if strE, ok := e.(string); ok && (strE == eventType || strE == "*") {
				isSubscribed = true
				break
			}
		}

		if !isSubscribed {
			continue
		}

		// Dispatch asynchronously to not block the caller
		go s.sendWebhook(endpoint, eventID, eventType, timestamp, payloadBytes)
	}

	return nil
}

func (s *WebhookService) sendWebhook(endpoint core.WebhookEndpoint, eventID, eventType, timestamp string, payload []byte) {
	// Construct signature: timestamp.payload
	sigPayload := fmt.Sprintf("%s.%s", timestamp, string(payload))
	mac := hmac.New(sha256.New, []byte(endpoint.Secret))
	mac.Write([]byte(sigPayload))
	signature := hex.EncodeToString(mac.Sum(nil))

	req, err := http.NewRequest("POST", endpoint.URL, bytes.NewBuffer(payload))
	if err != nil {
		s.recordDelivery(endpoint.ID, eventID, eventType, payload, 0, err.Error(), false)
		return
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Velo-Signature", fmt.Sprintf("t=%s,v1=%s", timestamp, signature))
	req.Header.Set("Velo-Event-ID", eventID)
	req.Header.Set("Velo-Event-Type", eventType)

	resp, err := s.HttpClient.Do(req)
	if err != nil {
		s.recordDelivery(endpoint.ID, eventID, eventType, payload, 0, err.Error(), false)
		return
	}
	defer resp.Body.Close()

	success := resp.StatusCode >= 200 && resp.StatusCode < 300
	s.recordDelivery(endpoint.ID, eventID, eventType, payload, resp.StatusCode, resp.Status, success)
}

func (s *WebhookService) recordDelivery(endpointID uuid.UUID, eventID, eventType string, payload []byte, status int, responseBody string, success bool) {
	var payloadMap map[string]interface{}
	json.Unmarshal(payload, &payloadMap)

	delivery := &core.WebhookDelivery{
		ID:           uuid.New(),
		EndpointID:   endpointID,
		EventID:      eventID,
		EventType:    eventType,
		Payload:      core.JSON(payloadMap),
		StatusCode:   status,
		ResponseBody: responseBody,
		Success:      success,
		Attempt:      1,
		CreatedAt:    time.Now(),
	}
	s.DB.Create(delivery)
}
