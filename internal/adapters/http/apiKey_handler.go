package http

import (
	"net/http"

	"velo/internal/core/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type APIKeyHandler struct {
	Service *services.APIKeyService
}

func NewAPIKeyHandler(service *services.APIKeyService) *APIKeyHandler {
	return &APIKeyHandler{Service: service}
}

// GenerateKey handles the creation of a new API key
func (h *APIKeyHandler) GenerateKey(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)
	userID, _ := c.MustGet("user_id").(uuid.UUID)

	var req struct {
		Name string `json:"name" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	key, secret, err := h.Service.GenerateAPIKey(c.Request.Context(), companyID, userID, req.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate api key"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"id":         key.ID,
		"name":       key.Name,
		"prefix":     key.Prefix,
		"created_at": key.CreatedAt,
		// ONLY Return the raw secret once!
		"secret_key": secret,
	})
}

// ListKeys returns all generated API keys
func (h *APIKeyHandler) ListKeys(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)

	keys, err := h.Service.ListAPIKeys(c.Request.Context(), companyID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to retrieve api keys"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"keys": keys})
}

// RevokeKey removes/disables an API Key
func (h *APIKeyHandler) RevokeKey(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)

	keyIDStr := c.Param("id")
	keyID, err := uuid.Parse(keyIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid key format"})
		return
	}

	if err := h.Service.RevokeAPIKey(c.Request.Context(), companyID, keyID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "api key revoked successfully"})
}
