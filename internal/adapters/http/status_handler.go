package http

import (
	"net/http"

	"velo/internal/core/services"

	"github.com/gin-gonic/gin"
)

type SystemStatusHandler struct {
	service *services.SystemStatusService
}

func NewSystemStatusHandler(service *services.SystemStatusService) *SystemStatusHandler {
	return &SystemStatusHandler{service: service}
}

func (h *SystemStatusHandler) GetStatus(c *gin.Context) {
	status, err := h.service.GetSystemStatus()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch system status"})
		return
	}

	c.JSON(http.StatusOK, status)
}
