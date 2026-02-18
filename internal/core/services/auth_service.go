package services

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"time"

	"velo/internal/auth"
	"velo/internal/core"
	"velo/internal/ports"

	"github.com/google/uuid"
	"github.com/xlzd/gotp"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"gorm.io/gorm"
)

type AuthService struct {
	DB           *gorm.DB
	EmailSender  ports.EmailSender
	GoogleConfig *oauth2.Config
}

func NewAuthService(db *gorm.DB, emailSender ports.EmailSender, googleClientID, googleClientSecret, googleRedirectURL string) *AuthService {
	var googleConfig *oauth2.Config
	if googleClientID != "" && googleClientSecret != "" {
		googleConfig = &oauth2.Config{
			ClientID:     googleClientID,
			ClientSecret: googleClientSecret,
			RedirectURL:  googleRedirectURL,
			Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
			Endpoint:     google.Endpoint,
		}
	}

	return &AuthService{
		DB:           db,
		EmailSender:  emailSender,
		GoogleConfig: googleConfig,
	}
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
		ID:     uuid.New(),
		Name:   fullName + "'s Company", // Default name
		Domain: "temp-" + uuid.New().String() + ".com",
	}
	if err := s.DB.Create(&company).Error; err != nil {
		return nil, err
	}

	// Create User
	user := core.User{
		ID:           uuid.New(),
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
		ownerRole = core.Role{ID: uuid.New(), Name: "owner", Description: "Owner", IsSystemRole: true}
		s.DB.Create(&ownerRole)
	}

	userRole := core.UserRole{
		ID:        uuid.New(),
		UserID:    user.ID,
		CompanyID: company.ID,
		RoleID:    ownerRole.ID,
	}
	s.DB.Create(&userRole)

	// Send Welcome Email
	if s.EmailSender != nil {
		go s.EmailSender.SendEmail(email, "Welcome to Velo", fmt.Sprintf("Hi %s,\n\nWelcome to Velo! Your account has been created successfully.", fullName))
	}

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

	// Send Email
	if s.EmailSender != nil {
		// Construct Reset URL (Assuming frontend is at localhost:5173 for now, should be env var)
		resetURL := fmt.Sprintf("http://localhost:5173/auth/reset-password?token=%s", resetToken)
		body := fmt.Sprintf("Hi,\n\nYou requested a password reset. Click here to reset your password: %s\n\nThis link expires in 15 minutes.", resetURL)
		go s.EmailSender.SendEmail(user.Email, "Reset Your Velo Password", body)
	} else {
		log.Printf("[MOCK EMAIL] Password Reset for %s: Token=%s", email, resetToken)
	}

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

	// Send Email
	if s.EmailSender != nil {
		// Construct Magic Link URL
		magicLink := fmt.Sprintf("http://localhost:5173/auth/magic-login?token=%s", token)
		body := fmt.Sprintf("Hi,\n\nClick here to login to Velo: %s\n\nThis link expires in 15 minutes.", magicLink)
		go s.EmailSender.SendEmail(user.Email, "Login to Velo", body)
	} else {
		log.Printf("[MOCK EMAIL] Magic Link for %s: Token=%s", email, token)
	}

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

	// Using simple model here: save secret immediately, but TwoFactorEnabled=false until verified
	if err := s.DB.Model(&core.User{}).Where("id = ?", userID).Updates(map[string]interface{}{
		"two_factor_secret":  secret,
		"two_factor_enabled": false,
	}).Error; err != nil {
		return "", "", err
	}

	// Generate QR URI
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

// SSO Implementation

func (s *AuthService) InitiateSSO(provider string) (string, error) {
	if provider == "google" {
		if s.GoogleConfig == nil {
			return "", errors.New("google sso not configured")
		}
		// Generate random state for CSRF protection (should be stored/validated in production)
		state := "random-state-string"
		url := s.GoogleConfig.AuthCodeURL(state, oauth2.AccessTypeOffline)
		return url, nil
	}

	// Microsoft placeholder
	if provider == "microsoft" {
		return "", errors.New("microsoft sso not implemented yet")
	}

	return "", errors.New("unsupported provider")
}

func (s *AuthService) HandleSSOCallback(code string) (string, error) {
	if s.GoogleConfig == nil {
		return "", errors.New("google sso not configured")
	}

	// Exchange code for token
	token, err := s.GoogleConfig.Exchange(context.Background(), code)
	if err != nil {
		return "", fmt.Errorf("failed to exchange token: %w", err)
	}

	// Fetch User Info
	client := s.GoogleConfig.Client(context.Background(), token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		return "", fmt.Errorf("failed to get user info: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return "", fmt.Errorf("failed to get user info: status %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var userInfo struct {
		ID            string `json:"id"`
		Email         string `json:"email"`
		VerifiedEmail bool   `json:"verified_email"`
		Name          string `json:"name"`
		Picture       string `json:"picture"`
	}

	if err := json.Unmarshal(body, &userInfo); err != nil {
		return "", err
	}

	// Find or Create User
	var user core.User

	if err := s.DB.Preload("UserRoles.Role").Where("email = ?", userInfo.Email).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {

			// Register new user logic (simplified from Register)
			// Create Company
			company := core.Company{
				ID:     uuid.New(),
				Name:   userInfo.Name + "'s Company",
				Domain: "temp-" + uuid.New().String() + ".com",
			}
			if err := s.DB.Create(&company).Error; err != nil {
				return "", err
			}

			user = core.User{
				ID:            uuid.New(),
				Email:         userInfo.Email,
				FullName:      userInfo.Name,
				CompanyID:     company.ID,
				EmailVerified: userInfo.VerifiedEmail,
				CreatedAt:     time.Now(),
				UpdatedAt:     time.Now(),
			}

			if err := s.DB.Create(&user).Error; err != nil {
				return "", err
			}

			// Assign Owner Role
			var ownerRole core.Role
			if err := s.DB.Where("name = ?", "owner").First(&ownerRole).Error; err != nil {
				ownerRole = core.Role{ID: uuid.New(), Name: "owner", Description: "Owner", IsSystemRole: true}
				s.DB.Create(&ownerRole)
			}

			userRole := core.UserRole{
				ID:        uuid.New(),
				UserID:    user.ID,
				CompanyID: company.ID,
				RoleID:    ownerRole.ID,
			}
			s.DB.Create(&userRole)

			// Reload user with roles
			s.DB.Preload("UserRoles.Role").First(&user, "id = ?", user.ID)

			// Send Welcome Email
			if s.EmailSender != nil {
				go s.EmailSender.SendEmail(user.Email, "Welcome to Velo", fmt.Sprintf("Hi %s,\n\nWelcome to Velo! You have successfully signed up with Google.", user.FullName))
			}
		} else {
			return "", err
		}
	}

	// Generate JWT
	var roles []string
	for _, ur := range user.UserRoles {
		roles = append(roles, ur.Role.Name)
	}

	return auth.GenerateToken(user.ID, user.CompanyID, user.Email, roles)
}
