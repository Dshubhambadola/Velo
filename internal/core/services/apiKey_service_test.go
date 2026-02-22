package services_test

import (
	"context"
	"testing"
	"velo/internal/core"
	"velo/internal/core/services"

	"github.com/google/uuid"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Tests API Key Generation, Validation, and Revocation
func TestAPIKeyService(t *testing.T) {
	db, _ := gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{})
	db.AutoMigrate(&core.User{}, &core.Company{}, &core.APIKey{})

	svc := services.NewAPIKeyService(db)

	companyID := uuid.New()
	userID := uuid.New()

	db.Create(&core.Company{ID: companyID, Name: "Test Co", Domain: "test.com"})

	// 1. Generate Key
	key, secret, err := svc.GenerateAPIKey(context.Background(), companyID, userID, "Test Integration Key")
	if err != nil {
		t.Fatalf("Failed to generate API Key: %v", err)
	}
	if key.Prefix == "" || secret == "" {
		t.Fatalf("Expected valid prefix and secret")
	}

	// 2. Verify Key (Valid)
	company, err := svc.VerifyAPIKey(context.Background(), secret)
	if err != nil {
		t.Fatalf("Failed to verify valid key: %v", err)
	}
	// Note: Company isn't created in the test DB here, so it verifies the ID matches but
	// the First lookup might fail. Let's create the company first to be safe.
	company, err = svc.VerifyAPIKey(context.Background(), secret)
	if err != nil {
		t.Fatalf("Failed to verify valid key with company sync: %v", err)
	}

	if company.ID != companyID {
		t.Errorf("Expected company ID %s, got %s", companyID, company.ID)
	}

	// 3. Verify Key (Invalid Secret)
	_, err = svc.VerifyAPIKey(context.Background(), "velo_live_invalidsecretkeythatislongenough")
	if err == nil {
		t.Fatalf("Expected error for invalid secret")
	}

	// 4. List Keys
	keys, err := svc.ListAPIKeys(context.Background(), companyID)
	if err != nil {
		t.Fatalf("Failed to list keys: %v", err)
	}
	if len(keys) != 1 {
		t.Errorf("Expected 1 key, got %d", len(keys))
	}

	// 5. Revoke Key
	err = svc.RevokeAPIKey(context.Background(), companyID, key.ID)
	if err != nil {
		t.Fatalf("Failed to revoke key: %v", err)
	}

	// 6. Verify Revoked Key (Should Fail)
	_, err = svc.VerifyAPIKey(context.Background(), secret)
	if err == nil {
		t.Fatalf("Expected error when verifying revoked key")
	}

	// 7. List Keys (Should be empty)
	keys, err = svc.ListAPIKeys(context.Background(), companyID)
	if err != nil {
		t.Fatalf("Failed to list keys after revocation: %v", err)
	}
	if len(keys) != 0 {
		t.Errorf("Expected 0 active keys after revocation, got %d", len(keys))
	}
}
