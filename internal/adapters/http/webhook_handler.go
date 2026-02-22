package http

import (
	"net/http"

	"velo/internal/core/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type WebhookHandler struct {
	Service *services.WebhookService
}

func NewWebhookHandler(service *services.WebhookService) *WebhookHandler {
	return &WebhookHandler{Service: service}
}

// CreateEndpoint creates a new webhook destination
func (h *WebhookHandler) CreateEndpoint(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)

	var req struct {
		URL         string   `json:"url" binding:"required,url"`
		Description string   `json:"description"`
		Events      []string `json:"events" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body: " + err.Error()})
		return
	}

	endpoint, err := h.Service.CreateEndpoint(c.Request.Context(), companyID, req.URL, req.Description, req.Events)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create webhook endpoint"})
		return
	}

	c.JSON(http.StatusCreated, endpoint)
}

// ListEndpoints returns all webhooks
func (h *WebhookHandler) ListEndpoints(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)

	endpoints, err := h.Service.ListEndpoints(c.Request.Context(), companyID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to list endpoints"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"endpoints": endpoints})
}

// DeleteEndpoint removes a webhook
func (h *WebhookHandler) DeleteEndpoint(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)

	endpointIDStr := c.Param("id")
	endpointID, err := uuid.Parse(endpointIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid endpoint id"})
		return
	}

	if err := h.Service.DeleteEndpoint(c.Request.Context(), companyID, endpointID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete endpoint: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "endpoint deleted successfully"})
}

// TriggerEvent is a manual override/test endpoint to trigger a generic webhook
func (h *WebhookHandler) TriggerEvent(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)

	var req struct {
		Event   string      `json:"event" binding:"required"`
		Payload interface{} `json:"payload" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid payload"})
		return
	}

	if err := h.Service.DispatchEvent(c.Request.Context(), companyID, req.Event, req.Payload); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to dispatch event"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "event dispatched"})
}
