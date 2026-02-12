package main

import (
	"log"
	"os"

	"velo/internal/adapters/http"
	"velo/internal/adapters/payment/circle"
	"velo/internal/core/services"
	"velo/internal/middleware"
	"velo/pkg/database"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Connect Requirements
	database.ConnectPostgres()
	database.ConnectRedis()

	// Initialize Services
	authService := services.NewAuthService(database.DB)
	authHandler := http.NewAuthHandler(authService)

	// Initialize Gin
	r := gin.Default()

	// Apply Middleware
	r.Use(middleware.CORSMiddleware())

	// Health Check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"service": "api-gateway",
		})
	})

	// Auth Routes
	auth := r.Group("/auth")
	{
		auth.POST("/register", authHandler.Register)
		auth.POST("/login", authHandler.Login)
		auth.POST("/forgot-password", authHandler.ForgotPassword)
		auth.POST("/reset-password", authHandler.ResetPassword)
		auth.POST("/magic-link", authHandler.RequestMagicLink)
		auth.POST("/magic-login", authHandler.LoginWithMagicLink)
		auth.POST("/2fa/verify", authHandler.Verify2FA)
	}

	// Protected Routes
	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.POST("/auth/2fa/generate", authHandler.Generate2FA)
		protected.POST("/auth/2fa/enable", authHandler.Enable2FA)

		// Payroll Routes
		payrollService := services.NewPayrollService(database.DB)
		payrollHandler := http.NewPayrollHandler(payrollService)
		protected.POST("/payroll/upload", payrollHandler.UploadBatch)
		protected.POST("/payroll/create", payrollHandler.CreateBatchManual)
		protected.POST("/payroll/approve/:approval_id", payrollHandler.ApproveBatch)
		protected.GET("/payroll/batches", payrollHandler.ListBatches)
		protected.GET("/payroll/batches/:batch_id", payrollHandler.GetBatch)
		protected.POST("/payroll/batches/:batch_id/execute", payrollHandler.ExecuteBatch)

		// Wallet Routes
		circleAdapter := circle.NewCircleAdapter(os.Getenv("CIRCLE_API_KEY"), os.Getenv("CIRCLE_SANDBOX") == "true")
		walletService := services.NewWalletService(database.DB, circleAdapter)
		walletHandler := http.NewWalletHandler(walletService)

		protected.POST("/wallet", walletHandler.CreateWallet)
		protected.GET("/wallet/balance", walletHandler.GetBalance) // Changed from :wallet_id to use auth context
		protected.GET("/wallet/transactions", walletHandler.GetTransactions)

		// Wallet Settings & Limits
		protected.GET("/wallet/settings", walletHandler.GetSettings)
		protected.PUT("/wallet/settings", walletHandler.UpdateSettings)
		protected.GET("/wallet/limits", walletHandler.GetLimits)
		protected.PUT("/wallet/limits", walletHandler.UpdateLimits)

		// Address Book
		protected.GET("/wallet/contacts", walletHandler.GetContacts)
		protected.POST("/wallet/contacts", walletHandler.AddContact)

		// Security
		protected.GET("/wallet/security", walletHandler.GetSecurityLogs)

		// Analytics
		protected.GET("/wallet/analytics", walletHandler.GetAnalytics)

		// Onboarding Routes
		onboardingService := services.NewOnboardingService(database.DB)
		onboardingHandler := http.NewOnboardingHandler(onboardingService)
		protected.POST("/onboarding/company", onboardingHandler.UpdateCompany)
		protected.POST("/onboarding/kyc", onboardingHandler.UpdateKYC)
		protected.POST("/onboarding/complete", onboardingHandler.CompleteOnboarding)
	}

	// Start Server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("API Gateway starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
