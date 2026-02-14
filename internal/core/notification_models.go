package core

import (
	"time"

	"github.com/google/uuid"
)

type NotificationType string

const (
	NotificationTypeInfo    NotificationType = "INFO"
	NotificationTypeSuccess NotificationType = "SUCCESS"
	NotificationTypeWarning NotificationType = "WARNING"
	NotificationTypeError   NotificationType = "ERROR"
)

type Notification struct {
	ID        uuid.UUID        `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	UserID    uuid.UUID        `gorm:"type:uuid;not null;index" json:"user_id"`
	Type      NotificationType `gorm:"type:varchar(50);not null" json:"type"`
	Title     string           `gorm:"type:varchar(255);not null" json:"title"`
	Message   string           `gorm:"type:text" json:"message"`
	IsRead    bool             `gorm:"default:false" json:"is_read"`
	Link      string           `gorm:"type:varchar(255)" json:"link"`
	Metadata  JSONB            `gorm:"type:jsonb" json:"metadata"`
	CreatedAt time.Time        `json:"created_at"`
}
