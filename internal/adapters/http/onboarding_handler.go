package http

import (
	"net/http"
	"velo/internal/core/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type OnboardingHandler struct {
	service *services.OnboardingService
}

func NewOnboardingHandler(service *services.OnboardingService) *OnboardingHandler {
	return &OnboardingHandler{service: service}
}

type UpdateCompanyRequest struct {
	Name     string `json:"name"`
	Website  string `json:"website"`
	Size     string `json:"size"`
	Industry string `json:"industry"`
	Location string `json:"location"`
}

func (h *OnboardingHandler) UpdateCompany(c *gin.Context) {
	var req UpdateCompanyRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	if err := h.service.UpdateCompanyDetails(userID.(uuid.UUID), req.Name, req.Website, req.Size, req.Industry, req.Location); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update company details"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Company details updated"})
}

type UpdateKYCRequest struct {
	FirstName      string `json:"first_name"`
	LastName       string `json:"last_name"`
	DOB            string `json:"dob"`
	PhoneCode      string `json:"phone_code"`
	Phone          string `json:"phone"`
	Address        string `json:"address"`
	City           string `json:"city"`
	State          string `json:"state"`
	Zip            string `json:"zip"`
	Country        string `json:"country"`
	IDType         string `json:"id_type"`
	IDNumber       string `json:"id_number"`
	IssuingCountry string `json:"issuing_country"`
	IDExpiry       string `json:"id_expiry"`
}

func (h *OnboardingHandler) UpdateKYC(c *gin.Context) {
	var req UpdateKYCRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	// Map request to DB columns
	updates := map[string]interface{}{
		"full_name":       req.FirstName + " " + req.LastName,
		"date_of_birth":   req.DOB,
		"phone_code":      req.PhoneCode,
		"phone_number":    req.Phone,
		"address_street":  req.Address,
		"address_city":    req.City,
		"address_state":   req.State,
		"address_zip":     req.Zip,
		"address_country": req.Country,
		"id_type":         req.IDType,
		"id_number":       req.IDNumber,
		"issuing_country": req.IssuingCountry,
		"id_expiry":       req.IDExpiry,
	}

	if err := h.service.UpdateKYCDetails(userID.(uuid.UUID), updates); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update KYC details"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "KYC details updated"})
}

func (h *OnboardingHandler) CompleteOnboarding(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	if err := h.service.CompleteOnboarding(userID.(uuid.UUID)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to complete onboarding"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Onboarding completed"})
}
