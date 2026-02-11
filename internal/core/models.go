package core

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// User represents a system user
type User struct {
	ID                  uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Email               string    `gorm:"uniqueIndex;not null"`
	PasswordHash        string    `gorm:"not null"` // Empty for SSO users
	FullName            string
	CompanyID           uuid.UUID `gorm:"index"`
	EmailVerified       bool      `gorm:"default:false"`
	SSOProvider         string    // google, microsoft, saml
	SSOSubject          string
	OnboardingCompleted bool `gorm:"default:false"`

	// KYC / Profile Details
	PhoneNumber    string
	PhoneCode      string
	DateOfBirth    string // YYYY-MM-DD
	AddressStreet  string
	AddressCity    string
	AddressState   string
	AddressZip     string
	AddressCountry string
	IDType         string
	IDNumber       string
	IDExpiry       string // YYYY-MM-DD
	IssuingCountry string

	// Advanced Auth
	ResetToken              string
	ResetTokenExpiresAt     time.Time
	MagicLinkToken          string
	MagicLinkTokenExpiresAt time.Time
	TwoFactorEnabled        bool
	TwoFactorSecret         string

	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`

	// Relationships
	Company   Company
	UserRoles []UserRole
}

// Company represents a tenant
type Company struct {
	ID        uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Name      string    `gorm:"not null"`
	Domain    string    `gorm:"uniqueIndex"`
	Website   string
	Size      string
	Industry  string
	Location  string // Country
	CreatedAt time.Time
	UpdatedAt time.Time
}

// Role represents a user role (RBAC)
type Role struct {
	ID           uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Name         string    `gorm:"uniqueIndex;not null"` // owner, finance_manager, etc.
	Description  string
	IsSystemRole bool `gorm:"default:false"`
}

// Permission represents a specific action on a resource
type Permission struct {
	ID          uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Resource    string    `gorm:"not null"` // payroll, wallet, etc.
	Action      string    `gorm:"not null"` // create, read, execution, etc.
	Description string
}

// RolePermission maps roles to permissions
type RolePermission struct {
	RoleID       uuid.UUID `gorm:"primaryKey"`
	PermissionID uuid.UUID `gorm:"primaryKey"`
	Conditions   JSON      `gorm:"type:jsonb"` // e.g. {"max_amount": 100000}
}

// UserRole maps users to roles within a company
type UserRole struct {
	ID         uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	UserID     uuid.UUID `gorm:"uniqueIndex:idx_user_company_role"`
	CompanyID  uuid.UUID `gorm:"uniqueIndex:idx_user_company_role"`
	RoleID     uuid.UUID
	AssignedBy uuid.UUID
	CreatedAt  time.Time

	Role Role
}

type JSON map[string]interface{}

func (j JSON) Value() (interface{}, error) {
	return j, nil
}

func (j *JSON) Scan(value interface{}) error {
	return nil // Simplified for MVP
}
