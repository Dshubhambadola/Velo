package http

import (
	"net/http"

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
