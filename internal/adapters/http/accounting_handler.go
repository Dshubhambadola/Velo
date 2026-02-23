package http

import (
	"net/http"

	"velo/internal/core/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type AccountingHandler struct {
	Service *services.AccountingService
}

func NewAccountingHandler(service *services.AccountingService) *AccountingHandler {
	return &AccountingHandler{Service: service}
}

// ConnectProvider handles connecting to an accounting provider
func (h *AccountingHandler) ConnectProvider(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)

	var req struct {
		Provider     string `json:"provider" binding:"required"`
		AccessToken  string `json:"access_token" binding:"required"`
		RefreshToken string `json:"refresh_token" binding:"required"`
		ExpiresIn    int    `json:"expires_in" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	integration, err := h.Service.ConnectProvider(c.Request.Context(), companyID, req.Provider, req.AccessToken, req.RefreshToken, req.ExpiresIn)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"integration": integration})
}

// DisconnectProvider handles removing a connection
func (h *AccountingHandler) DisconnectProvider(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)
	provider := c.Param("provider")

	if provider == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "provider is required"})
		return
	}

	if err := h.Service.DisconnectProvider(c.Request.Context(), companyID, provider); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to disconnect"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "disconnected successfully"})
}

// GetIntegrations lists current connections
func (h *AccountingHandler) GetIntegrations(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)

	integrations, err := h.Service.GetIntegrations(c.Request.Context(), companyID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to list integrations"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"integrations": integrations})
}

// SyncData manually triggers a data sync for a provider
func (h *AccountingHandler) SyncData(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)
	provider := c.Param("provider")

	if err := h.Service.SyncData(c.Request.Context(), companyID, provider); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "sync triggered successfully"})
}
