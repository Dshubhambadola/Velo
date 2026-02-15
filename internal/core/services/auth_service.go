package services

import (
	"errors"
	"log"
	"time"

	"velo/internal/auth"
	"velo/internal/core"

	"github.com/google/uuid"
	"github.com/xlzd/gotp"
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
		Name:   fullName + "'s Company", // Default name
		Domain: "temp-" + uuid.New().String() + ".com",
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

func (s *AuthService) Login(email, password string) (string, bool, string, error) {
	var user core.User
	if err := s.DB.Preload("UserRoles.Role").Where("email = ?", email).First(&user).Error; err != nil {
		return "", false, "", errors.New("invalid credentials")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password)); err != nil {
		return "", false, "", errors.New("invalid credentials")
	}

	// Check 2FA
	if user.TwoFactorEnabled {
		return "", true, user.ID.String(), nil
	}

	// Extract roles
	var roles []string
	for _, ur := range user.UserRoles {
		roles = append(roles, ur.Role.Name)
	}

	// Generate JWT
	token, err := auth.GenerateToken(user.ID, user.CompanyID, user.Email, roles)
	if err != nil {
		return "", false, "", err
	}

	return token, false, user.ID.String(), nil
}

// Advanced Auth Methods

func (s *AuthService) ForgotPassword(email string) error {
	var user core.User
	if err := s.DB.Where("email = ?", email).First(&user).Error; err != nil {
		// Return nil to avoid email enumeration
		return nil
	}

	// Generate Reset Token
	resetToken := auth.GenerateRandomToken(32)
	user.ResetToken = resetToken
	user.ResetTokenExpiresAt = time.Now().Add(15 * time.Minute)

	if err := s.DB.Save(&user).Error; err != nil {
		return err
	}

	// Mock Send Email
	// In production: emailService.SendPasswordReset(user.Email, resetToken)
	log.Printf("[MOCK EMAIL] Password Reset for %s: Token=%s", email, resetToken)

	return nil
}

func (s *AuthService) ResetPassword(token, newPassword string) error {
	var user core.User
	if err := s.DB.Where("reset_token = ? AND reset_token_expires_at > ?", token, time.Now()).First(&user).Error; err != nil {
		return errors.New("invalid or expired token")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	user.PasswordHash = string(hashedPassword)
	user.ResetToken = ""
	user.ResetTokenExpiresAt = time.Time{}

	return s.DB.Save(&user).Error
}

func (s *AuthService) RequestMagicLink(email string) error {
	var user core.User
	if err := s.DB.Where("email = ?", email).First(&user).Error; err != nil {
		return nil // Avoid enumeration
	}

	token := auth.GenerateRandomToken(32)
	user.MagicLinkToken = token
	user.MagicLinkTokenExpiresAt = time.Now().Add(15 * time.Minute)

	if err := s.DB.Save(&user).Error; err != nil {
		return err
	}

	// Mock Send Email
	log.Printf("[MOCK EMAIL] Magic Link for %s: Token=%s", email, token)

	return nil
}

func (s *AuthService) LoginWithMagicLink(token string) (string, error) {
	var user core.User
	if err := s.DB.Preload("UserRoles.Role").Where("magic_link_token = ? AND magic_link_token_expires_at > ?", token, time.Now()).First(&user).Error; err != nil {
		return "", errors.New("invalid or expired magic link")
	}

	// Clear token
	user.MagicLinkToken = ""
	user.MagicLinkTokenExpiresAt = time.Time{}
	s.DB.Save(&user)

	// Generate JWT
	var roles []string
	for _, ur := range user.UserRoles {
		roles = append(roles, ur.Role.Name)
	}

	return auth.GenerateToken(user.ID, user.CompanyID, user.Email, roles)
}

func (s *AuthService) Generate2FA(userID string) (string, string, error) {
	// Generate TOTP Secret
	secret := gotp.RandomSecret(16)

	// Temporarily save secret to user (or separate table for pending)
	// For MVP, likely just return it and save when enabled
	// OR save it now but enabled=false

	// Using simple model here: save secret immediately, but TwoFactorEnabled=false until verified
	if err := s.DB.Model(&core.User{}).Where("id = ?", userID).Updates(map[string]interface{}{
		"two_factor_secret":  secret,
		"two_factor_enabled": false,
	}).Error; err != nil {
		return "", "", err
	}

	// Generate QR URI
	// otpauth://totp/Velo:{email}?secret={secret}&issuer=Velo
	var user core.User
	s.DB.First(&user, "id = ?", userID)

	totp := gotp.NewDefaultTOTP(secret)
	uri := totp.ProvisioningUri(user.Email, "Velo")

	return secret, uri, nil
}

func (s *AuthService) Enable2FA(userID, code string) error {
	var user core.User
	if err := s.DB.First(&user, "id = ?", userID).Error; err != nil {
		return err
	}

	totp := gotp.NewDefaultTOTP(user.TwoFactorSecret)
	if !totp.Verify(code, time.Now().Unix()) {
		return errors.New("invalid code")
	}

	return s.DB.Model(&user).Update("two_factor_enabled", true).Error
}

func (s *AuthService) Verify2FA(userID, code string) (string, error) {
	var user core.User
	if err := s.DB.Preload("UserRoles.Role").Where("id = ?", userID).First(&user).Error; err != nil {
		return "", err
	}

	if !user.TwoFactorEnabled {
		// Should not happen if flow is correct, but safe fallback
		// If 2FA is NOT enabled, we shouldn't be here verifying it usually.
		// But if we are, maybe just return token?
		// Or return error "2FA not enabled"
		return "", errors.New("2FA is not enabled for this user")
	}

	totp := gotp.NewDefaultTOTP(user.TwoFactorSecret)
	if !totp.Verify(code, time.Now().Unix()) {
		return "", errors.New("invalid code")
	}

	// Generate JWT
	var roles []string
	for _, ur := range user.UserRoles {
		roles = append(roles, ur.Role.Name)
	}

	return auth.GenerateToken(user.ID, user.CompanyID, user.Email, roles)
}

// SSO Placeholders

func (s *AuthService) InitiateSSO(provider string) (string, error) {
	// Mock URL based on provider
	// In reality, this would construct the OAuth2 URL
	if provider != "google" && provider != "microsoft" {
		return "", errors.New("unsupported provider")
	}

	// Return a dummy URL that the frontend redirects to
	// For placeholder, maybe we just return a success message or a specific code
	// But to simulate, let's return a fake auth URL
	return "https://accounts.google.com/o/oauth2/v2/auth?client_id=mock_client_id&redirect_uri=http://localhost:8080/auth/sso/callback&response_type=code&scope=email profile", nil
}

func (s *AuthService) HandleSSOCallback(code string) (string, error) {
	// Mock callback handling
	// In reality, exchange code for token, get user info, find/create user, generate JWT
	if code == "mock_code" {
		// Simulate successful login for a demo user
		// In a real app, we would look up the user by email from the provider
		var user core.User
		if err := s.DB.Preload("UserRoles.Role").First(&user).Error; err != nil {
			return "", errors.New("no users found to mock login with")
		}

		// Generate JWT
		var roles []string
		for _, ur := range user.UserRoles {
			roles = append(roles, ur.Role.Name)
		}

		return auth.GenerateToken(user.ID, user.CompanyID, user.Email, roles)
	}
	return "", errors.New("invalid sso code")
}
