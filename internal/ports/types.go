package ports

import "time"

// Transaction represents a payment provider transaction
type Transaction struct {
	ID              string
	Amount          string
	Currency        string
	Status          string
	TransactionHash string
	FromAddress     string
	ToAddress       string
	Timestamp       time.Time
	Type            string // deposit, withdrawal, transfer
}
