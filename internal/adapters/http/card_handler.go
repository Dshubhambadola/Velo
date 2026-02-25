package http

import (
	"fmt"
	"net/http"

	"velo/internal/core/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CardHandler struct {
	Service *services.CardManagementService
}

func NewCardHandler(service *services.CardManagementService) *CardHandler {
	return &CardHandler{Service: service}
}

// IssueCard handles the creation of a new card
func (h *CardHandler) IssueCard(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)

	var req struct {
		UserID       string `json:"user_id" binding:"required"`
		Type         string `json:"type" binding:"required"` // physical, virtual
		DailyLimit   int    `json:"daily_limit"`
		MonthlyLimit int    `json:"monthly_limit"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	userID, err := uuid.Parse(req.UserID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user ID"})
		return
	}

	card, err := h.Service.IssueCard(c.Request.Context(), companyID, userID, req.Type, req.DailyLimit, req.MonthlyLimit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"card": card})
}

// ListCards returns all cards for a company
func (h *CardHandler) ListCards(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)

	userIDStr := c.Query("user_id")
	var userID *uuid.UUID

	if userIDStr != "" {
		uid, err := uuid.Parse(userIDStr)
		if err == nil {
			userID = &uid
		}
	}

	cards, err := h.Service.ListCards(c.Request.Context(), companyID, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to retrieve cards"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"cards": cards})
}

// UpdateCardStatus updates a card's status (freeze/unfreeze/cancel)
func (h *CardHandler) UpdateCardStatus(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)
	cardIDStr := c.Param("id")

	var req struct {
		Status string `json:"status" binding:"required"` // active, frozen, canceled
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	cardID, err := uuid.Parse(cardIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid card ID format"})
		return
	}

	err = h.Service.UpdateCardStatus(c.Request.Context(), companyID, cardID, req.Status)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("card status updated to %s", req.Status)})
}

// UpdateCardLimits updates a card's spend controls
func (h *CardHandler) UpdateCardLimits(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)
	cardIDStr := c.Param("id")

	var req struct {
		DailyLimit   int `json:"daily_limit"`
		MonthlyLimit int `json:"monthly_limit"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	cardID, err := uuid.Parse(cardIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid card ID format"})
		return
	}

	err = h.Service.UpdateCardLimits(c.Request.Context(), companyID, cardID, req.DailyLimit, req.MonthlyLimit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "card limits updated"})
}

// ActivateCard allows activating a physical card with a CVV
func (h *CardHandler) ActivateCard(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)
	cardIDStr := c.Param("id")

	var req struct {
		CVV string `json:"cvv" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	cardID, err := uuid.Parse(cardIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid card ID format"})
		return
	}

	if err := h.Service.ActivateCard(c.Request.Context(), companyID, cardID, req.CVV); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Card successfully activated"})
}
