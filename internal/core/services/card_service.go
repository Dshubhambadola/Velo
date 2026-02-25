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
	cvv := fmt.Sprintf("%03d", rand.Intn(1000))

	status := "active"
	shippingStatus := "delivered"
	trackingNumber := ""

	if cardType == "physical" {
		status = "inactive"
		shippingStatus = "shipped"
		trackingNumber = fmt.Sprintf("1Z%06d", rand.Intn(999999))
	}

	card := &core.CorporateCard{
		ID:             uuid.New(),
		CompanyID:      companyID,
		UserID:         userID,
		Type:           cardType,
		Status:         status,
		Last4:          mockLast4,
		ExpiryMonth:    int(time.Now().Month()) + 1, // Simple mock expiry
		ExpiryYear:     time.Now().Year() + 3,
		DailyLimit:     dailyLimit,
		MonthlyLimit:   monthlyLimit,
		ProviderCardID: mockProviderID,
		CVV:            cvv,
		ShippingStatus: shippingStatus,
		TrackingNumber: trackingNumber,
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

// ActivateCard allows an employee to activate their physical card using the CVV
func (s *CardManagementService) ActivateCard(ctx context.Context, companyID, cardID uuid.UUID, cvv string) error {
	var card core.CorporateCard
	if err := s.DB.Where("id = ? AND company_id = ?", cardID, companyID).First(&card).Error; err != nil {
		return err
	}

	if card.Status == "active" {
		return errors.New("card is already active")
	}

	if card.CVV != cvv {
		return errors.New("invalid CVV - activation failed")
	}

	result := s.DB.Model(&core.CorporateCard{}).
		Where("id = ? AND company_id = ?", cardID, companyID).
		Updates(map[string]interface{}{
			"status":          "active",
			"shipping_status": "delivered",
		})

	if result.Error != nil {
		return result.Error
	}
	return nil
}
