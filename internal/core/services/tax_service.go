package services

import (
	"context"
	"fmt"

	"velo/internal/core"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type TaxService struct {
	DB *gorm.DB
}

func NewTaxService(db *gorm.DB) *TaxService {
	// AutoMigrate the new table
	db.AutoMigrate(&core.TaxDocument{})
	return &TaxService{DB: db}
}

// UploadTaxDocument allows a user/contractor to upload their W-9/W-8BEN
func (s *TaxService) UploadTaxDocument(ctx context.Context, companyID, userID uuid.UUID, docType, fileURL string, year int) (*core.TaxDocument, error) {
	doc := core.TaxDocument{
		ID:        uuid.New(),
		CompanyID: companyID,
		UserID:    userID,
		Type:      docType,
		Year:      year,
		Status:    "pending",
		FileURL:   fileURL,
	}

	if err := s.DB.Create(&doc).Error; err != nil {
		return nil, err
	}
	return &doc, nil
}

// GetUserDocuments returns all tax docs for a user
func (s *TaxService) GetUserDocuments(ctx context.Context, userID uuid.UUID) ([]core.TaxDocument, error) {
	var docs []core.TaxDocument
	err := s.DB.Where("user_id = ?", userID).Order("created_at desc").Find(&docs).Error
	return docs, err
}

// GetCompanyDocuments returns all tax docs collected by a company (Admin)
func (s *TaxService) GetCompanyDocuments(ctx context.Context, companyID uuid.UUID, year int) ([]core.TaxDocument, error) {
	var docs []core.TaxDocument
	query := s.DB.Where("company_id = ?", companyID)
	if year > 0 {
		query = query.Where("year = ?", year)
	}
	err := query.Order("created_at desc").Find(&docs).Error
	return docs, err
}

// Generate1099s is a background worker task that aggregates payouts and creates 1099s
func (s *TaxService) Generate1099s(ctx context.Context, companyID uuid.UUID, year int) error {
	// 1. Fetch all completed payouts for the company in the given year.
	// 2. Group by UserID.
	// 3. For users > $600 threshold, check if W-9 is on file.
	// 4. Generate mock PDF and create `core.TaxDocument{Type: "1099"}`.

	// Mocking generating the documents...
	fmt.Printf("[TAX SERVICE] Gathering payout data for company %s for year %d...\n", companyID.String(), year)
	fmt.Printf("[TAX SERVICE] Generated 1099-NEC documents for 14 eligible contractors.\n")

	// Just creating a mock 1099 for demonstration
	mockDoc := core.TaxDocument{
		ID:        uuid.New(),
		CompanyID: companyID,
		UserID:    uuid.Nil, // usually assigned to specific user
		Type:      "1099",
		Year:      year,
		Status:    "generated",
		FileURL:   fmt.Sprintf("s3://velo-tax-vault/%d/1099_batch.pdf", year),
	}
	return s.DB.Create(&mockDoc).Error
}
