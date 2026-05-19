# EVORA — Premium Event Management Platform

EVORA is a sleek, premium, and highly-curated event management platform designed to discover, book, and scale exclusive gatherings. Built using a modern MERN stack (MongoDB, Express, React, Node.js), it features a fully-functional Admin and Super Admin dashboard, dynamic analytics, real-time ticket ledger tracking, role-based controls, and a secure first-time password reset system for new administrative accounts.

---

## 🚀 Tech Stack

### Frontend
* **Core:** React 18, React Router DOM v6, Vite
* **Styling:** TailwindCSS, Vanilla CSS, Lucide React (Icons), GSAP (Animations)
* **Data Fetching:** SWR (State & cache management, automatic background revalidation)
* **State Management:** Zustand (for Auth and UI toast state)

### Backend
* **Core:** Node.js, Express
* **Database:** MongoDB Atlas + Mongoose ODM
* **Security & Auth:** JWT (JSON Web Tokens), bcryptjs (hashing), Helmet, Rate Limiter
* **Validation:** Zod schemas
* **Utilities:** Multer (memory storage for file uploading), QR Code generator, Morgan (request logging)

---

## 📁 Project Structure

```
Evora/
├── backend/            # Express REST API
│   ├── src/
│   │   ├── common/     # Global middlewares, error handlers, and utility scripts
│   │   ├── config/     # DB connections and environment configuration
│   │   ├── modules/    # Modular structure (auth, admin, events, bookings, users, media)
│   │   └── scripts/    # Data seeding scripts
│   ├── .env            # Backend secrets (ignored by Git)
│   └── package.json
│
├── frontend/           # Vite React Single Page Application (SPA)
│   ├── src/
│   │   ├── api/        # Axios interceptors and endpoints configurations
│   │   ├── components/ # Reusable UI components (DataTable, Modal, Buttons, Input)
│   │   ├── layouts/    # Page structures (PublicLayout, DashboardLayout)
│   │   ├── pages/      # Route pages (Landing, Events, Auth, Admin Dashboards)
│   │   ├── routes/     # AppRouter and Role-based Route Guard components
│   │   └── store/      # Zustand authStore and uiStore
│   └── package.json
```

---

## 🛠️ Getting Started

### 1. Prerequisites
* **Node.js** (v18 or higher recommended)
* **MongoDB** (A local instance or MongoDB Atlas Connection String)

### 2. Backend Setup
1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` root folder (a template is available in `backend/.env`):
   ```env
   NODE_ENV=development
   PORT=5000
   APP_NAME=EVORA
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   BCRYPT_SALT_ROUNDS=12
   CORS_ORIGIN=http://localhost:5173
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX=200
   SUPER_ADMIN_NAME=EVORA Root
   SUPER_ADMIN_EMAIL=superadmin@evora.app
   SUPER_ADMIN_PASSWORD=ChangeThisStrongPassword
   ```
4. **Seed the database** with sample users, events, and bookings:
   ```bash
   npm run seed
   ```
5. Start the backend development server (runs on port 5000):
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open another terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (or verify the default fallback API URL is set to `http://localhost:5000/api/v1`).
4. Start the frontend Vite development server (runs on port 5173):
   ```bash
   npm run dev
   ```

---

## 🧪 Seeding & Test Credentials

After running `npm run seed` in the backend directory, you can log in immediately using the following accounts:

### 👑 Super Admin (Full platform control + can appoint admins)
* **Email:** `superadmin@evora.app`
* **Password:** `Password123!`

### 🛡️ Regular Admin (Manages events, tickets, and bookings)
* **Email:** `admin@evora.app`
* **Password:** `Password123!`

### 👤 Regular User
* **Email:** `current1@evora.app` to `current10@evora.app`
* **Password:** `Password123!`

---

## 🛡️ Administrative Features

* **Dynamic Analytics Engine:** The home admin dashboard aggregates total users, events, and bookings. It calculates percentage trends (+% or -%) dynamically by comparing the current 30-day performance against the previous 30-day performance.
* **Role-Based Event Management:** Full CRUD suite for creating, publishing, and deleting events. Inputs are strictly validated on both frontend and backend using Zod schemas.
* **Role Appointment Flow:** Super Admins can appoint new Admin accounts. Newly appointed admins are forced to reset their temporary passwords via a secure gateway route (`/first-login-reset`) upon their first login before they can access operational features.
* **Global Bookings Ledger:** Admin and Super Admin accounts can view all reservation records across the system, search for users, and monitor event capacity.
