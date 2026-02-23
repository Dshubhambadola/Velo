package services

import (
	"context"
	"errors"
	"fmt"
	"math/rand"
	"time"

	"velo/internal/core"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CardManagementService struct {
	DB *gorm.DB
}

func NewCardManagementService(db *gorm.DB) *CardManagementService {
	return &CardManagementService{DB: db}
}

// IssueCard creates a new corporate card for an employee
func (s *CardManagementService) IssueCard(ctx context.Context, companyID, userID uuid.UUID, cardType string, dailyLimit, monthlyLimit int) (*core.CorporateCard, error) {
	if cardType != "virtual" && cardType != "physical" {
		return nil, errors.New("invalid card type")
	}

	// Verify User belongs to Company
	var user core.User
	if err := s.DB.First(&user, "id = ? AND company_id = ?", userID, companyID).Error; err != nil {
		return nil, errors.New("user not found or does not belong to this company")
	}

	// Mock Provider Integration (e.g., Stripe Issuing)
	// In a real app, this is where we call the provider API to provision the card
	mockProviderID := fmt.Sprintf("card_%d", time.Now().UnixNano())
	mockLast4 := fmt.Sprintf("%04d", rand.Intn(10000))

	card := &core.CorporateCard{
		ID:             uuid.New(),
		CompanyID:      companyID,
		UserID:         userID,
		Type:           cardType,
		Status:         "active",
		Last4:          mockLast4,
		ExpiryMonth:    int(time.Now().Month()) + 1, // Simple mock expiry
		ExpiryYear:     time.Now().Year() + 3,
		DailyLimit:     dailyLimit,
		MonthlyLimit:   monthlyLimit,
		ProviderCardID: mockProviderID,
		CreatedAt:      time.Now(),
		UpdatedAt:      time.Now(),
	}

	if err := s.DB.Create(card).Error; err != nil {
		return nil, err
	}

	return card, nil
}

// ListCards retrieves all cards for a company, optionally filtered by user
func (s *CardManagementService) ListCards(ctx context.Context, companyID uuid.UUID, userID *uuid.UUID) ([]core.CorporateCard, error) {
	var cards []core.CorporateCard
	query := s.DB.Where("company_id = ?", companyID)

	if userID != nil {
		query = query.Where("user_id = ?", *userID)
	}

	if err := query.Find(&cards).Error; err != nil {
		return nil, err
	}
	return cards, nil
}

// UpdateCardStatus freezes or unfreezes a card
func (s *CardManagementService) UpdateCardStatus(ctx context.Context, companyID, cardID uuid.UUID, newStatus string) error {
	if newStatus != "active" && newStatus != "frozen" && newStatus != "canceled" {
		return errors.New("invalid status transition")
	}

	result := s.DB.Model(&core.CorporateCard{}).
		Where("id = ? AND company_id = ?", cardID, companyID).
		Update("status", newStatus)

	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return errors.New("card not found or unauthorized")
	}

	// Mock Provider Interaction: tell Stripe to freeze the card

	return nil
}

// UpdateCardLimits changes the spend limits on a card
func (s *CardManagementService) UpdateCardLimits(ctx context.Context, companyID, cardID uuid.UUID, dailyLimit, monthlyLimit int) error {
	result := s.DB.Model(&core.CorporateCard{}).
		Where("id = ? AND company_id = ?", cardID, companyID).
		Updates(map[string]interface{}{
			"daily_limit":   dailyLimit,
			"monthly_limit": monthlyLimit,
		})

	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return errors.New("card not found or unauthorized")
	}

	// Mock Provider Interaction: update spend controls on Stripe

	return nil
}
