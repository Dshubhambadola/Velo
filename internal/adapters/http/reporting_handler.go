package http

import (
	"net/http"
	"time"

	"velo/internal/core/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type ReportingHandler struct {
	Service *services.ReportingService
}

func NewReportingHandler(service *services.ReportingService) *ReportingHandler {
	return &ReportingHandler{Service: service}
}

// ExportBatchCSV returns a CSV file download for a specific batch
func (h *ReportingHandler) ExportBatchCSV(c *gin.Context) {
	batchIDStr := c.Param("batch_id")
	batchID, err := uuid.Parse(batchIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid batch id"})
		return
	}

	companyID := c.MustGet("company_id").(uuid.UUID)

	csvData, err := h.Service.GenerateBatchReportCSV(c.Request.Context(), companyID, batchID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate report"})
		return
	}

	// Set headers for file download
	c.Header("Content-Description", "File Transfer")
	c.Header("Content-Disposition", "attachment; filename=batch_"+batchIDStr+".csv")
	c.Data(http.StatusOK, "text/csv", csvData)
}

// GetAnalytics returns aggregated data for the dashboard
func (h *ReportingHandler) GetAnalytics(c *gin.Context) {
	companyID := c.MustGet("company_id").(uuid.UUID)

	// Default to last 30 days if empty
	startDateStr := c.Query("start_date")
	endDateStr := c.Query("end_date")

	var startDate, endDate time.Time
	var err error

	if startDateStr == "" {
		startDate = time.Now().AddDate(0, 0, -30)
	} else {
		startDate, err = time.Parse(time.RFC3339, startDateStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid start_date format"})
			return
		}
	}

	if endDateStr == "" {
		endDate = time.Now()
	} else {
		endDate, err = time.Parse(time.RFC3339, endDateStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid end_date format"})
			return
		}
	}

	analytics, err := h.Service.GetCompanyAnalytics(c.Request.Context(), companyID, startDate, endDate)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to retrieve analytics"})
		return
	}

	c.JSON(http.StatusOK, analytics)
}
