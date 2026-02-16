package core

import (
	"time"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
)

// PayrollBatch represents a group of payments
type PayrollBatch struct {
	ID             uuid.UUID       `gorm:"type:uuid;primaryKey"`
	CompanyID      uuid.UUID       `gorm:"index;not null"`
	SubmittedBy    uuid.UUID       `gorm:"index;not null"`
	Status         string          `gorm:"default:'pending'"` // pending, processing, completed, failed
	TotalAmount    decimal.Decimal `gorm:"type:numeric"`
	Currency       string          `gorm:"default:'USDC'"`
	RecipientCount int
	Description    string
	CreatedAt      time.Time
	UpdatedAt      time.Time

	Patterns []Payment `gorm:"foreignKey:BatchID"`
}

// Payment represents a single transaction
type Payment struct {
	ID               uuid.UUID `gorm:"type:uuid;primaryKey"`
	BatchID          uuid.UUID `gorm:"index;not null"`
	RecipientName    string
	RecipientEmail   string
	RecipientWallet  string          `gorm:"not null"`
	Amount           decimal.Decimal `gorm:"type:numeric;not null"`
	Currency         string          `gorm:"default:'USDC'"`
	Status           string          `gorm:"default:'pending'"`
	CircleTransferID string
	BlockchainTxHash string
	ErrorMessage     string
	CreatedAt        time.Time
	UpdatedAt        time.Time
}

// PaymentApproval handles the workflow for high-value batches
type PaymentApproval struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey"`
	BatchID     uuid.UUID `gorm:"uniqueIndex;not null"`
	RequestedBy uuid.UUID `gorm:"not null"`
	ApprovedBy  uuid.UUID
	Status      string `gorm:"default:'pending'"` // pending, approved, rejected
	Comments    string
	DecidedAt   time.Time
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
