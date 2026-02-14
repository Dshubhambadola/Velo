package services

import (
	"time"

	"gorm.io/gorm"
)

type SystemStatusService struct {
	DB *gorm.DB
}

func NewSystemStatusService(db *gorm.DB) *SystemStatusService {
	return &SystemStatusService{DB: db}
}

type ComponentStatus struct {
	Name    string `json:"name"`
	Status  string `json:"status"` // operational, degraded, outage
	Latency int    `json:"latency_ms"`
}

type SystemStatus struct {
	OverallStatus string            `json:"overall_status"`
	Components    []ComponentStatus `json:"components"`
	UpdatedAt     time.Time         `json:"updated_at"`
}

func (s *SystemStatusService) GetSystemStatus() (*SystemStatus, error) {
	// Check DB
	dbStart := time.Now()
	dbStatus := "operational"
	sqlDB, err := s.DB.DB()
	if err != nil || sqlDB.Ping() != nil {
		dbStatus = "outage"
	}
	dbLatency := int(time.Since(dbStart).Milliseconds())

	// Mock other components
	components := []ComponentStatus{
		{Name: "API Gateway", Status: "operational", Latency: 15},
		{Name: "PostgreSQL Database", Status: dbStatus, Latency: dbLatency},
		{Name: "Redis Cache", Status: "operational", Latency: 5},
		{Name: "Payment Processor (Circle)", Status: "operational", Latency: 120},
		{Name: "Email Service", Status: "operational", Latency: 45},
	}

	overall := "operational"
	for _, c := range components {
		if c.Status == "outage" {
			overall = "outage"
			break
		}
		if c.Status == "degraded" {
			overall = "degraded"
		}
	}

	return &SystemStatus{
		OverallStatus: overall,
		Components:    components,
		UpdatedAt:     time.Now(),
	}, nil
}
