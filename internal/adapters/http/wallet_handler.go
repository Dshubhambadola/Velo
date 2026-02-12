package http

import (
	"net/http"

	"velo/internal/core"
	"velo/internal/core/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type WalletHandler struct {
	Service *services.WalletService
}

func NewWalletHandler(service *services.WalletService) *WalletHandler {
	return &WalletHandler{Service: service}
}

// Helper to get UserID from context (mocked for now)
func getUserID(c *gin.Context) (uuid.UUID, error) {
	// In real app, extracting from JWT claims
	// For MVP, we might expect it in header or query, or hardcode a test user if allowAnonymous
	// Let's assume the auth middleware sets "userID" in context
	idStr := c.GetString("userID")
	if idStr == "" {
		// Fallback for testing: check query param
		idStr = c.Query("userId")
	}

	if idStr == "" {
		return uuid.Nil, http.ErrNoCookie // Just an error
	}

	return uuid.Parse(idStr)
}

func (h *WalletHandler) CreateWallet(c *gin.Context) {
	// In a real app, userID would come from auth context
	userID, err := getUserID(c)
	if err != nil {
		// Try body for initial creation if not auth'd yet?
		// Actually wallet creation usually happens after auth.
		// Let's allow passing in body for testing if dev mode
		var req struct {
			UserID string `json:"user_id" binding:"required"`
		}
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "user_id required in body or auth context"})
			return
		}
		userID, _ = uuid.Parse(req.UserID)
	}

	wallet, err := h.Service.EnsureWallet(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, wallet)
}

func (h *WalletHandler) GetBalance(c *gin.Context) {
	userID, err := getUserID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	balance, err := h.Service.GetBalance(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, balance)
}

func (h *WalletHandler) GetTransactions(c *gin.Context) {
	userID, err := getUserID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	txs, err := h.Service.GetTransactions(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, txs)
}

// --- Settings ---

func (h *WalletHandler) GetSettings(c *gin.Context) {
	userID, err := getUserID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	settings, err := h.Service.GetSettings(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, settings)
}

func (h *WalletHandler) UpdateSettings(c *gin.Context) {
	userID, err := getUserID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	var updates core.WalletSetting
	if err := c.ShouldBindJSON(&updates); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updated, err := h.Service.UpdateSettings(c.Request.Context(), userID, updates)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, updated)
}

// --- Limits ---

func (h *WalletHandler) GetLimits(c *gin.Context) {
	userID, err := getUserID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	limits, err := h.Service.GetLimits(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, limits)
}

func (h *WalletHandler) UpdateLimits(c *gin.Context) {
	userID, err := getUserID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	var updates core.WalletLimit
	if err := c.ShouldBindJSON(&updates); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updated, err := h.Service.UpdateLimits(c.Request.Context(), userID, updates)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, updated)
}

// --- Contacts ---

func (h *WalletHandler) GetContacts(c *gin.Context) {
	userID, err := getUserID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	contacts, err := h.Service.GetContacts(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, contacts)
}

func (h *WalletHandler) AddContact(c *gin.Context) {
	userID, err := getUserID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	var contact core.AddressBookEntry
	if err := c.ShouldBindJSON(&contact); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newContact, err := h.Service.AddContact(c.Request.Context(), userID, contact)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, newContact)
}

// --- Security ---

func (h *WalletHandler) GetSecurityLogs(c *gin.Context) {
	userID, err := getUserID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	logs, err := h.Service.GetSecurityLogs(c.Request.Context(), userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, logs)
}

// --- Analytics ---

func (h *WalletHandler) GetAnalytics(c *gin.Context) {
	// For MVP, just return some aggregated stats based on transactions or mock data
	// Let's return a simple structure
	userID, err := getUserID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	// Log usage for now to satisfy compiler
	// log.Printf("Fetching analytics for user %s", userID)
	_ = userID

	// This method doesn't exist in service yet, let's mock response here or implement it
	// For now, let's just return success
	c.JSON(http.StatusOK, gin.H{
		"total_spend":    1284592.00,
		"network_fees":   42901.45,
		"active_wallets": 842,
		"forecast":       []int{2000000, 1500000, 1000000, 500000, 0, 500000, 1000000}, // Mock
	})
}
