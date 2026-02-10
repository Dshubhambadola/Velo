package http

import (
	"net/http"

	"velo/internal/ports"

	"github.com/gin-gonic/gin"
)

type WalletHandler struct {
	Provider ports.PaymentProvider
}

func NewWalletHandler(provider ports.PaymentProvider) *WalletHandler {
	return &WalletHandler{Provider: provider}
}

func (h *WalletHandler) CreateWallet(c *gin.Context) {
	// In a real app, userID would come from auth context
	// For MVP wallet service might be internal, but let's assume it receives userID
	var req struct {
		UserID string `json:"user_id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	wallet, err := h.Provider.CreateWallet(c.Request.Context(), req.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, wallet)
}

func (h *WalletHandler) GetBalance(c *gin.Context) {
	walletID := c.Param("wallet_id")
	if walletID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "wallet_id is required"})
		return
	}

	balance, err := h.Provider.GetBalance(c.Request.Context(), walletID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, balance)
}
