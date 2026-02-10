.PHONY: build run test clean

build:
	go build -o bin/gateway cmd/gateway/main.go
	go build -o bin/auth cmd/auth/main.go
	go build -o bin/payroll cmd/payroll/main.go
	go build -o bin/wallet cmd/wallet/main.go
	go build -o bin/compliance cmd/compliance/main.go

run-gateway:
	go run cmd/gateway/main.go

run-auth:
	go run cmd/auth/main.go

run-payroll:
	go run cmd/payroll/main.go

run-wallet:
	go run cmd/wallet/main.go

test:
	go test ./...

clean:
	rm -rf bin/
