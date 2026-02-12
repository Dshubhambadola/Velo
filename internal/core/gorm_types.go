package core

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"fmt"
)

// JSONB definition
type JSONB map[string]interface{}

// ArrayString definition
type ArrayString []string

func (j JSONB) GormDataType() string {
	return "jsonb"
}

// GormScanJSON scans a value into a JSON object
func GormScanJSON(value interface{}, target interface{}) error {
	if value == nil {
		return nil
	}
	bytes, ok := value.([]byte)
	if !ok {
		return errors.New(fmt.Sprint("Failed to unmarshal JSONB value:", value))
	}
	return json.Unmarshal(bytes, target)
}

// GormValueJSON returns a json value
func GormValueJSON(v interface{}) (driver.Value, error) {
	return json.Marshal(v)
}

// Implement Scan and Value for JSONB

func (j *JSONB) Scan(value interface{}) error {
	if value == nil {
		*j = nil
		return nil
	}
	bytes, ok := value.([]byte)
	if !ok {
		return errors.New("type assertion to []byte failed")
	}
	return json.Unmarshal(bytes, j)
}

func (j JSONB) Value() (driver.Value, error) {
	if j == nil {
		return nil, nil
	}
	return json.Marshal(j)
}

// Implement Scan and Value for ArrayString

func (a *ArrayString) Scan(value interface{}) error {
	// Postgres arrays are returned as []byte or string depending on driver
	// Just handling []byte for now as simple JSON array or Postgres array literal would need parsing
	// For simplicity, let's treat it as a JSON array of strings if stored as jsonb or text.
	// However, postgres text[] driver usually handles this.
	// If using pure GORM, often better to use lib/pq types.
	// Let's implement a simple JSON scan fallback.
	if value == nil {
		*a = nil
		return nil
	}
	bytes, ok := value.([]byte)
	if !ok {
		return errors.New("type assertion to []byte failed")
	}
	return json.Unmarshal(bytes, a)
}

func (a ArrayString) Value() (driver.Value, error) {
	if a == nil {
		return nil, nil
	}
	return json.Marshal(a)
}
