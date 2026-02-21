package services

import (
	"velo/internal/core"

	"gorm.io/gorm"
)

type AdminService struct {
	db *gorm.DB
}

func NewAdminService(db *gorm.DB) *AdminService {
	return &AdminService{db: db}
}

// GetAllUsers returns a paginated list of users
func (s *AdminService) GetAllUsers(page, limit int) ([]core.User, int64, error) {
	var users []core.User
	var total int64

	offset := (page - 1) * limit

	if err := s.db.Model(&core.User{}).Count(&total).Error; err != nil {
		return nil, 0, err
	}

	if err := s.db.Preload("Company").Preload("UserRoles.Role").Offset(offset).Limit(limit).Find(&users).Error; err != nil {
		return nil, 0, err
	}

	return users, total, nil
}

// GetUser returns detailed user info
func (s *AdminService) GetUser(userID string) (*core.User, error) {
	var user core.User
	if err := s.db.Preload("Company").Preload("UserRoles.Role").First(&user, "id = ?", userID).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// GetComplianceQueue returns users requiring KYC review
func (s *AdminService) GetComplianceQueue() ([]core.User, error) {
	var users []core.User
	// Fetch users with pending KYC status
	if err := s.db.Where("kyc_status = ?", "pending").Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

// ApproveKYC manually approves KYC for a user
func (s *AdminService) ApproveKYC(userID string) error {
	return s.db.Model(&core.User{}).Where("id = ?", userID).Update("kyc_status", "approved").Error
}

// RejectKYC manually rejects KYC for a user
func (s *AdminService) RejectKYC(userID string) error {
	return s.db.Model(&core.User{}).Where("id = ?", userID).Update("kyc_status", "rejected").Error
}

// GetAllTransactions returns a list of all wallet transactions (simplified for MVP)
func (s *AdminService) GetAllTransactions(limit int) ([]core.Payment, error) {
	var payments []core.Payment
	if err := s.db.Preload("Batch").Order("created_at desc").Limit(limit).Find(&payments).Error; err != nil {
		return nil, err
	}
	return payments, nil
}
