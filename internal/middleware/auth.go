package middleware

import (
	"errors"
	"log"
	"net/http"
	"strings"

	"velo/internal/auth"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
			c.Abort()
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid authorization header format"})
			c.Abort()
			return
		}

		claims, err := auth.ValidateToken(parts[1])
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		c.Set("user_id", claims.UserID)
		c.Set("company_id", claims.CompanyID)
		c.Set("roles", claims.Roles)
		c.Next()
	}
}

func RBACMiddleware(db *gorm.DB, resource, action string) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.MustGet("user_id").(uuid.UUID)
		companyID := c.MustGet("company_id").(uuid.UUID)

		var count int64
		// Check if the user has a role that grants this permission for this company
		result := db.Table("user_roles").
			Joins("JOIN role_permissions ON user_roles.role_id = role_permissions.role_id").
			Joins("JOIN permissions ON role_permissions.permission_id = permissions.id").
			Where("user_roles.user_id = ? AND user_roles.company_id = ?", userID, companyID).
			Where("permissions.resource = ? AND permissions.action = ?", resource, action).
			Count(&count)

		if result.Error != nil {
			log.Printf("RBAC Check Error: %v", result.Error)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error during permission check"})
			c.Abort()
			return
		}

		if count == 0 {
			c.JSON(http.StatusForbidden, gin.H{"error": "Insufficient permissions"})
			c.Abort()
			return
		}

		c.Next()
	}
}

// GetUserIDFromContext extracts the user ID from the request context
func GetUserIDFromContext(c *gin.Context) (uuid.UUID, error) {
	val, exists := c.Get("user_id")
	if !exists {
		return uuid.Nil, errors.New("user_id not found in context")
	}
	userID, ok := val.(uuid.UUID)
	if !ok {
		return uuid.Nil, errors.New("invalid user_id type in context")
	}
	return userID, nil
}
