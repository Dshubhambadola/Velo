package services

import (
	"errors"
	"velo/internal/core"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type RBACService struct {
	DB *gorm.DB
}

func NewRBACService(db *gorm.DB) *RBACService {
	return &RBACService{DB: db}
}

// ListRoles for a company
// Ideally, we should list system roles + custom roles created by this company
// For now, listing all roles available.
func (s *RBACService) ListRoles() ([]core.Role, error) {
	var roles []core.Role
	// In a real system, filter by CompanyID (if roles were company-specific) or generic system roles
	err := s.DB.Find(&roles).Error
	return roles, err
}

// GetRole by ID
func (s *RBACService) GetRole(roleID string) (*core.Role, error) {
	var role core.Role
	err := s.DB.First(&role, "id = ?", roleID).Error
	return &role, err
}

// CreateRole - Custom Role
// For MVP, simplified: just create a role record
func (s *RBACService) CreateRole(name, description string, isSystem bool, permissions []string) (*core.Role, error) {
	// Check if exists
	var count int64
	s.DB.Model(&core.Role{}).Where("name = ?", name).Count(&count)
	if count > 0 {
		return nil, errors.New("role already exists")
	}

	role := core.Role{
		Name:         name,
		Description:  description,
		IsSystemRole: isSystem,
	}

	// Use Transaction
	err := s.DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(&role).Error; err != nil {
			return err
		}

		if len(permissions) > 0 {
			for _, permID := range permissions {
				rp := core.RolePermission{
					RoleID:       role.ID,
					PermissionID: uuid.MustParse(permID),
				}
				if err := tx.Create(&rp).Error; err != nil {
					return err
				}
			}
		}
		return nil
	})

	if err != nil {
		return nil, err
	}

	return &role, nil
}

// ListPermissions
func (s *RBACService) ListPermissions() ([]core.Permission, error) {
	var perms []core.Permission
	err := s.DB.Find(&perms).Error
	return perms, err
}

// AssignPermissionToRole
func (s *RBACService) AssignPermissionToRole(roleID, permissionID string, conditions map[string]interface{}) error {
	rp := core.RolePermission{
		RoleID:       uuid.MustParse(roleID),
		PermissionID: uuid.MustParse(permissionID),
		Conditions:   conditions,
	}
	return s.DB.Create(&rp).Error
}
