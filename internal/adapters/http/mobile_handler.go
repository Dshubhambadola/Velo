package http

import (
	"net/http"

	"velo/internal/core/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type MobileHandler struct {
	WalletService *services.WalletService
	PushService   *services.PushNotificationService
}

func NewMobileHandler(walletService *services.WalletService, pushService *services.PushNotificationService) *MobileHandler {
	return &MobileHandler{
		WalletService: walletService,
		PushService:   pushService,
	}
}

// GetDashboardData aggregates user info, wallet, and recent txs for mobile startup
func (h *MobileHandler) GetDashboardData(c *gin.Context) {
	idStr := c.GetString("userID")
	if idStr == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}
	userID, _ := uuid.Parse(idStr)

	// Fetch Wallet
	wallet, err := h.WalletService.EnsureWallet(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch wallet parameters"})
		return
	}

	// Fetch recent Transactions (limit for mobile)
	txs, err := h.WalletService.GetTransactions(c.Request.Context(), userID)
	if err != nil {
		txs = nil
	}

	// Truncate to top 5 for mobile dashboard speed
	if len(txs) > 5 {
		txs = txs[:5]
	}

	c.JSON(http.StatusOK, gin.H{
		"wallet": gin.H{
			"id":             wallet.ID,
			"primaryBalance": wallet.Balance,
			"currency":       wallet.Currency,
			"fiatBalances":   wallet.FiatBalances,
		},
		"recent_activity": txs,
		"notifications":   0, // Placeholder
	})
}

// RegisterDevice handles an iOS/Android device registering its push token
func (h *MobileHandler) RegisterDevice(c *gin.Context) {
	idStr := c.GetString("userID")
	if idStr == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}
	userID, _ := uuid.Parse(idStr)

	var req struct {
		Token    string `json:"token" binding:"required"`
		Platform string `json:"platform" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid struct payload"})
		return
	}

	if err := h.PushService.RegisterDevice(c.Request.Context(), userID, req.Token, req.Platform); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to register device"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "device registered"})
}
