package main

import (
	"log"
	"os"
	"time"

	"velo/internal/adapters/compliance/sumsub"
	"velo/internal/adapters/email"
	"velo/internal/adapters/http"
	"velo/internal/adapters/payment/circle"
	"velo/internal/core/services"
	"velo/internal/middleware"
	"velo/internal/ports"
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

	// Initialize Email Service
	var emailSender ports.EmailSender
	apiKey := os.Getenv("SENDGRID_API_KEY")
	fromEmail := os.Getenv("SENDGRID_FROM_EMAIL")
	fromName := os.Getenv("SENDGRID_FROM_NAME")

	if apiKey != "" {
		var err error
		emailSender, err = email.NewSendGridAdapter(apiKey, fromName, fromEmail)
		if err != nil {
			log.Printf("Failed to initialize SendGrid: %v", err)
		} else {
			log.Println("SendGrid Adapter Initialized")
		}
	} else {
		log.Println("SENDGRID_API_KEY not set. Email sending will be mocked (logged to stdout).")
	}

	// Google SSO Config
	googleClientID := os.Getenv("GOOGLE_CLIENT_ID")
	googleClientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")
	googleRedirectURL := os.Getenv("GOOGLE_REDIRECT_URL")

	// Initialize Services
	authService := services.NewAuthService(database.DB, emailSender, googleClientID, googleClientSecret, googleRedirectURL)

	frontendURL := os.Getenv("FRONTEND_URL")
	if frontendURL == "" {
		frontendURL = "http://localhost:5173"
	}
	authHandler := http.NewAuthHandler(authService, frontendURL)

	// Initialize Compliance Service
	sumsubAppToken := os.Getenv("SUMSUB_APP_TOKEN")
	sumsubSecretKey := os.Getenv("SUMSUB_SECRET_KEY")
	sumsubLevelName := os.Getenv("SUMSUB_LEVEL_NAME")
	sumsubSimulation := os.Getenv("SUMSUB_SIMULATION") == "true"

	sumsubAdapter := sumsub.NewSumsubAdapter(sumsubAppToken, sumsubSecretKey, sumsubLevelName, sumsubSimulation)
	complianceService := services.NewComplianceService(database.DB, sumsubAdapter)
	complianceHandler := http.NewComplianceHandler(complianceService)

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

		// SSO
		auth.GET("/sso/:provider/initiate", authHandler.InitiateSSO)
		auth.GET("/sso/callback", authHandler.SSOCallback)
	}

	// Public Webhooks
	r.POST("/webhooks/sumsub", complianceHandler.HandleWebhook)

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

		// Scheduler (Background Worker)
		schedulerService := services.NewSchedulerService(database.DB, payrollService)
		schedulerService.StartScheduler(1 * time.Hour) // Check every hour

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

		// Activity Feed
		activityService := services.NewActivityService(database.DB)
		activityHandler := http.NewActivityHandler(activityService)
		protected.GET("/activity", activityHandler.ListActivities)

		// Notifications
		notificationService := services.NewNotificationService(database.DB)
		notificationHandler := http.NewNotificationHandler(notificationService)
		protected.GET("/notifications", notificationHandler.ListNotifications)
		protected.POST("/notifications/:id/read", notificationHandler.MarkAsRead)
		protected.POST("/notifications/read-all", notificationHandler.MarkAllAsRead)

		// Analytics (Old/Basic)
		analyticsService := services.NewAnalyticsService(database.DB)
		analyticsHandler := http.NewAnalyticsHandler(analyticsService)
		protected.GET("/analytics/overview", analyticsHandler.GetOverview)

		// Reporting & Advanced Analytics
		reportingService := services.NewReportingService(database.DB)
		reportingHandler := http.NewReportingHandler(reportingService)
		protected.GET("/reports/batches/:batch_id/export", reportingHandler.ExportBatchCSV)
		protected.GET("/reports/analytics", reportingHandler.GetAnalytics)

		// Bridge
		bridgeService := services.NewBridgeService(database.DB)
		bridgeHandler := http.NewBridgeHandler(bridgeService)
		protected.GET("/bridge/quote", bridgeHandler.GetQuote)
		protected.POST("/bridge/execute", bridgeHandler.ExecuteBridge)

		// System Status
		statusService := services.NewSystemStatusService(database.DB)
		statusHandler := http.NewSystemStatusHandler(statusService)
		// Public route
		r.GET("/status", statusHandler.GetStatus)

		// Compliance
		protected.POST("/compliance/kyc/initiate", complianceHandler.InitiateKYC)
	}

	// Admin Routes (Protected + RBAC)
	admin := r.Group("/admin")
	admin.Use(middleware.AuthMiddleware())
	admin.Use(middleware.AdminMiddleware())
	{
		adminService := services.NewAdminService(database.DB)
		adminHandler := http.NewAdminHandler(adminService)

		// User Management
		admin.GET("/users", adminHandler.ListUsers)
		admin.GET("/users/:userID", adminHandler.GetUser)
		// admin.POST("/users/:userID/suspend", adminHandler.SuspendUser)

		// Compliance Review
		admin.GET("/compliance/queue", adminHandler.GetComplianceQueue)
		admin.POST("/compliance/:userID/approve", adminHandler.ApproveKYC)
		admin.POST("/compliance/:userID/reject", adminHandler.RejectKYC)

		// Transactions
		admin.GET("/transactions", adminHandler.ListTransactions)
	}

	// Developer API Routes (Protected)
	developer := r.Group("/developer")
	developer.Use(middleware.AuthMiddleware())
	{
		apiKeyService := services.NewAPIKeyService(database.DB)
		apiKeyHandler := http.NewAPIKeyHandler(apiKeyService)

		developer.POST("/keys", apiKeyHandler.GenerateKey)
		developer.GET("/keys", apiKeyHandler.ListKeys)
		developer.DELETE("/keys/:id", apiKeyHandler.RevokeKey)

		webhookService := services.NewWebhookService(database.DB)
		webhookHandler := http.NewWebhookHandler(webhookService)

		developer.POST("/webhooks", webhookHandler.CreateEndpoint)
		developer.GET("/webhooks", webhookHandler.ListEndpoints)
		developer.DELETE("/webhooks/:id", webhookHandler.DeleteEndpoint)
		developer.POST("/webhooks/trigger", webhookHandler.TriggerEvent) // For testing MVP

		auditService := services.NewAuditService(database.DB)
		auditHandler := http.NewAuditHandler(auditService)

		developer.GET("/audit-logs", auditHandler.ListLogs)
	}

	// Webhooks (Public Ingress)
	// Re-initialize compliance handler for public route if needed, or reuse variable if scope allows.
	// Since variable scope is inside `protected` block above (if I put it there), I should move matching logic up or re-initialize.
	// Actually, I should initialize services BEFORE the routes group.

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
