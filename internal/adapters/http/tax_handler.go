package http

import (
	"net/http"
	"strconv"

	"velo/internal/core/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type TaxHandler struct {
	Service *services.TaxService
}

func NewTaxHandler(service *services.TaxService) *TaxHandler {
	return &TaxHandler{Service: service}
}

// UploadDocument receives a w9/w8ben and creates a record
func (h *TaxHandler) UploadDocument(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)

	// In a real app we parse user_id from token, for mock we get from body
	idStr := c.GetString("user_id")
	var userID uuid.UUID

	var req struct {
		UserID  string `json:"user_id"`
		Type    string `json:"type" binding:"required"`
		FileURL string `json:"file_url" binding:"required"`
		Year    int    `json:"year" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid payload"})
		return
	}

	if idStr != "" {
		userID, _ = uuid.Parse(idStr)
	} else if req.UserID != "" {
		userID, _ = uuid.Parse(req.UserID)
	} else {
		userID = uuid.New() // Mocking for MVP
	}

	doc, err := h.Service.UploadTaxDocument(c.Request.Context(), companyID, userID, req.Type, req.FileURL, req.Year)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to upload document"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"document": doc})
}

// GetCompanyDocuments retrieves 1099s/W9s for admins
func (h *TaxHandler) GetCompanyDocuments(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)
	yearStr := c.Query("year")
	year := 0
	if yearStr != "" {
		year, _ = strconv.Atoi(yearStr)
	}

	docs, err := h.Service.GetCompanyDocuments(c.Request.Context(), companyID, year)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to retrieve documents"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"documents": docs})
}

// Generate1099s manually triggers batch generation
func (h *TaxHandler) Generate1099s(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)

	var req struct {
		Year int `json:"year" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid payload"})
		return
	}

	err := h.Service.Generate1099s(c.Request.Context(), companyID, req.Year)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate 1099s"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "1099 generation started successfully"})
}
