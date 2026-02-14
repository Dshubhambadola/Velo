package services

import (
	"velo/internal/core"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type AnalyticsService struct {
	DB *gorm.DB
}

func NewAnalyticsService(db *gorm.DB) *AnalyticsService {
	return &AnalyticsService{DB: db}
}

// AnalyticsData represents the aggregated data for the dashboard
// In a real system, this would aggregate from multiple tables/services
type AnalyticsData struct {
	TotalVolume       float64      `json:"total_volume"`
	TotalVolumeTrend  float64      `json:"total_volume_trend"` // Percentage
	ActiveUsers       int64        `json:"active_users"`
	ActiveUsersTrend  float64      `json:"active_users_trend"`
	Transactions      int64        `json:"transactions"`
	TransactionsTrend float64      `json:"transactions_trend"`
	NetworkHealth     float64      `json:"network_health"` // 0-100
	Revenue           float64      `json:"revenue"`
	RevenueTrend      float64      `json:"revenue_trend"`
	ChartData         []ChartPoint `json:"chart_data"`
	GeographicData    []GeoPoint   `json:"geographic_data"`
}

type ChartPoint struct {
	Date  string  `json:"date"`
	Value float64 `json:"value"`
}

type GeoPoint struct {
	Country string  `json:"country"`
	Users   int64   `json:"users"`
	Volume  float64 `json:"volume"`
}

func (s *AnalyticsService) GetOverview(userID uuid.UUID) (*AnalyticsData, error) {
	// For MVP, we will return mock/calculated data.
	// In production, this would run complex SQL queries or query an OLAP DB.

	// Example: Count users
	var userCount int64
	s.DB.Model(&core.User{}).Count(&userCount)

	// Example: Sum volume (mocked for now as we don't have transaction amounts easily accessible without joins)

	// Mock Data for High Fidelity UI
	data := &AnalyticsData{
		TotalVolume:       4280000.00,
		TotalVolumeTrend:  12.4,
		ActiveUsers:       userCount,
		ActiveUsersTrend:  5.2,
		Transactions:      12450,
		TransactionsTrend: 8.1,
		NetworkHealth:     99.9,
		Revenue:           125000.00,
		RevenueTrend:      3.5,
		ChartData: []ChartPoint{
			{Date: "Mon", Value: 12000},
			{Date: "Tue", Value: 19000},
			{Date: "Wed", Value: 15000},
			{Date: "Thu", Value: 22000},
			{Date: "Fri", Value: 28000},
			{Date: "Sat", Value: 18000},
			{Date: "Sun", Value: 25000},
		},
		GeographicData: []GeoPoint{
			{Country: "USA", Users: 1200, Volume: 500000},
			{Country: "UK", Users: 400, Volume: 150000},
			{Country: "Germany", Users: 300, Volume: 120000},
		},
	}

	return data, nil
}
