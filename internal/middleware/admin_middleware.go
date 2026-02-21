package middleware

import (
	"net/http"
	"velo/internal/core"
	"velo/pkg/database"

	"github.com/gin-gonic/gin"
)

// AdminMiddleware checks if the authenticated user has the 'admin' role
func AdminMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.GetString("userID")
		if userID == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		// Check if user has admin role
		// For MVP, we'll check if the user is associated with an "admin" role
		var userRole core.UserRole
		if err := database.DB.Preload("Role").Where("user_id = ?", userID).First(&userRole).Error; err != nil {
			c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
			c.Abort()
			return
		}

		if userRole.Role.Name != "admin" && userRole.Role.Name != "super_admin" {
			c.JSON(http.StatusForbidden, gin.H{"error": "Admin privileges required"})
			c.Abort()
			return
		}

		c.Next()
	}
}
