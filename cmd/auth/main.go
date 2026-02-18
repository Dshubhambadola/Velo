package main

import (
	"log"
	"os"

	"velo/internal/adapters/email"
	"velo/internal/adapters/http"
	"velo/internal/core"
	"velo/internal/core/services"
	"velo/internal/middleware"
	"velo/internal/ports"
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
		&core.User{},
		&core.Company{},
		&core.Role{},
		&core.Permission{},
		&core.UserRole{},
		&core.RolePermission{},
	); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

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

	// Initialize Router
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())

	// Routes
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

	// Protected Routes
	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.POST("/auth/2fa/generate", authHandler.Generate2FA)
		protected.POST("/auth/2fa/enable", authHandler.Enable2FA)

		// Team Management
		teamService := services.NewTeamService(database.DB, emailSender)
		teamHandler := http.NewTeamHandler(teamService)
		protected.GET("/team/members", teamHandler.ListMembers)
		protected.POST("/team/invite", teamHandler.InviteMember)
		protected.PUT("/team/members/:id/role", teamHandler.UpdateMemberRole)
		protected.DELETE("/team/members/:id", teamHandler.RemoveMember)

		// RBAC
		rbacService := services.NewRBACService(database.DB)
		rbacHandler := http.NewRBACHandler(rbacService)
		protected.GET("/roles", rbacHandler.ListRoles)
		protected.POST("/roles", rbacHandler.CreateRole)
		protected.GET("/permissions", rbacHandler.ListPermissions)
	}

	// Health Check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"service": "auth-service",
		})
	})

	port := os.Getenv("AUTH_SERVICE_PORT")
	if port == "" {
		port = "8081"
	}
	log.Printf("Auth Service starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
