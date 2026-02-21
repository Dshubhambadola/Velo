package services

import (
	"velo/internal/core"
	"velo/internal/ports"

	"gorm.io/gorm"
)

type ComplianceService struct {
	db                 *gorm.DB
	complianceProvider ports.ComplianceProvider
}

func NewComplianceService(db *gorm.DB, cp ports.ComplianceProvider) *ComplianceService {
	return &ComplianceService{
		db:                 db,
		complianceProvider: cp,
	}
}

// InitiateKYC creates an applicant and returns the SDK token
func (s *ComplianceService) InitiateKYC(userID string) (string, error) {
	var user core.User
	if err := s.db.First(&user, "id = ?", userID).Error; err != nil {
		return "", err
	}

	applicantID := user.ApplicantID
	if applicantID == "" {
		// Create applicant if not already created
		var err error
		applicantID, err = s.complianceProvider.CreateApplicant(user.ID.String(), "basic-kyc-level")
		if err != nil {
			return "", err
		}

		// Save applicant ID
		user.ApplicantID = applicantID
		user.KYCStatus = "init"
		if err := s.db.Save(&user).Error; err != nil {
			return "", err
		}
	}

	// Generate SDK token
	token, err := s.complianceProvider.GenerateSDKToken(applicantID)
	if err != nil {
		return "", err
	}

	return token, nil
}

// HandleWebhook updates user status based on verification result
func (s *ComplianceService) HandleWebhook(applicantID string, reviewStatus string, reviewAnswer string) error {
	var user core.User
	if err := s.db.First(&user, "applicant_id = ?", applicantID).Error; err != nil {
		return err
	}

	// Map Sumsub status to our status
	// reviewAnswer: GREEN, RED
	newStatus := "pending"
	if reviewAnswer == "GREEN" {
		newStatus = "approved"
	} else if reviewAnswer == "RED" {
		newStatus = "rejected"
	}

	user.KYCStatus = newStatus
	return s.db.Save(&user).Error
}

// UpdateUserStatus updates the user's KYC status based on provider status
func (s *ComplianceService) UpdateUserStatus(userID string) error {
	var user core.User
	if err := s.db.First(&user, "id = ?", userID).Error; err != nil {
		return err
	}

	if user.ApplicantID == "" {
		return nil // No applicant, nothing to update
	}

	status, err := s.complianceProvider.GetApplicantStatus(user.ApplicantID)
	if err != nil {
		return err
	}

	// status from adapter is normalized to lowercase green/red/init etc
	newStatus := user.KYCStatus
	if status == "green" {
		newStatus = "approved"
	} else if status == "red" {
		newStatus = "rejected"
	} else if status == "init" {
		newStatus = "init"
	} else {
		newStatus = "pending"
	}

	if newStatus != user.KYCStatus {
		user.KYCStatus = newStatus
		return s.db.Save(&user).Error
	}

	return nil
}
