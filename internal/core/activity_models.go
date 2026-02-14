package core

import (
	"time"

	"github.com/google/uuid"
)

type ActivityType string

const (
	ActivityTypeTransaction ActivityType = "TRANSACTION"
	ActivityTypeSecurity    ActivityType = "SECURITY"
	ActivityTypeSystem      ActivityType = "SYSTEM"
	ActivityTypeUser        ActivityType = "USER"
)

type Activity struct {
	ID          uuid.UUID    `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	UserID      uuid.UUID    `gorm:"type:uuid;not null;index" json:"user_id"`
	Type        ActivityType `gorm:"type:varchar(50);not null" json:"type"`
	Title       string       `gorm:"type:varchar(255);not null" json:"title"`
	Description string       `gorm:"type:text" json:"description"`
	Metadata    JSONB        `gorm:"type:jsonb" json:"metadata"`
	CreatedAt   time.Time    `json:"created_at"`
}
