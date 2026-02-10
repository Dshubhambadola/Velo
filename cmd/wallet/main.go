package main

import (
	"log"
	"os"

	"velo/internal/adapters/http"
	"velo/internal/adapters/payment/circle"
	"velo/internal/middleware"
	"velo/pkg/database"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Connect Redis
	database.ConnectRedis()

	// Initialize Provider
	apiKey := os.Getenv("CIRCLE_API_KEY")
	sandbox := os.Getenv("CIRCLE_SANDBOX") == "true"

	provider := circle.NewCircleAdapter(apiKey, sandbox)
	handler := http.NewWalletHandler(provider)

	// Initialize Router
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())

	// Routes
	// Protected by internal API key or similar in real microservices
	// For MVP, we'll leave it open or simple auth if needed
	api := r.Group("/api/v1")
	{
		api.POST("/wallets", handler.CreateWallet)
		api.GET("/wallets/:wallet_id/balance", handler.GetBalance)
	}

	// Health Check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"service": "wallet-service",
		})
	})

	port := os.Getenv("WALLET_SERVICE_PORT")
	if port == "" {
		port = "8083"
	}
	log.Printf("Wallet Service starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
