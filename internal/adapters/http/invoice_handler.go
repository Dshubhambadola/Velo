package http

import (
	"net/http"

	"velo/internal/core/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type InvoiceHandler struct {
	Service *services.InvoiceService
}

func NewInvoiceHandler(service *services.InvoiceService) *InvoiceHandler {
	return &InvoiceHandler{Service: service}
}

func (h *InvoiceHandler) CreateInvoice(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)

	var req struct {
		ClientName  string `json:"client_name" binding:"required"`
		ClientEmail string `json:"client_email" binding:"required"`
		Amount      int    `json:"amount" binding:"required"`
		Currency    string `json:"currency" binding:"required"`
		DueDays     int    `json:"due_days"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid payload"})
		return
	}
	if req.DueDays == 0 {
		req.DueDays = 30
	}

	invoice, err := h.Service.CreateInvoice(c.Request.Context(), companyID, req.ClientName, req.ClientEmail, req.Amount, req.Currency, req.DueDays)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"invoice": invoice})
}

func (h *InvoiceHandler) GetCompanyInvoices(c *gin.Context) {
	companyID, _ := c.MustGet("company_id").(uuid.UUID)

	invoices, err := h.Service.GetCompanyInvoices(c.Request.Context(), companyID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get invoices"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"invoices": invoices})
}

// Public endpoint for clients to view an invoice
func (h *InvoiceHandler) GetInvoice(c *gin.Context) {
	invoiceIDStr := c.Param("id")
	invoiceID, err := uuid.Parse(invoiceIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid invoice id"})
		return
	}

	invoice, err := h.Service.GetInvoice(c.Request.Context(), invoiceID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "invoice not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"invoice": invoice})
}

// Public endpoint to simulate paying an invoice
func (h *InvoiceHandler) PayInvoice(c *gin.Context) {
	invoiceIDStr := c.Param("id")
	invoiceID, err := uuid.Parse(invoiceIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid invoice id"})
		return
	}

	if err := h.Service.PayInvoice(c.Request.Context(), invoiceID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "invoice paid successfully"})
}
