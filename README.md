# E-Commerce Project (Throttle)

A full-stack E-Commerce application featuring a Spring Boot backend and a React (Vite) frontend. The project supports both Customers and Sellers with distinct registration and login flows, secured by JWT and OTP verification.

## 🚀 Features

- **Dual User Roles**: Separate authentication and dashboards for Customers and Sellers.
- **Multi-Collection Authentication**: Custom Spring Security provider to handle authentication across different MongoDB collections.
- **JWT Security**: Secure API access using JSON Web Tokens.
- **OTP Verification**: Email-based One-Time Password (OTP) for registration and verification.
- **Seller Dashboard**: Interface for sellers to manage products (e.g., adding Bikes).
- **Responsive Frontend**: Modern UI built with React, Tailwind CSS, and TypeScript.

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 4.0.2
- **Language**: Java 21
- **Security**: Spring Security, JWT (io.jsonwebtoken)
- **Database**: MongoDB
- **Communication**: Spring Mail (SMTP for OTPs)
- **Utilities**: Lombok

### Frontend
- **Library**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios

---

## 📂 Project Structure

```text
E_Commerce/
├── e_commerce_backend/      # Spring Boot Application
│   ├── src/main/java/...    # Backend Source Code
│   ├── src/main/resources/  # Configuration (application.properties)
│   └── pom.xml              # Maven Dependencies
└── e_commerce_frontend/     # React Application
    ├── src/                 # Frontend Source Code
    │   ├── features/        # Feature-based modules (Auth, Seller, Customer)
    │   ├── components/      # Common UI components
    │   └── utils/           # Constants and helpers
    ├── package.json         # Frontend Dependencies
    └── vite.config.ts       # Vite Configuration
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Java 21 or higher
- Node.js (v18+) & npm
- MongoDB (running on `localhost:27017`)
- SMTP Server (e.g., Gmail) for sending OTPs

### Backend Setup
1. Navigate to `e_commerce_backend`.
2. Update `src/main/resources/application.properties` with your MongoDB credentials and SMTP settings.
3. Build the project:
   ```bash
   ./mvnw clean install
   ```
4. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup
1. Navigate to `e_commerce_frontend`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The frontend will be available at `http://localhost:5173`.

---

## 🛣️ API Endpoints Summary

### Authentication & OTP
- `POST /api/otp/send-otp?email={email}` - Send OTP to email.
- `POST /api/otp/verify-otp` - Verify received OTP.

### Seller
- `POST /api/seller/register` - Register a new seller.
- `POST /api/seller/login` - Seller login (returns JWT).

### Customer
- `POST /api/customer/register` - Register a new customer.

---

## 📄 License
This project is for educational purposes.
