package http

import (
	"net/http"

	"velo/internal/core/services"

	"github.com/gin-gonic/gin"
)

type ComplianceHandler struct {
	service *services.ComplianceService
}

func NewComplianceHandler(service *services.ComplianceService) *ComplianceHandler {
	return &ComplianceHandler{service: service}
}

// InitiateKYC starts the KYC process for the authenticated user
func (h *ComplianceHandler) InitiateKYC(c *gin.Context) {
	// Middleware should set "userID"
	userID := c.GetString("userID")
	if userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	token, err := h.service.InitiateKYC(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to initiate KYC", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
	})
}

// HandleWebhook receives webhook events from Sumsub
func (h *ComplianceHandler) HandleWebhook(c *gin.Context) {
	// Verify signature if needed (though adapter handles signing outgoing requests, incoming verification logic might be needed here)
	// For now, MVP assumes secret security or we implement signature check here.

	// Check header X-Payload-Digest
	// secret := os.Getenv("SUMSUB_SECRET_KEY")
	// digest := c.GetHeader("X-Payload-Digest")
	// ... verification logic ...

	var payload struct {
		ApplicantID  string `json:"applicantId"`
		ReviewStatus string `json:"reviewStatus"`
		ReviewResult struct {
			ReviewAnswer string `json:"reviewAnswer"`
		} `json:"reviewResult"`
		Type string `json:"type"`
	}

	if err := c.BindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid payload"})
		return
	}

	// We only care about applicantReviewed type for status updates
	if payload.Type == "applicantReviewed" {
		err := h.service.HandleWebhook(payload.ApplicantID, payload.ReviewStatus, payload.ReviewResult.ReviewAnswer)
		if err != nil {
			// Log error but return OK to acknowledge webhook
			// c.JSON(http.StatusInternalServerError, ...
		}
	}

	c.Status(http.StatusOK)
}
