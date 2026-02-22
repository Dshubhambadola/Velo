package services

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"time"

	"velo/internal/core"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type APIKeyService struct {
	DB *gorm.DB
}

func NewAPIKeyService(db *gorm.DB) *APIKeyService {
	return &APIKeyService{DB: db}
}

// GenerateAPIKey creates a new API key for a company
func (s *APIKeyService) GenerateAPIKey(ctx context.Context, companyID, userID uuid.UUID, name string) (*core.APIKey, string, error) {
	// Generate a secure random string (32 bytes = 256 bits)
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		return nil, "", err
	}

	rawKey := base64.URLEncoding.EncodeToString(bytes)
	fullSecretKey := fmt.Sprintf("velo_live_%s", rawKey)

	// Hash the key for storage
	hashedKey, err := bcrypt.GenerateFromPassword([]byte(fullSecretKey), bcrypt.DefaultCost)
	if err != nil {
		return nil, "", err
	}

	// Prefix is visible for identification (e.g., in UI)
	prefix := fmt.Sprintf("velo_live_%s", rawKey[:8])

	apiKey := &core.APIKey{
		ID:        uuid.New(),
		CompanyID: companyID,
		CreatedBy: userID,
		Name:      name,
		Prefix:    prefix,
		Hash:      string(hashedKey),
	}

	if err := s.DB.Create(apiKey).Error; err != nil {
		return nil, "", err
	}

	// Return the unhashed secret key ONLY once upon creation
	return apiKey, fullSecretKey, nil
}

// ListAPIKeys returns all active API keys for a company
func (s *APIKeyService) ListAPIKeys(ctx context.Context, companyID uuid.UUID) ([]core.APIKey, error) {
	var keys []core.APIKey
	if err := s.DB.Where("company_id = ? AND revoked = ?", companyID, false).Find(&keys).Error; err != nil {
		return nil, err
	}
	return keys, nil
}

// RevokeAPIKey marks a key as revoked
func (s *APIKeyService) RevokeAPIKey(ctx context.Context, companyID, keyID uuid.UUID) error {
	result := s.DB.Model(&core.APIKey{}).
		Where("id = ? AND company_id = ?", keyID, companyID).
		Update("revoked", true)

	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return fmt.Errorf("api key not found or unauthorized")
	}

	return nil
}

// VerifyAPIKey takes a raw key, finds matching prefixes, and compares hashes.
func (s *APIKeyService) VerifyAPIKey(ctx context.Context, rawKey string) (*core.Company, error) {
	if len(rawKey) < 20 {
		return nil, fmt.Errorf("invalid api key format")
	}

	prefix := rawKey[:18] // "velo_live_" + 8 chars

	var apiKeys []core.APIKey
	if err := s.DB.Where("prefix = ? AND revoked = ?", prefix, false).Find(&apiKeys).Error; err != nil {
		return nil, err
	}

	for _, key := range apiKeys {
		if err := bcrypt.CompareHashAndPassword([]byte(key.Hash), []byte(rawKey)); err == nil {
			// Update last used timestamp async
			now := time.Now()
			go func(id uuid.UUID, t time.Time) {
				s.DB.Model(&core.APIKey{}).Where("id = ?", id).Update("last_used", t)
			}(key.ID, now)

			var company core.Company
			if err := s.DB.First(&company, "id = ?", key.CompanyID).Error; err != nil {
				return nil, err
			}
			return &company, nil
		}
	}

	return nil, fmt.Errorf("invalid api key")
}
