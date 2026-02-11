package core

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Wallet represents a user's wallet in the system
type Wallet struct {
	ID         uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	UserID     uuid.UUID `gorm:"uniqueIndex"`
	CompanyID  uuid.UUID `gorm:"index"`
	Provider   string    // circle, stripe, etc.
	ExternalID string    // ID in provider system (e.g. Circle Wallet ID)
	Address    string    // Blockchain address if applicable
	Currency   string    // USD, USDC, etc.
	Balance    string    // Cached balance (optional)
	CreatedAt  time.Time
	UpdatedAt  time.Time
	DeletedAt  gorm.DeletedAt `gorm:"index"`

	// Relationships
	User User
}
