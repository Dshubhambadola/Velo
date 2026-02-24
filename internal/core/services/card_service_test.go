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

func setupCardTestDB(testName string) *gorm.DB {
	db, _ := gorm.Open(sqlite.Open("file:"+testName+"?mode=memory&cache=shared"), &gorm.Config{})
	db.AutoMigrate(&core.Company{}, &core.User{}, &core.CorporateCard{})
	return db
}

func TestIssueCard(t *testing.T) {
	db := setupCardTestDB(uuid.NewString())
	service := NewCardManagementService(db)

	companyID := uuid.New()
	userID := uuid.New()

	db.Create(&core.Company{ID: companyID, Name: "Test Corp"})
	db.Create(&core.User{ID: userID, CompanyID: companyID, Email: "employee@test.com"})

	t.Run("Success Virtual Card", func(t *testing.T) {
		card, err := service.IssueCard(context.Background(), companyID, userID, "virtual", 500, 2000)

		assert.NoError(t, err)
		assert.NotNil(t, card)
		assert.Equal(t, "virtual", card.Type)
		assert.Equal(t, "active", card.Status)
		assert.Equal(t, 500, card.DailyLimit)
		assert.Equal(t, 2000, card.MonthlyLimit)
		assert.NotEmpty(t, card.ProviderCardID)
		assert.NotEmpty(t, card.Last4)
	})

	t.Run("Invalid Card Type", func(t *testing.T) {
		_, err := service.IssueCard(context.Background(), companyID, userID, "magic", 500, 2000)
		assert.Error(t, err)
		assert.Contains(t, err.Error(), "invalid card type")
	})

	t.Run("Invalid User", func(t *testing.T) {
		wrongCompany := uuid.New()
		_, err := service.IssueCard(context.Background(), wrongCompany, userID, "physical", 500, 2000)
		assert.Error(t, err)
		assert.Contains(t, err.Error(), "user not found or does not belong to this company")
	})
}

func TestUpdateCardStatus(t *testing.T) {
	db := setupCardTestDB(uuid.NewString())
	service := NewCardManagementService(db)

	companyID := uuid.New()
	userID := uuid.New()

	db.Create(&core.Company{ID: companyID, Name: "Test Corp"})
	db.Create(&core.User{ID: userID, CompanyID: companyID, Email: "employee@test.com"})

	card, _ := service.IssueCard(context.Background(), companyID, userID, "virtual", 500, 2000)

	t.Run("Freeze Card", func(t *testing.T) {
		err := service.UpdateCardStatus(context.Background(), companyID, card.ID, "frozen")
		assert.NoError(t, err)

		var updatedCard core.CorporateCard
		db.First(&updatedCard, "id = ?", card.ID)
		assert.Equal(t, "frozen", updatedCard.Status)
	})

	t.Run("Invalid Status", func(t *testing.T) {
		err := service.UpdateCardStatus(context.Background(), companyID, card.ID, "hacked")
		assert.Error(t, err)
		assert.Contains(t, err.Error(), "invalid status transition")
	})
}
