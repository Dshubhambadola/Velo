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
		&core.User{},
		&core.Company{},
		&core.Role{},
		&core.Permission{},
		&core.UserRole{},
		&core.RolePermission{},
	); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	// Initialize Services
	authService := services.NewAuthService(database.DB)
	authHandler := http.NewAuthHandler(authService)

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
	}

	// Protected Routes
	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		protected.POST("/auth/2fa/generate", authHandler.Generate2FA)
		protected.POST("/auth/2fa/enable", authHandler.Enable2FA)
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
