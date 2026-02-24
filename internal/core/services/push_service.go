package services

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// MobileDevice represents a registered device for a user to receive push notifications
type MobileDevice struct {
	ID       uuid.UUID `gorm:"primaryKey;type:uuid"`
	UserID   uuid.UUID `gorm:"index"`
	Token    string    // FCM or APNs device token
	Platform string    // "ios" or "android"
	IsActive bool      `gorm:"default:true"`
}

type PushNotificationService struct {
	DB *gorm.DB
}

func NewPushNotificationService(db *gorm.DB) *PushNotificationService {
	// Ensure table exists in our DB during creation for this MVP,
	// though normally we'd put this in migrate/main.go
	db.AutoMigrate(&MobileDevice{})
	return &PushNotificationService{DB: db}
}

// RegisterDevice saves a new push token for a user
func (s *PushNotificationService) RegisterDevice(ctx context.Context, userID uuid.UUID, token, platform string) error {
	var device MobileDevice
	err := s.DB.Where("user_id = ? AND token = ?", userID, token).First(&device).Error

	if err != nil && err != gorm.ErrRecordNotFound {
		return err
	}

	if err == gorm.ErrRecordNotFound {
		device = MobileDevice{
			ID:       uuid.New(),
			UserID:   userID,
			Token:    token,
			Platform: platform,
			IsActive: true,
		}
		return s.DB.Create(&device).Error
	}

	// Update existing
	device.IsActive = true
	device.Platform = platform
	return s.DB.Save(&device).Error
}

// SendNotification sends a payload to a target user's active devices
func (s *PushNotificationService) SendNotification(ctx context.Context, userID uuid.UUID, title, body string, data map[string]string) error {
	var devices []MobileDevice
	if err := s.DB.Where("user_id = ? AND is_active = ?", userID, true).Find(&devices).Error; err != nil {
		return err
	}

	if len(devices) == 0 {
		return nil // No active devices, silently ignore
	}

	// Iterate and simulate sending
	for _, dev := range devices {
		// Mock API call to FCM/APNs
		fmt.Printf("[PUSH NOTIFICATION] Sending to %s (%s): %s - %s\n", dev.Token, dev.Platform, title, body)
	}

	return nil
}
