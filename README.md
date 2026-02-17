# Velo: The Fintech Operating System for Modern Businesses

![Velo Banner](https://via.placeholder.com/1200x400?text=Velo+Fintech+OS)

**Velo** is a next-generation financial platform designed to streamline business operations. From managing multi-currency wallets and automated payroll to team collaboration and enterprise-grade security, Velo provides a unified interface for all your financial needs.

Built with a modern tech stack, Velo is fast, secure, and scalable.

## 🚀 Key Features

### 💼 Smart Wallet Management
- **Multi-Currency Support**: Seamlessly manage balances in USD, USDC, and other currencies.
- **Provider Agnostic**: integrated with top-tier payment providers (Circle, Stripe) ensuring reliability.
- **Granular Controls**: Set daily/monthly spending limits and configure custom wallet settings.
- **Comprehensive Analytics**: Visualize spending trends, cash flow, and transaction breakdowns.

### 💸 Automated Payroll
- **Batch Processing**: Pay hundreds of employees or contractors in a single click.
- **CSV Import**: Easily upload payroll data for bulk processing.
- **Approval Workflows**: Automated safeguards trigger approval requests for high-value batches (> $100k).
- **Flexible Payments**: Support for salary, bonuses, and contractor payouts.

### 👥 Team & Access Control
- **Role-Based Access Control (RBAC)**: Define custom roles (Admin, Finance Manager, Auditor) with precise permissions.
- **Secure Invitations**: Invite team members via email with secure token-based onboarding.
- **Audit Logs**: Track every action taken within the platform for full accountability.

### 🔒 Enterprise-Grade Security
- **Two-Factor Authentication (2FA)**: Layered security with TOTP support.
- **SSO Integration**: seamless login via Google and Microsoft (Enterprise Ready).
- **Security Logs**: Monitor login attempts, password changes, and sensitive actions.

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

2.  **Install Backend Dependencies:**
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
