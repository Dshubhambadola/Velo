package services

import (
	"testing"
	"velo/internal/core"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupAdminTestDB() *gorm.DB {
	db, _ := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	db.AutoMigrate(&core.User{}, &core.Company{}, &core.Role{}, &core.UserRole{})
	return db
}

func TestGetAllUsers(t *testing.T) {
	db := setupAdminTestDB()
	service := NewAdminService(db)

	// Seed Users
	for i := 0; i < 15; i++ {
		db.Create(&core.User{
			ID:    uuid.New(),
			Email: "user" + string(rune(i)) + "@example.com",
		})
	}

	// Test Pagination (Page 1, Limit 10)
	users, total, err := service.GetAllUsers(1, 10)
	assert.NoError(t, err)
	assert.Equal(t, 10, len(users))
	assert.Equal(t, int64(15), total)

	// Test Pagination (Page 2, Limit 10)
	users, _, err = service.GetAllUsers(2, 10)
	assert.NoError(t, err)
	assert.Equal(t, 5, len(users))
}

func TestGetComplianceQueue(t *testing.T) {
	db := setupAdminTestDB()
	service := NewAdminService(db)

	// Seed Users
	db.Create(&core.User{ID: uuid.New(), Email: "pending@example.com", KYCStatus: "pending"})
	db.Create(&core.User{ID: uuid.New(), Email: "approved@example.com", KYCStatus: "approved"})
	db.Create(&core.User{ID: uuid.New(), Email: "init@example.com", KYCStatus: "init"})

	users, err := service.GetComplianceQueue()
	assert.NoError(t, err)
	assert.Equal(t, 1, len(users))
	assert.Equal(t, "pending@example.com", users[0].Email)
}

func TestApproveKYC(t *testing.T) {
	db := setupAdminTestDB()
	service := NewAdminService(db)

	userID := uuid.New()
	db.Create(&core.User{ID: userID, Email: "user@example.com", KYCStatus: "pending"})

	err := service.ApproveKYC(userID.String())
	assert.NoError(t, err)

	var user core.User
	db.First(&user, "id = ?", userID)
	assert.Equal(t, "approved", user.KYCStatus)
}

func TestRejectKYC(t *testing.T) {
	db := setupAdminTestDB()
	service := NewAdminService(db)

	userID := uuid.New()
	db.Create(&core.User{ID: userID, Email: "user@example.com", KYCStatus: "pending"})

	err := service.RejectKYC(userID.String())
	assert.NoError(t, err)

	var user core.User
	db.First(&user, "id = ?", userID)
	assert.Equal(t, "rejected", user.KYCStatus)
}
