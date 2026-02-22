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

	// Recurrence
	RecurrenceRule  string // "weekly", "monthly", "bi-weekly", "none"
	NextExecutionAt time.Time

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
	ID                uuid.UUID `gorm:"type:uuid;primaryKey"`
	BatchID           uuid.UUID `gorm:"uniqueIndex;not null"`
	RequestedBy       uuid.UUID `gorm:"not null"`
	RequiredApprovals int       `gorm:"default:1"`
	CurrentApprovals  int       `gorm:"default:0"`
	Status            string    `gorm:"default:'pending'"` // pending, partially_approved, approved, rejected
	Comments          string
	DecidedAt         *time.Time
	CreatedAt         time.Time
	UpdatedAt         time.Time

	Signatures []PaymentApprovalSignature `gorm:"foreignKey:ApprovalID"`
}

// PaymentApprovalSignature records each individual user's approval
type PaymentApprovalSignature struct {
	ID         uuid.UUID `gorm:"type:uuid;primaryKey"`
	ApprovalID uuid.UUID `gorm:"index;not null"`
	UserID     uuid.UUID `gorm:"index;not null"`     // User who approved/rejected
	Status     string    `gorm:"default:'approved'"` // approved, rejected
	Comments   string
	CreatedAt  time.Time
}
