package http

import (
	"net/http"
	"velo/internal/core/services"

	"github.com/gin-gonic/gin"
)

type RBACHandler struct {
	rbacService *services.RBACService
}

func NewRBACHandler(service *services.RBACService) *RBACHandler {
	return &RBACHandler{rbacService: service}
}

// ListRoles godoc
func (h *RBACHandler) ListRoles(c *gin.Context) {
	_, exists := c.Get("company_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	roles, err := h.rbacService.ListRoles()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": roles})
}

// CreateRoleRequest
type CreateRoleRequest struct {
	Name        string   `json:"name" binding:"required"`
	Description string   `json:"description"`
	Permissions []string `json:"permissions"`
}

// CreateRole godoc
func (h *RBACHandler) CreateRole(c *gin.Context) {
	_, exists := c.Get("company_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}
	// TODO: Check if user has permission to create roles (e.g. Owner)

	var req CreateRoleRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// For MVP, created roles are not system roles
	role, err := h.rbacService.CreateRole(req.Name, req.Description, false, req.Permissions)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": role})
}

// ListPermissions godoc
func (h *RBACHandler) ListPermissions(c *gin.Context) {
	_, exists := c.Get("company_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	permissions, err := h.rbacService.ListPermissions()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": permissions})
}
