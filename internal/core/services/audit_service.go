package services

import (
	"context"
	"time"

	"velo/internal/core"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type AuditService struct {
	DB *gorm.DB
}

func NewAuditService(db *gorm.DB) *AuditService {
	return &AuditService{DB: db}
}

// LogAction asynchronously records an audit event
func (s *AuditService) LogAction(companyID, userID uuid.UUID, action, resource, resourceID string, details map[string]interface{}, ipAddress, userAgent string) {
	// Execute in a goroutine to not block the main request thread
	go func() {
		log := &core.AuditLog{
			ID:         uuid.New(),
			CompanyID:  companyID,
			UserID:     userID,
			Action:     action,
			Resource:   resource,
			ResourceID: resourceID,
			Details:    core.JSON(details),
			IPAddress:  ipAddress,
			UserAgent:  userAgent,
			CreatedAt:  time.Now(),
		}

		// Note: error handling is omitted in the background thread for simplicity,
		// in production this might go to a persistent queue or have retries.
		s.DB.Create(log)
	}()
}

// ListLogs retrieves audit logs for a company
func (s *AuditService) ListLogs(ctx context.Context, companyID uuid.UUID, limit, offset int) ([]core.AuditLog, error) {
	var logs []core.AuditLog

	query := s.DB.Where("company_id = ?", companyID).Order("created_at desc")
	if limit > 0 {
		query = query.Limit(limit)
	}
	if offset > 0 {
		query = query.Offset(offset)
	}

	if err := query.Find(&logs).Error; err != nil {
		return nil, err
	}
	return logs, nil
}
