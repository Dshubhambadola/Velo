package core

import (
	"time"

	"github.com/google/uuid"
)

// TransactionType defines the type of transaction
type TransactionType string

const (
	TransactionTypeDeposit    TransactionType = "DEPOSIT"
	TransactionTypeWithdrawal TransactionType = "WITHDRAWAL"
	TransactionTypeTransfer   TransactionType = "TRANSFER"
	TransactionTypePayment    TransactionType = "PAYMENT"
	TransactionTypeFee        TransactionType = "FEE"
)

// TransactionStatus defines status of transaction
type TransactionStatus string

const (
	TransactionStatusPending    TransactionStatus = "PENDING"
	TransactionStatusProcessing TransactionStatus = "PROCESSING"
	TransactionStatusCompleted  TransactionStatus = "COMPLETED"
	TransactionStatusFailed     TransactionStatus = "FAILED"
	TransactionStatusCancelled  TransactionStatus = "CANCELLED"
)

// Transaction represents a financial transaction
type Transaction struct {
	ID              uuid.UUID         `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	WalletID        uuid.UUID         `gorm:"type:uuid;index" json:"wallet_id"`
	Type            TransactionType   `gorm:"type:varchar(20)" json:"type"`
	Status          TransactionStatus `gorm:"type:varchar(20)" json:"status"`
	Amount          float64           `gorm:"type:decimal(20,8)" json:"amount"`
	Currency        string            `gorm:"type:varchar(10)" json:"currency"`
	Network         string            `gorm:"type:varchar(20)" json:"network"` // ETH, MATIC, BASE
	FromAddress     string            `gorm:"type:varchar(100)" json:"from_address"`
	ToAddress       string            `gorm:"type:varchar(100)" json:"to_address"`
	TransactionHash string            `gorm:"type:varchar(100);index" json:"transaction_hash"`
	Description     string            `gorm:"type:text" json:"description"`
	Metadata        JSONB             `gorm:"type:jsonb" json:"metadata"` // For extra details
	CreatedAt       time.Time         `json:"created_at"`
	UpdatedAt       time.Time         `json:"updated_at"`
}

// WalletSetting represents user preferences for their wallet
type WalletSetting struct {
	ID                uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	UserID            uuid.UUID `gorm:"type:uuid;uniqueIndex" json:"user_id"`
	DefaultNetwork    string    `gorm:"type:varchar(20);default:'ETH'" json:"default_network"`
	DefaultCurrency   string    `gorm:"type:varchar(10);default:'USD'" json:"default_currency"`
	AutoConvert       bool      `gorm:"default:false" json:"auto_convert"`
	GasPreference     string    `gorm:"type:varchar(20);default:'standard'" json:"gas_preference"` // low, standard, high
	ThemeMode         string    `gorm:"type:varchar(20);default:'system'" json:"theme_mode"`       // light, dark, obsidian, system
	NotificationEmail bool      `gorm:"default:true" json:"notification_email"`
	NotificationPush  bool      `gorm:"default:true" json:"notification_push"`
	NotificationSms   bool      `gorm:"default:false" json:"notification_sms"`
	TwoFactorEnabled  bool      `gorm:"default:false" json:"two_factor_enabled"`
	BiometricEnabled  bool      `gorm:"default:false" json:"biometric_enabled"`
	CreatedAt         time.Time `json:"created_at"`
	UpdatedAt         time.Time `json:"updated_at"`
}

// WalletLimit represents spending limits and controls
type WalletLimit struct {
	ID                 uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	UserID             uuid.UUID `gorm:"type:uuid;uniqueIndex" json:"user_id"`
	DailyLimit         float64   `gorm:"type:decimal(20,2);default:1000.00" json:"daily_limit"`
	MonthlyLimit       float64   `gorm:"type:decimal(20,2);default:10000.00" json:"monthly_limit"`
	TransactionLimit   float64   `gorm:"type:decimal(20,2);default:5000.00" json:"transaction_limit"`
	RequireApproval    bool      `gorm:"default:false" json:"require_approval"`
	ApprovalThreshold  float64   `gorm:"type:decimal(20,2);default:1000.00" json:"approval_threshold"`
	AllowInternational bool      `gorm:"default:true" json:"allow_international"`
	Frozen             bool      `gorm:"default:false" json:"frozen"`
	CreatedAt          time.Time `json:"created_at"`
	UpdatedAt          time.Time `json:"updated_at"`
}

// AddressBookEntry represents a saved contact
type AddressBookEntry struct {
	ID         uuid.UUID   `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	UserID     uuid.UUID   `gorm:"type:uuid;index" json:"user_id"`
	Name       string      `gorm:"type:varchar(100)" json:"name"`
	Address    string      `gorm:"type:varchar(100)" json:"address"`
	Network    string      `gorm:"type:varchar(20)" json:"network"`
	Email      string      `gorm:"type:varchar(100)" json:"email"`
	Tags       ArrayString `gorm:"type:text[]" json:"tags"` // "supplier", "employee", "vendor"
	IsFavorite bool        `gorm:"default:false" json:"is_favorite"`
	CreatedAt  time.Time   `json:"created_at"`
	UpdatedAt  time.Time   `json:"updated_at"`
}

// SecurityLog represents security related events
type SecurityLog struct {
	ID        uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	UserID    uuid.UUID `gorm:"type:uuid;index" json:"user_id"`
	EventType string    `gorm:"type:varchar(50)" json:"event_type"` // LOGIN, PASSWORD_CHANGE, 2FA_ENABLE, WITHDRAWAL_ATTEMPT
	Status    string    `gorm:"type:varchar(20)" json:"status"`     // SUCCESS, FAILURE, BLOCKED
	IPAddress string    `gorm:"type:varchar(50)" json:"ip_address"`
	Location  string    `gorm:"type:varchar(100)" json:"location"`
	UserAgent string    `gorm:"type:varchar(255)" json:"user_agent"`
	Metadata  JSONB     `gorm:"type:jsonb" json:"metadata"`
	CreatedAt time.Time `json:"created_at"`
}
