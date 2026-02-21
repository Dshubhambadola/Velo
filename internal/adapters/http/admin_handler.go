package http

import (
	"net/http"
	"strconv"
	"velo/internal/core/services"

	"github.com/gin-gonic/gin"
)

type AdminHandler struct {
	service *services.AdminService
}

func NewAdminHandler(service *services.AdminService) *AdminHandler {
	return &AdminHandler{service: service}
}

// ListUsers returns paginated users
func (h *AdminHandler) ListUsers(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	users, total, err := h.service.GetAllUsers(page, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"users": users,
		"total": total,
		"page":  page,
		"limit": limit,
	})
}

// GetUser returns user details
func (h *AdminHandler) GetUser(c *gin.Context) {
	userID := c.Param("userID")
	user, err := h.service.GetUser(userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	c.JSON(http.StatusOK, user)
}

// GetComplianceQueue returns pending KYC users
func (h *AdminHandler) GetComplianceQueue(c *gin.Context) {
	users, err := h.service.GetComplianceQueue()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, users)
}

// ApproveKYC approves a user's KYC
func (h *AdminHandler) ApproveKYC(c *gin.Context) {
	userID := c.Param("userID")
	if err := h.service.ApproveKYC(userID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "approved"})
}

// RejectKYC rejects a user's KYC
func (h *AdminHandler) RejectKYC(c *gin.Context) {
	userID := c.Param("userID")
	if err := h.service.RejectKYC(userID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": "rejected"})
}

// ListTransactions returns recent transactions
func (h *AdminHandler) ListTransactions(c *gin.Context) {
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "50"))
	txs, err := h.service.GetAllTransactions(limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, txs)
}
