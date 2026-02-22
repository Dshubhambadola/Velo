package services_test

import (
	"context"
	"testing"
	"time"

	"velo/internal/core"
	"velo/internal/core/services"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func setupPayrollDB(t *testing.T) *gorm.DB {
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	require.NoError(t, err)
	err = db.AutoMigrate(&core.PayrollBatch{}, &core.Payment{}, &core.PaymentApproval{}, &core.PaymentApprovalSignature{})
	require.NoError(t, err)
	return db
}

func TestPayrollService_CreateBatch(t *testing.T) {
	db := setupPayrollDB(t)
	service := services.NewPayrollService(db)

	ctx := context.Background()
	companyID := uuid.New()
	userID := uuid.New()

	payments := []core.Payment{
		{
			RecipientName:  "John Doe",
			RecipientEmail: "john@example.com",
			Amount:         decimal.NewFromInt(5000),
			Currency:       "USD",
		},
		{
			RecipientName:  "Jane Smith",
			RecipientEmail: "jane@example.com",
			Amount:         decimal.NewFromInt(4000),
			Currency:       "USD",
		},
	}

	batch, err := service.CreateBatch(ctx, companyID, userID, payments, "Feb Payroll", "", time.Time{})

	require.NoError(t, err)
	require.NotNil(t, batch)
	assert.Equal(t, "pending", batch.Status)
	assert.Equal(t, 2, batch.RecipientCount)
	assert.True(t, batch.TotalAmount.Equal(decimal.NewFromInt(9000)))

	// Verify DB insertion via Count
	var paymentCount int64
	err = db.Model(&core.Payment{}).Where("batch_id = ?", batch.ID).Count(&paymentCount).Error
	require.NoError(t, err)
	assert.Equal(t, int64(2), paymentCount, "Payment count in DB should match")

	// Verify DB insertion via Preload
	var dbBatch core.PayrollBatch
	err = db.Preload("Patterns").First(&dbBatch, "id = ?", batch.ID).Error
	assert.NoError(t, err)
	assert.Equal(t, 2, len(dbBatch.Patterns), "Preloaded patterns should match")
}

func TestPayrollService_CreateBatch_HighAmount_Approval(t *testing.T) {
	db := setupPayrollDB(t)
	service := services.NewPayrollService(db)

	ctx := context.Background()
	companyID := uuid.New()
	userID := uuid.New()

	// Amount > 10,000 triggers approval
	payments := []core.Payment{
		{
			RecipientName:  "Big Earner",
			RecipientEmail: "big@example.com",
			Amount:         decimal.NewFromInt(15000),
			Currency:       "USD",
		},
	}

	batch, err := service.CreateBatch(ctx, companyID, userID, payments, "High Value Payroll", "", time.Time{})

	require.NoError(t, err)
	assert.Equal(t, "awaiting_approval", batch.Status)

	// Verify Approval Record
	var approval core.PaymentApproval
	err = db.Where("batch_id = ?", batch.ID).First(&approval).Error
	assert.NoError(t, err)
	assert.Equal(t, "pending", approval.Status)
	assert.Equal(t, 2, approval.RequiredApprovals)
	assert.Equal(t, 0, approval.CurrentApprovals)
}

func TestPayrollService_ApproveBatch(t *testing.T) {
	db := setupPayrollDB(t)
	service := services.NewPayrollService(db)
	ctx := context.Background()

	makerID := uuid.New()
	checker1ID := uuid.New()
	checker2ID := uuid.New()

	// Setup: Create a batch needing approval
	batchID := uuid.New()
	batch := core.PayrollBatch{
		ID:     batchID,
		Status: "awaiting_approval",
	}
	db.Create(&batch)

	approvalID := uuid.New()
	approval := core.PaymentApproval{
		ID:                approvalID,
		BatchID:           batch.ID,
		RequestedBy:       makerID,
		RequiredApprovals: 2,
		CurrentApprovals:  0,
		Status:            "pending",
	}
	db.Create(&approval)

	// Test Maker cannot be Checker
	err := service.ApproveBatch(ctx, approval.ID, makerID)
	require.Error(t, err)
	assert.Equal(t, "creator cannot approve their own batch", err.Error())

	// Test Checker 1 Approves
	err = service.ApproveBatch(ctx, approval.ID, checker1ID)
	require.NoError(t, err)

	// Verify Partial Approval
	var dbApproval core.PaymentApproval
	db.First(&dbApproval, "id = ?", approval.ID)
	assert.Equal(t, "partially_approved", dbApproval.Status)
	assert.Equal(t, 1, dbApproval.CurrentApprovals)

	// Test Checker 1 cannot approve again
	err = service.ApproveBatch(ctx, approval.ID, checker1ID)
	require.Error(t, err)
	assert.Equal(t, "user has already approved this batch", err.Error())

	// Test Checker 2 Approves
	err = service.ApproveBatch(ctx, approval.ID, checker2ID)
	require.NoError(t, err)

	// Verify Final Approval
	db.First(&dbApproval, "id = ?", approval.ID)
	assert.Equal(t, "approved", dbApproval.Status)
	assert.Equal(t, 2, dbApproval.CurrentApprovals)
	assert.NotNil(t, dbApproval.DecidedAt)

	// Verify Signatures created
	var count int64
	db.Model(&core.PaymentApprovalSignature{}).Where("approval_id = ?", approval.ID).Count(&count)
	assert.Equal(t, int64(2), count)

	// Verify Batch Updated
	var dbBatch core.PayrollBatch
	db.First(&dbBatch, "id = ?", batch.ID)
	assert.Equal(t, "ready_for_processing", dbBatch.Status)
}
