package services

import (
	"testing"
	"velo/internal/core"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// MockComplianceProvider
type MockComplianceProvider struct {
	mock.Mock
}

func (m *MockComplianceProvider) CreateApplicant(externalUserID string, levelName string) (string, error) {
	args := m.Called(externalUserID, levelName)
	return args.String(0), args.Error(1)
}

func (m *MockComplianceProvider) GetApplicantStatus(applicantID string) (string, error) {
	args := m.Called(applicantID)
	return args.String(0), args.Error(1)
}

func (m *MockComplianceProvider) GenerateSDKToken(applicantID string) (string, error) {
	args := m.Called(applicantID)
	return args.String(0), args.Error(1)
}

func setupComplianceTestDB() *gorm.DB {
	db, _ := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	db.AutoMigrate(&core.User{})
	return db
}

func TestInitiateKYC(t *testing.T) {
	db := setupComplianceTestDB()
	mockProvider := new(MockComplianceProvider)
	service := NewComplianceService(db, mockProvider)

	// Create User
	userID := uuid.New()
	user := core.User{
		ID:    userID,
		Email: "test@example.com",
	}
	db.Create(&user)

	// Expectation
	mockProvider.On("CreateApplicant", userID.String(), "basic-kyc-level").Return("app_123", nil)
	mockProvider.On("GenerateSDKToken", "app_123").Return("sdk_token_abc", nil)

	// Execute
	token, err := service.InitiateKYC(userID.String())

	// Verify
	assert.NoError(t, err)
	assert.Equal(t, "sdk_token_abc", token)

	// Verify DB update
	var updatedUser core.User
	db.First(&updatedUser, "id = ?", userID)
	assert.Equal(t, "app_123", updatedUser.ApplicantID)
	assert.Equal(t, "init", updatedUser.KYCStatus)

	mockProvider.AssertExpectations(t)
}

func TestInitiateKYC_ExistingApplicant(t *testing.T) {
	db := setupComplianceTestDB()
	mockProvider := new(MockComplianceProvider)
	service := NewComplianceService(db, mockProvider)

	// Create User with existing applicant ID
	userID := uuid.New()
	user := core.User{
		ID:          userID,
		Email:       "test@example.com",
		ApplicantID: "existing_app_id",
	}
	db.Create(&user)

	// Expectation: CreateApplicant should NOT be called
	mockProvider.On("GenerateSDKToken", "existing_app_id").Return("sdk_token_new", nil)

	// Execute
	token, err := service.InitiateKYC(userID.String())

	// Verify
	assert.NoError(t, err)
	assert.Equal(t, "sdk_token_new", token)

	mockProvider.AssertExpectations(t)
}

func TestUpdateUserStatus(t *testing.T) {
	db := setupComplianceTestDB()
	mockProvider := new(MockComplianceProvider)
	service := NewComplianceService(db, mockProvider)

	// Create User
	userID := uuid.New()
	user := core.User{
		ID:          userID,
		Email:       "test@example.com",
		ApplicantID: "app_123",
		KYCStatus:   "init",
	}
	db.Create(&user)

	// Expectation
	mockProvider.On("GetApplicantStatus", "app_123").Return("green", nil)

	// Execute
	err := service.UpdateUserStatus(userID.String())

	// Verify
	assert.NoError(t, err)

	// Verify DB update
	var updatedUser core.User
	db.First(&updatedUser, "id = ?", userID)
	assert.Equal(t, "approved", updatedUser.KYCStatus)

	mockProvider.AssertExpectations(t)
}

func TestHandleWebhook(t *testing.T) {
	db := setupComplianceTestDB()
	mockProvider := new(MockComplianceProvider)
	service := NewComplianceService(db, mockProvider)

	// Create User
	userID := uuid.New()
	user := core.User{
		ID:          userID,
		Email:       "test@example.com",
		ApplicantID: "app_webhook",
		KYCStatus:   "init",
	}
	db.Create(&user)

	// Execute
	err := service.HandleWebhook("app_webhook", "completed", "RED")

	// Verify
	assert.NoError(t, err)

	// Verify DB update
	var updatedUser core.User
	db.First(&updatedUser, "id = ?", userID)
	assert.Equal(t, "rejected", updatedUser.KYCStatus)
}
