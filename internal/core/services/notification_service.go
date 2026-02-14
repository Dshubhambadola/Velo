package services

import (
	"velo/internal/core"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type NotificationService struct {
	DB *gorm.DB
}

func NewNotificationService(db *gorm.DB) *NotificationService {
	return &NotificationService{DB: db}
}

func (s *NotificationService) ListNotifications(userID uuid.UUID, limit int, offset int) ([]core.Notification, error) {
	var notifications []core.Notification
	result := s.DB.Where("user_id = ?", userID).Order("created_at desc").Limit(limit).Offset(offset).Find(&notifications)
	return notifications, result.Error
}

func (s *NotificationService) MarkAsRead(userID, notificationID uuid.UUID) error {
	return s.DB.Model(&core.Notification{}).Where("id = ? AND user_id = ?", notificationID, userID).Update("is_read", true).Error
}

func (s *NotificationService) MarkAllAsRead(userID uuid.UUID) error {
	return s.DB.Model(&core.Notification{}).Where("user_id = ? AND is_read = ?", userID, false).Update("is_read", true).Error
}

func (s *NotificationService) CreateNotification(userID uuid.UUID, notifType core.NotificationType, title, message, link string) error {
	notif := core.Notification{
		UserID:  userID,
		Type:    notifType,
		Title:   title,
		Message: message,
		Link:    link,
	}
	return s.DB.Create(&notif).Error
}
