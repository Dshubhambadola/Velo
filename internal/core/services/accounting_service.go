package services

import (
	"context"
	"errors"
	"time"

	"velo/internal/core"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type AccountingService struct {
	DB *gorm.DB
}

func NewAccountingService(db *gorm.DB) *AccountingService {
	return &AccountingService{DB: db}
}

// ConnectProvider initiates or saves the connection to a provider
func (s *AccountingService) ConnectProvider(ctx context.Context, companyID uuid.UUID, provider, accessToken, refreshToken string, expiresIn int) (*core.Integration, error) {
	if provider != "quickbooks" && provider != "xero" && provider != "netsuite" {
		return nil, errors.New("unsupported provider")
	}

	var integration core.Integration
	err := s.DB.Where("company_id = ? AND provider = ?", companyID, provider).First(&integration).Error

	now := time.Now()
	expiry := now.Add(time.Duration(expiresIn) * time.Second)

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			integration = core.Integration{
				ID:           uuid.New(),
				CompanyID:    companyID,
				Provider:     provider,
				Status:       "connected",
				AccessToken:  accessToken,
				RefreshToken: refreshToken,
				ExpiresAt:    expiry,
				CreatedAt:    now,
				UpdatedAt:    now,
			}
			if err := s.DB.Create(&integration).Error; err != nil {
				return nil, err
			}
			return &integration, nil
		}
		return nil, err
	}

	// Update existing connection
	integration.Status = "connected"
	integration.AccessToken = accessToken
	integration.RefreshToken = refreshToken
	integration.ExpiresAt = expiry
	integration.UpdatedAt = now

	if err := s.DB.Save(&integration).Error; err != nil {
		return nil, err
	}

	return &integration, nil
}

// DisconnectProvider removes the connection
func (s *AccountingService) DisconnectProvider(ctx context.Context, companyID uuid.UUID, provider string) error {
	return s.DB.Where("company_id = ? AND provider = ?", companyID, provider).Delete(&core.Integration{}).Error
}

// GetIntegrations lists all integrations for a company
func (s *AccountingService) GetIntegrations(ctx context.Context, companyID uuid.UUID) ([]core.Integration, error) {
	var integrations []core.Integration
	err := s.DB.Where("company_id = ?", companyID).Find(&integrations).Error
	return integrations, err
}

// SyncData simulates syncing payroll and transaction data to the provider
func (s *AccountingService) SyncData(ctx context.Context, companyID uuid.UUID, provider string) error {
	var integration core.Integration
	if err := s.DB.Where("company_id = ? AND provider = ?", companyID, provider).First(&integration).Error; err != nil {
		return errors.New("provider not connected")
	}

	if integration.Status != "connected" {
		return errors.New("provider connection is not active")
	}

	// In a real app, this is where we would fetch data from our DB and map it to
	// the provider's API structure (e.g., creating Journal Entries in QuickBooks)

	// Simulate API call duration
	time.Sleep(2 * time.Second)

	integration.LastSyncAt = time.Now()
	integration.UpdatedAt = time.Now()

	return s.DB.Save(&integration).Error
}
