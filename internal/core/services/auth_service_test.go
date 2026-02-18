package services_test

import (
	"testing"
	"time"

	"velo/internal/adapters/email"
	"velo/internal/core"
	"velo/internal/core/services"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupAuthDB() (*gorm.DB, *email.MockEmailSender) {
	db, _ := gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{})
	db.AutoMigrate(&core.User{}, &core.Company{}, &core.Role{}, &core.UserRole{})
	mockEmail := email.NewMockEmailSender()
	return db, mockEmail
}

func TestAuthService_Register(t *testing.T) {
	db, mockEmail := setupAuthDB()
	service := services.NewAuthService(db, mockEmail, "", "", "")

	email := "test@example.com"
	password := "password123"
	fullName := "Test User"

	user, err := service.Register(email, password, fullName)

	require.NoError(t, err)
	require.NotNil(t, user)
	assert.Equal(t, email, user.Email)
	assert.Equal(t, fullName, user.FullName)
	assert.NotEmpty(t, user.CompanyID)

	// Verify DB insertion
	var dbUser core.User
	err = db.First(&dbUser, "email = ?", email).Error
	assert.NoError(t, err)
	assert.Equal(t, user.ID, dbUser.ID)

	// Verify Welcome Email
	// Wait briefly for goroutine
	time.Sleep(10 * time.Millisecond)
	mockEmail.Mu.Lock()
	defer mockEmail.Mu.Unlock()
	assert.Len(t, mockEmail.SentEmails, 1)
	assert.Equal(t, email, mockEmail.SentEmails[0].To)
	assert.Contains(t, mockEmail.SentEmails[0].Subject, "Welcome")
}

func TestAuthService_Register_DuplicateEmail(t *testing.T) {
	db, mockEmail := setupAuthDB()
	service := services.NewAuthService(db, mockEmail, "", "", "")

	email := "duplicate@example.com"
	service.Register(email, "pass1", "User One")

	// Try registering again
	_, err := service.Register(email, "pass2", "User Two")
	assert.Error(t, err)
	assert.Equal(t, "user already exists", err.Error())
}

func TestAuthService_Login(t *testing.T) {
	db, mockEmail := setupAuthDB()
	service := services.NewAuthService(db, mockEmail, "", "", "")

	email := "login@example.com"
	password := "securepass"
	service.Register(email, password, "Login User")

	t.Run("Valid Credentials", func(t *testing.T) {
		token, requires2FA, userID, err := service.Login(email, password)
		assert.NoError(t, err)
		assert.False(t, requires2FA)
		assert.NotEmpty(t, token)
		assert.NotEmpty(t, userID)
	})

	t.Run("Invalid Password", func(t *testing.T) {
		_, _, _, err := service.Login(email, "wrongpass")
		assert.Error(t, err)
		assert.Equal(t, "invalid credentials", err.Error())
	})

	t.Run("User Not Found", func(t *testing.T) {
		_, _, _, err := service.Login("unknown@example.com", password)
		assert.Error(t, err)
	})
}

func TestAuthService_ForgotPassword(t *testing.T) {
	db, mockEmail := setupAuthDB()
	service := services.NewAuthService(db, mockEmail, "", "", "")

	email := "forgot@example.com"
	service.Register(email, "pass", "Forgot User")

	err := service.ForgotPassword(email)
	assert.NoError(t, err)

	var user core.User
	db.Where("email = ?", email).First(&user)
	assert.NotEmpty(t, user.ResetToken)
	assert.True(t, user.ResetTokenExpiresAt.After(time.Now()))

	// Verify Email
	time.Sleep(10 * time.Millisecond)
	mockEmail.Mu.Lock()
	defer mockEmail.Mu.Unlock()
	// 1 welcome email + 1 reset email
	assert.Len(t, mockEmail.SentEmails, 2)
	assert.Equal(t, email, mockEmail.SentEmails[1].To)
	assert.Contains(t, mockEmail.SentEmails[1].Subject, "Reset")
}
