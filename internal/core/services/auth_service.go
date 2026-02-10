package services

import (
	"errors"
	"time"

	"velo/internal/auth"
	"velo/internal/core"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthService struct {
	DB *gorm.DB
}

func NewAuthService(db *gorm.DB) *AuthService {
	return &AuthService{DB: db}
}

func (s *AuthService) Register(email, password, fullName string) (*core.User, error) {
	// Check if user exists
	var count int64
	s.DB.Model(&core.User{}).Where("email = ?", email).Count(&count)
	if count > 0 {
		return nil, errors.New("user already exists")
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	// Create Company (Partition)
	company := core.Company{
		Name: fullName + "'s Company", // Default name
		// Domain can be set later
	}
	if err := s.DB.Create(&company).Error; err != nil {
		return nil, err
	}

	// Create User
	user := core.User{
		Email:        email,
		PasswordHash: string(hashedPassword),
		FullName:     fullName,
		CompanyID:    company.ID,
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
	}

	if err := s.DB.Create(&user).Error; err != nil {
		return nil, err
	}

	// Assign Owner Role
	var ownerRole core.Role
	// Assuming roles are seeded
	if err := s.DB.Where("name = ?", "owner").First(&ownerRole).Error; err != nil {
		// Fallback: Create owner role if not exists (for dev)
		ownerRole = core.Role{Name: "owner", Description: "Owner", IsSystemRole: true}
		s.DB.Create(&ownerRole)
	}

	userRole := core.UserRole{
		UserID:    user.ID,
		CompanyID: company.ID,
		RoleID:    ownerRole.ID,
	}
	s.DB.Create(&userRole)

	return &user, nil
}

func (s *AuthService) Login(email, password string) (string, error) {
	var user core.User
	if err := s.DB.Preload("UserRoles.Role").Where("email = ?", email).First(&user).Error; err != nil {
		return "", errors.New("invalid credentials")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password)); err != nil {
		return "", errors.New("invalid credentials")
	}

	// Extract roles
	var roles []string
	for _, ur := range user.UserRoles {
		roles = append(roles, ur.Role.Name)
	}

	// Generate JWT
	token, err := auth.GenerateToken(user.ID, user.CompanyID, user.Email, roles)
	if err != nil {
		return "", err
	}

	return token, nil
}
