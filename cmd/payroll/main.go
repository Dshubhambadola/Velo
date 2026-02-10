package main

import (
	"log"
	"os"

	"velo/internal/adapters/http"
	"velo/internal/core"
	"velo/internal/core/services"
	"velo/internal/middleware"
	"velo/pkg/database"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Connect Requirements
	database.ConnectPostgres()
	database.ConnectRedis()

	// Auto Migrate
	if err := database.DB.AutoMigrate(
		&core.PayrollBatch{},
		&core.Payment{},
		&core.PaymentApproval{},
	); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	// Initialize Services
	payrollService := services.NewPayrollService(database.DB)
	payrollHandler := http.NewPayrollHandler(payrollService)

	// Initialize Router
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())

	// Protected Routes
	api := r.Group("/api/v1")
	api.Use(middleware.AuthMiddleware())
	{
		// Payroll Batch
		api.POST("/payroll/upload",
			middleware.RBACMiddleware(database.DB, "payroll", "create"),
			payrollHandler.UploadBatch,
		)

		// Approval
		api.POST("/payroll/approve/:approval_id",
			middleware.RBACMiddleware(database.DB, "payroll", "approve"),
			payrollHandler.ApproveBatch,
		)
	}

	// Health Check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"service": "payroll-service",
		})
	})

	port := os.Getenv("PAYROLL_SERVICE_PORT")
	if port == "" {
		port = "8082"
	}
	log.Printf("Payroll Service starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
