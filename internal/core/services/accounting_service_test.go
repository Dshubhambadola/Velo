package services

import (
	"context"
	"testing"
	"velo/internal/core"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupAccountingTestDB() *gorm.DB {
	db, _ := gorm.Open(sqlite.Open("file::memory:?cache=shared"), &gorm.Config{})
	db.AutoMigrate(&core.Company{}, &core.Integration{})
	return db
}

func TestAccountingConnections(t *testing.T) {
	db := setupAccountingTestDB()
	service := NewAccountingService(db)

	companyID := uuid.New()
	db.Create(&core.Company{ID: companyID, Name: "Sync Corp"})

	t.Run("Connect Quickbooks", func(t *testing.T) {
		integration, err := service.ConnectProvider(context.Background(), companyID, "quickbooks", "access_123", "refresh_123", 3600)
		assert.NoError(t, err)
		assert.Equal(t, "quickbooks", integration.Provider)
		assert.Equal(t, "connected", integration.Status)

		// Verify it's in the list
		integrations, err := service.GetIntegrations(context.Background(), companyID)
		assert.NoError(t, err)
		assert.Len(t, integrations, 1)
	})

	t.Run("Sync With Disconnected Provider", func(t *testing.T) {
		err := service.SyncData(context.Background(), companyID, "xero")
		assert.Error(t, err)
		assert.Contains(t, err.Error(), "provider not connected")
	})

	t.Run("Sync Connected Provider", func(t *testing.T) {
		err := service.SyncData(context.Background(), companyID, "quickbooks")
		assert.NoError(t, err)

		// Verify LastSyncAt was updated
		integrations, _ := service.GetIntegrations(context.Background(), companyID)
		assert.False(t, integrations[0].LastSyncAt.IsZero())
	})

	t.Run("Disconnect Provider", func(t *testing.T) {
		err := service.DisconnectProvider(context.Background(), companyID, "quickbooks")
		assert.NoError(t, err)

		integrations, _ := service.GetIntegrations(context.Background(), companyID)
		assert.Len(t, integrations, 0)
	})
}
