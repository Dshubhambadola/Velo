package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	r := gin.Default()

	// Mock KYC Endpoint
	r.POST("/api/v1/kyc/verify", func(c *gin.Context) {
		// Mock logic: Always approve
		c.JSON(http.StatusOK, gin.H{
			"status":          "approved",
			"verification_id": "mock_ver_123",
		})
	})

	// Health Check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"service": "compliance-service",
		})
	})

	port := os.Getenv("COMPLIANCE_SERVICE_PORT")
	if port == "" {
		port = "8084"
	}
	log.Printf("Compliance Service starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
