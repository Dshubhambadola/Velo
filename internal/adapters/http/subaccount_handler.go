package http

import (
	"net/http"

	"velo/internal/core/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type SubAccountHandler struct {
	Service *services.SubAccountService
}

func NewSubAccountHandler(service *services.SubAccountService) *SubAccountHandler {
	return &SubAccountHandler{Service: service}
}

func (h *SubAccountHandler) CreateSubAccount(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)
	userID, _ := getUserID(c)

	var req struct {
		Name           string  `json:"name" binding:"required"`
		InitialFunding int     `json:"initial_funding" binding:"min=0"`
		ManagerID      *string `json:"manager_id"`
		SpendLimit     int     `json:"spend_limit"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid payload"})
		return
	}

	var parsedManagerID *uuid.UUID
	if req.ManagerID != nil && *req.ManagerID != "" {
		id, err := uuid.Parse(*req.ManagerID)
		if err == nil {
			parsedManagerID = &id
		}
	}

	subAcc, err := h.Service.CreateSubAccount(c.Request.Context(), companyID, userID, req.Name, req.InitialFunding, parsedManagerID, req.SpendLimit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"sub_account": subAcc})
}

func (h *SubAccountHandler) GetSubAccounts(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)

	accounts, err := h.Service.GetSubAccounts(c.Request.Context(), companyID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to retrieve sub-accounts"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"sub_accounts": accounts})
}

func (h *SubAccountHandler) DepositFunds(c *gin.Context) {
	userID, _ := getUserID(c)
	accIDStr := c.Param("id")
	accID, err := uuid.Parse(accIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid sub-account id"})
		return
	}

	var req struct {
		Amount int `json:"amount" binding:"required,min=1"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid payload"})
		return
	}

	if err := h.Service.DepositFunds(c.Request.Context(), userID, accID, req.Amount); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "funds deposited successfully"})
}
