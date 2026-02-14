package http

import (
	"net/http"

	"velo/internal/core/services"
	"velo/internal/middleware"

	"github.com/gin-gonic/gin"
)

type BridgeHandler struct {
	service *services.BridgeService
}

func NewBridgeHandler(service *services.BridgeService) *BridgeHandler {
	return &BridgeHandler{service: service}
}

func (h *BridgeHandler) GetQuote(c *gin.Context) {
	sourceChain := c.Query("source_chain")
	destChain := c.Query("dest_chain")
	token := c.Query("token")
	amountStr := c.Query("amount")

	// Basic validation
	if sourceChain == "" || destChain == "" || token == "" || amountStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing required parameters"})
		return
	}

	// Parse amount logic omitted for brevity in mock, assuming valid float
	// In real app use strconv.ParseFloat
	amount := 1000.0 // Mock parsing

	quote, err := h.service.GetQuote(sourceChain, destChain, token, amount)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate quote"})
		return
	}

	c.JSON(http.StatusOK, quote)
}

func (h *BridgeHandler) ExecuteBridge(c *gin.Context) {
	userID, err := middleware.GetUserIDFromContext(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var req struct {
		QuoteID string `json:"quote_id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tx, err := h.service.ExecuteBridge(userID, req.QuoteID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to execute bridge transfer"})
		return
	}

	c.JSON(http.StatusOK, tx)
}
