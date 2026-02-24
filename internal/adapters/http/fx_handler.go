package http

import (
	"net/http"

	"velo/internal/core/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type FXHandler struct {
	Service       *services.FXService
	WalletService *services.WalletService
}

func NewFXHandler(service *services.FXService, walletService *services.WalletService) *FXHandler {
	return &FXHandler{
		Service:       service,
		WalletService: walletService,
	}
}

// ConvertCurrency handles requests to convert balances within a wallet
func (h *FXHandler) ConvertCurrency(c *gin.Context) {
	userID, _ := c.MustGet("user_id").(uuid.UUID)

	var req struct {
		SourceCurrency string  `json:"source_currency" binding:"required"`
		TargetCurrency string  `json:"target_currency" binding:"required"`
		Amount         float64 `json:"amount" binding:"required,gt=0"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	// Make sure the user has a wallet
	wallet, err := h.WalletService.EnsureWallet(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to locate wallet"})
		return
	}

	if err := h.Service.Convert(c.Request.Context(), wallet.ID, req.SourceCurrency, req.TargetCurrency, req.Amount); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "conversion successful"})
}

// GetRate retrieves the current simulated exchange rate
func (h *FXHandler) GetRate(c *gin.Context) {
	source := c.Query("source")
	target := c.Query("target")

	if source == "" || target == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "source and target currencies are required"})
		return
	}

	rate, err := h.Service.GetRate(c.Request.Context(), source, target)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"rate": rate})
}
