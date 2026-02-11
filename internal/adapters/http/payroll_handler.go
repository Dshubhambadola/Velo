package http

import (
	"net/http"

	"velo/internal/core"
	"velo/internal/core/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type PayrollHandler struct {
	Service *services.PayrollService
}

func NewPayrollHandler(service *services.PayrollService) *PayrollHandler {
	return &PayrollHandler{Service: service}
}

// UploadBatch handles CSV upload and batch creation
func (h *PayrollHandler) UploadBatch(c *gin.Context) {
	file, _, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "file is required"})
		return
	}
	defer file.Close()

	description := c.PostForm("description")
	companyID := c.MustGet("company_id").(uuid.UUID)
	userID := c.MustGet("user_id").(uuid.UUID)

	payments, err := services.ParsePayrollCSV(file, "")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	batch, err := h.Service.CreateBatch(c.Request.Context(), companyID, userID, payments, description)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":  "Batch created successfully",
		"batch_id": batch.ID,
		"status":   batch.Status,
	})
}

// ApproveBatch handles batch approval
func (h *PayrollHandler) ApproveBatch(c *gin.Context) {
	approvalIDStr := c.Param("approval_id")
	approvalID, err := uuid.Parse(approvalIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid approval id"})
		return
	}

	approverID := c.MustGet("user_id").(uuid.UUID)

	if err := h.Service.ApproveBatch(c.Request.Context(), approvalID, approverID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Batch approved"})
}

// ListBatches returns all batches for the authenticated company
func (h *PayrollHandler) ListBatches(c *gin.Context) {
	companyID := c.MustGet("company_id").(uuid.UUID)

	batches, err := h.Service.ListBatches(companyID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, batches)
}

// GetBatch returns details of a specific batch
func (h *PayrollHandler) GetBatch(c *gin.Context) {
	batchIDStr := c.Param("batch_id")
	batchID, err := uuid.Parse(batchIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid batch id"})
		return
	}

	batch, err := h.Service.GetBatchDetails(batchID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, batch)
}

// CreateBatchRequest defines the payload for manual batch creation
type CreateBatchRequest struct {
	Description string         `json:"description"`
	Payments    []core.Payment `json:"payments"`
}

// CreateBatchManual handles manual batch creation via JSON
func (h *PayrollHandler) CreateBatchManual(c *gin.Context) {
	var req CreateBatchRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	companyID := c.MustGet("company_id").(uuid.UUID)
	userID := c.MustGet("user_id").(uuid.UUID)

	batch, err := h.Service.CreateBatch(c.Request.Context(), companyID, userID, req.Payments, req.Description)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":  "Batch created successfully",
		"batch_id": batch.ID,
		"status":   batch.Status,
	})
}

// ExecuteBatch triggers batch processing
func (h *PayrollHandler) ExecuteBatch(c *gin.Context) {
	batchIDStr := c.Param("batch_id")
	batchID, err := uuid.Parse(batchIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid batch id"})
		return
	}

	if err := h.Service.ExecuteBatch(c.Request.Context(), batchID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Batch execution started"})
}
