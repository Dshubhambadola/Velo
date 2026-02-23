package http

import (
	"net/http"

	"velo/internal/core/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type YieldHandler struct {
	Service *services.YieldService
}

func NewYieldHandler(service *services.YieldService) *YieldHandler {
	return &YieldHandler{Service: service}
}

// GetBalance handles retrieving the company's yield portfolio
func (h *YieldHandler) GetBalance(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)

	balance, err := h.Service.GetBalance(c.Request.Context(), companyID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to retrieve yield balance"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"balance": balance})
}

// AllocateFunds handles moving funds into the yield protocol
func (h *YieldHandler) AllocateFunds(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)

	var req struct {
		Amount int `json:"amount" binding:"required,gt=0"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid amount"})
		return
	}

	// NOTE: In a complete implementation, this would debit the company's main wallet
	err := h.Service.AllocateFunds(c.Request.Context(), companyID, req.Amount)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "funds allocated to yield protocol"})
}

// WithdrawFunds handles redeeming funds from the yield protocol
func (h *YieldHandler) WithdrawFunds(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)

	var req struct {
		Amount int `json:"amount" binding:"required,gt=0"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid amount"})
		return
	}

	// NOTE: In a complete implementation, this would credit the company's main wallet
	err := h.Service.WithdrawFunds(c.Request.Context(), companyID, req.Amount)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "funds withdrawn from yield protocol"})
}
