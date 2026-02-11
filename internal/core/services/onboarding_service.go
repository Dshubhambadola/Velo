package services

import (
	"velo/internal/core"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type OnboardingService struct {
	db *gorm.DB
}

func NewOnboardingService(db *gorm.DB) *OnboardingService {
	return &OnboardingService{db: db}
}

func (s *OnboardingService) UpdateCompanyDetails(userID uuid.UUID, name, website, size, industry, location string) error {
	var user core.User
	if err := s.db.First(&user, "id = ?", userID).Error; err != nil {
		return err
	}

	if user.CompanyID == uuid.Nil {
		// Create new company if not exists (though it should from registration)
		company := core.Company{
			Name:     name,
			Website:  website,
			Size:     size,
			Industry: industry,
			Location: location,
		}
		if err := s.db.Create(&company).Error; err != nil {
			return err
		}
		user.CompanyID = company.ID
		return s.db.Save(&user).Error
	}

	// Update existing company
	return s.db.Model(&core.Company{}).Where("id = ?", user.CompanyID).Updates(map[string]interface{}{
		"name":     name,
		"website":  website,
		"size":     size,
		"industry": industry,
		"location": location,
	}).Error
}

func (s *OnboardingService) UpdateKYCDetails(userID uuid.UUID, kycData map[string]interface{}) error {
	return s.db.Model(&core.User{}).Where("id = ?", userID).Updates(kycData).Error
}

func (s *OnboardingService) CompleteOnboarding(userID uuid.UUID) error {
	return s.db.Model(&core.User{}).Where("id = ?", userID).Update("onboarding_completed", true).Error
}
