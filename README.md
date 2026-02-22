# Velo: The Fintech Operating System for Modern Businesses

![Velo Banner](https://via.placeholder.com/1200x400?text=Velo+Fintech+OS)

**Velo** is a next-generation financial platform designed to streamline business operations. From managing multi-currency wallets and automated payroll to team collaboration and enterprise-grade security, Velo provides a unified interface for all your financial needs.

Built with a modern tech stack, Velo is fast, secure, and scalable.

## 🚀 Key Features

### 💼 Smart Wallet Management
- **Multi-Currency Support**: Seamlessly manage balances in USD, USDC, and other currencies.
- **Provider Agnostic**: integrated with top-tier payment providers (Circle, Stripe) ensuring reliability.
- **Granular Controls**: Set daily/monthly spending limits and configure custom wallet settings.
### 📊 Analytics & Reporting
- **Data Export**: Export transaction histories and batch summaries in CSV format.
- **Interactive Dashboards**: Visualize spending trends, cash flow, and transaction breakdowns with advanced charting.

### 🛠 Developer API & Webhooks
- **API Key Management**: Generate and manage API keys for programmatic access.
- **Webhook Dispatcher**: Register secure webhook endpoints with HMAC-SHA256 signatures for real-time event notifications (`batch.executed`, etc.).

### 🔒 Enterprise-Grade Security & Governance
- **Maker-Checker Logic**: Enforce multi-user approval workflows for high-value transactions.
- **Immutable Audit Trails**: Centralized, append-only audit logging for all critical system actions with IP and User-Agent tracking.
- **Two-Factor Authentication (2FA)**: Layered security with TOTP support.
- **SSO Integration**: seamless login via Google and Microsoft (Enterprise Ready).

## 🛠 Technology Stack

### Backend
- **Language**: Go (Golang) 1.21+
- **Framework**: Standard library with `chi` router (or similar lightweight framework).
- **Database**: 
    - **Development/Testing**: SQLite (In-Memory/File)
    - **Production**: PostgreSQL
- **ORM**: GORM for data access and migration.
- **Architecture**: Hexagonal/Clean Architecture ensuring separation of concerns.

### Frontend
- **Framework**: React 18 with TypeScript.
- **Styling**: Tailwind CSS with a custom "Deep Navy & Electric Teal" theme.
- **Components**: ShadCN/UI for accessible and beautiful components.
- **State Management**: React Query / Context API.
- **Testing**: Playwright for End-to-End (E2E) testing.

## 🏁 Getting Started

### Prerequisites
- **Go**: v1.21 or higher
- **Node.js**: v18 or higher
- **Docker** (Optional, for containerized database)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-org/velo.git
    cd velo
    ```

2.  **Configure Environment Variables:**
    Create a `.env` file in the root directory (based on `.env.example`).
    ```ini
    # Database
    DATABASE_URL="host=localhost user=postgres password=postgres dbname=velo port=5432 sslmode=disable"
    REDIS_URL="localhost:6379"

    # Auth
    JWT_SECRET="your-secret-key"

    # Email Service (SendGrid)
    SENDGRID_API_KEY="SG.your_api_key"
    SENDGRID_FROM_EMAIL="no-reply@velo.com"
    SENDGRID_FROM_NAME="Velo Team"

    # Google SSO
    GOOGLE_CLIENT_ID="your-google-client-id"
    GOOGLE_CLIENT_SECRET="your-google-client-secret"
    GOOGLE_REDIRECT_URL="http://localhost:8080/auth/sso/callback"

    # Payment Provider (Circle)
    CIRCLE_API_KEY="your-circle-api-key"
    CIRCLE_SANDBOX="true"
    ```

3.  **Install Backend Dependencies:**
    ```bash
    go mod download
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd web
    npm install
    cd ..
    ```

### Running the Application

We use a `Makefile` to simplify common tasks.

1.  **Start the Backend Services:**
    You can run services individually or all together. For development, start the Gateway:
    ```bash
    make run-gateway
    ```
    *Note: Ensure your database environment variables are set or use the default SQLite configuration.*

2.  **Start the Frontend:**
    ```bash
    cd web
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 🧪 Testing

### Backend Unit Tests
We use usage `testing` package and `testify` for assertions.
```bash
make test
```
This runs all unit tests across `auth`, `payroll`, and `wallet` services.

### Frontend E2E Tests
We use **Playwright** for comprehensive end-to-end testing.
```bash
cd web
npx playwright test
```
To run the tests in UI mode:
```bash
npx playwright test --ui
```

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to submit pull requests, report issues, and code standards.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by the Velo Team.**
