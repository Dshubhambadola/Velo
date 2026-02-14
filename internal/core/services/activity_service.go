package services

import (
	"velo/internal/core"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ActivityService struct {
	DB *gorm.DB
}

func NewActivityService(db *gorm.DB) *ActivityService {
	return &ActivityService{DB: db}
}

func (s *ActivityService) ListActivities(userID uuid.UUID, limit int, offset int) ([]core.Activity, error) {
	var activities []core.Activity
	result := s.DB.Where("user_id = ?", userID).Order("created_at desc").Limit(limit).Offset(offset).Find(&activities)
	return activities, result.Error
}

func (s *ActivityService) LogActivity(userID uuid.UUID, activityType core.ActivityType, title, description string, metadata map[string]interface{}) error {
	activity := core.Activity{
		UserID:      userID,
		Type:        activityType,
		Title:       title,
		Description: description,
		Metadata:    core.JSONB(metadata),
	}
	return s.DB.Create(&activity).Error
}
