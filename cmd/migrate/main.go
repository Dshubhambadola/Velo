package main

import (
	"log"
	"velo/internal/core"
	"velo/pkg/database"

	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	database.ConnectPostgres()

	log.Println("Running AutoMigrate...")
	err := database.DB.AutoMigrate(
		&core.User{},
		&core.Company{},
		&core.Role{},
		&core.UserRole{},
		&core.PayrollBatch{},
		&core.Payment{},
		&core.PaymentApproval{},
		&core.Wallet{},
	)
	if err != nil {
		log.Fatal("Migration failed:", err)
	}

	log.Println("Migration completed successfully.")
}
