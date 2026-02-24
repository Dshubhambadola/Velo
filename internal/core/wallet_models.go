package core

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Wallet represents a user's wallet in the system
type Wallet struct {
	ID           uuid.UUID `gorm:"type:uuid;primaryKey"`
	UserID       uuid.UUID `gorm:"uniqueIndex"`
	CompanyID    uuid.UUID `gorm:"index"`
	Provider     string    // circle, stripe, etc.
	ExternalID   string    // ID in provider system (e.g. Circle Wallet ID)
	Address      string    // Blockchain address if applicable
	Currency     string    // Primary currency (e.g., USDC)
	Balance      string    // Cached balance (optional)
	FiatBalances JSON      `gorm:"type:jsonb"` // Store balances like {"EUR": "100.00", "GBP": "50.00"}
	CreatedAt    time.Time
	UpdatedAt    time.Time
	DeletedAt    gorm.DeletedAt `gorm:"index"`

	// Relationships
	User User
}
