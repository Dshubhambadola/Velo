package main

import (
	"log"
	"os"

	"velo/internal/adapters/http"
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
