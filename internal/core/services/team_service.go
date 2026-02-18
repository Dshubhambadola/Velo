package services

import (
	"errors"
	"fmt"
	"time"

	"velo/internal/core"
	"velo/internal/ports"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type TeamService struct {
	DB          *gorm.DB
	EmailSender ports.EmailSender
}

func NewTeamService(db *gorm.DB, emailSender ports.EmailSender) *TeamService {
	return &TeamService{
		DB:          db,
		EmailSender: emailSender,
	}
}

// ListMembers for a given company
func (s *TeamService) ListMembers(companyID string) ([]core.User, error) {
	var users []core.User
	// Join with UserRoles and Role to get role details
	err := s.DB.Preload("UserRoles.Role").
		Where("company_id = ?", companyID).
		Find(&users).Error
	return users, err
}

// InviteMember - creates a user account (if not exists) and assigns a role
// For MVP, if user exists in another company, this might be complex (multi-tenant user).
// Assuming simplified model: User belongs to one Company.
func (s *TeamService) InviteMember(companyID, email, fullName, roleName string) (*core.User, error) {
	// 1. Check if user already exists
	var existingUser core.User
	if err := s.DB.Where("email = ?", email).First(&existingUser).Error; err == nil {
		return nil, errors.New("user with this email already exists")
	}

	// 2. Get Role
	var role core.Role
	if err := s.DB.Where("name = ?", roleName).First(&role).Error; err != nil {
		return nil, errors.New("invalid role")
	}

	// 3. Create User (Pending state)
	newUser := core.User{
		Email:               email,
		FullName:            fullName,
		CompanyID:           uuid.MustParse(companyID),
		PasswordHash:        "", // No password yet
		OnboardingCompleted: false,
		EmailVerified:       false,
		CreatedAt:           time.Now(),
		UpdatedAt:           time.Now(),
	}

	// Transaction to ensure atomicity
	err := s.DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&newUser).Error; err != nil {
			return err
		}

		// 4. Assign Role
		userRole := core.UserRole{
			UserID:    newUser.ID,
			CompanyID: newUser.CompanyID,
			RoleID:    role.ID,
		}
		if err := tx.Create(&userRole).Error; err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		return nil, err
	}

	// Send Invitation Email
	if s.EmailSender != nil {
		// In a real app, generate a specialized invite token
		inviteURL := "http://localhost:5173/auth/register?email=" + email // Simplified
		body := fmt.Sprintf("Hi %s,\n\nYou have been invited to join Velo. Click here to complete your registration: %s", fullName, inviteURL)
		go s.EmailSender.SendEmail(email, "You've been invited to Velo", body)
	}

	return &newUser, nil
}

// UpdateMemberRole
func (s *TeamService) UpdateMemberRole(companyID, userID, newRoleName string) error {
	// 1. Verify User belongs to Company
	var user core.User
	if err := s.DB.Where("id = ? AND company_id = ?", userID, companyID).First(&user).Error; err != nil {
		return errors.New("user not found in this company")
	}

	// 2. Get Role
	var role core.Role
	if err := s.DB.Where("name = ?", newRoleName).First(&role).Error; err != nil {
		return errors.New("invalid role")
	}

	// 3. Update UserRole
	// Assuming single role per user per company for MVP simplicity, or just adding a new one.
	// Let's replace the existing role.
	return s.DB.Transaction(func(tx *gorm.DB) error {
		// Delete old roles
		if err := tx.Where("user_id = ? AND company_id = ?", userID, companyID).Delete(&core.UserRole{}).Error; err != nil {
			return err
		}

		// Add new role
		newUR := core.UserRole{
			UserID:    user.ID,
			CompanyID: user.CompanyID,
			RoleID:    role.ID,
		}
		return tx.Create(&newUR).Error
	})
}

// RemoveMember
func (s *TeamService) RemoveMember(companyID, userID string) error {
	result := s.DB.Where("id = ? AND company_id = ?", userID, companyID).Delete(&core.User{})
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return errors.New("user not found")
	}
	return nil
}
