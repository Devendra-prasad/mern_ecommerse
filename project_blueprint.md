# MERN Real Estate - Project Blueprint

This document serves as a high-level overview and structural guide for the **MERN Real Estate** application. It is designed to help incoming developers quickly understand the tech stack, architecture, folder structure, and core components of the system.

---

## 🏗 System Architecture

The project follows a standard **MERN stack** client-server architecture:
- **Client (Frontend):** A Single Page Application (SPA) built with React and Vite, using Redux for state management and Tailwind CSS for styling.
- **API (Backend):** A RESTful API built with Node.js and Express.js, providing data and authentication services to the specific client endpoints.
- **Database:** MongoDB, interacted with via Mongoose ORM.
- **External Services:** 
    - **Firebase:** Used for Google OAuth authentication and potentially image storage.

---

## 🛠 Tech Stack

### Frontend (`/client`)
- **Framework:** React 18, Vite
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **State Management:** Redux Toolkit (`@reduxjs/toolkit`), Redux Persist
- **Routing:** React Router v6 (`react-router-dom`)
- **UI Components:** React Icons, Swiper (for image carousels)
- **Integrations:** Firebase (Auth, Storage)

### Backend (`/api`)
- **Runtime:** Node.js
- **Framework:** Express.js 4
- **Database ORM:** Mongoose 8
- **Authentication:** JSON Web Tokens (`jsonwebtoken`), bcryptjs (password hashing), Cookie Parser
- **File Upload & Handling:** Multer
- **Emails:** Nodemailer ( likely used for forgot-password workflows)
- **Security & Utilities:** `express-rate-limit`, `dotenv`

---

## 🗂 Project Structure Map

```text
mern-real-estate/
├── api/                        # Backend Express Application
│   ├── controllers/            # Request handlers (logic) for routes
│   │   ├── auth.controller.js
│   │   ├── listing.controller.js
│   │   └── user.controller.js
│   ├── middleware/             # Express middlewares (e.g., auth checks)
│   ├── models/                 # Mongoose schema definitions
│   │   ├── listing.model.js    # Property details like name, description, address, regular/discount price, etc.
│   │   └── user.model.js       # User details (username, email, password, avatar)
│   ├── routes/                 # API endpoint declarations
│   │   ├── auth.route.js       # /api/auth/signup, signin, google, signout, reset
│   │   ├── listing.route.js    # /api/listing/create, update, delete, get, get-all
│   │   └── user.route.js       # /api/user/test, update, delete, listings
│   ├── utils/                  # Utility functions (e.g., custom error handler)
│   └── index.js                # Entry point for the Express server
│
├── client/                     # Frontend React Application
│   ├── src/
│   │   ├── assets/             # Static images and icons
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx      # Navigation bar
│   │   │   ├── ListingItem.jsx # Property card used in lists
│   │   │   ├── OAuth.jsx       # Google Sign-in button
│   │   │   └── PrivateRoute.jsx# Auth wrapper for protected pages
│   │   ├── pages/              # Main view components (Routes)
│   │   │   ├── Home.jsx
│   │   │   ├── Search.jsx      # Search filters and results
│   │   │   ├── Listing.jsx     # Individual property details
│   │   │   ├── CreateListing.jsx
│   │   │   ├── UpdateListing.jsx
│   │   │   ├── Profile.jsx     # User dashboard
│   │   │   └── SignIn/SignUp, Forgot/Reset Password
│   │   ├── redux/              # Global state slices and store setup
│   │   ├── App.jsx             # React Router setup
│   │   ├── main.jsx            # React rendering and Provider setup
│   │   └── index.css           # Global styles and Tailwind imports
│   ├── index.html              # HTML entry point
│   ├── package.json            # Frontend dependencies
│   ├── tailwind.config.js      # Utility class configuration
│   └── vite.config.js          # Bundler and dev proxy configuration
│
├── data/                       # Initial dummy data / backups
├── node_modules/               
├── .env                        # Root Environment variables (DB URL, JWT Secret, etc.)
├── .gitignore
├── package.json                # Root package & backend dependencies
└── README.md                   # Project documentation
```

---

## 🚦 Core Features

1. **User Authentication:**
   - Email and Password registration/login via JWT and HTTP-only cookies.
   - Google OAuth integration via Firebase.
   - Password reset workflow.
   - Profile management (avatar updates, credential updates, account deletion).
2. **Property Management (CRUD):**
   - Users can create, update, and delete their own property listings.
   - Features include multiple image uploads, property parameters (beds, baths, furnished, parking, type: rent/sale), and pricing logic.
3. **Advanced Search & Filtering:**
   - Search by term, property type (rent, sale), amenities (parking, furnished), and sorting (latest, oldest, price high/low).
4. **Interactive UI:**
   - Image sliders using Swiper.
   - Responsive layouts optimized by Tailwind CSS.
   - Protected routing for authenticated users.

---

## 🚀 Setup Instructions (For New Devs)

1. **Clone & Install Dependencies**
   ```bash
   # Install backend dependencies
   npm install

   # Install frontend dependencies
   cd client
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root based on `.env.example`:
   ```env
   MONGO=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   # Any other required keys (e.g., node mailer, etc.)
   ```
   *(Note: Ensure Firebase config values in `client/src/firebase.js` match your current environment)*

3. **Running Locally**
   You can run both client and server simultaneously using concurrent scripts if configured in root, or run them in separate terminals:
   
   **Terminal 1 (Backend):**
   ```bash
   # from root
   npm run dev
   # Runs nodemon api/index.js (usually on port 3000)
   ```

   **Terminal 2 (Frontend):**
   ```bash
   cd client
   npm run dev
   # Runs vite development server (usually on port 5173)
   ```

*(In Vite configuration (`vite.config.js`), a proxy is typically set up to forward `/api` requests to `localhost:3000` to avoid CORS issues locally.)*
