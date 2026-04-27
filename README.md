# ComCare Healthcare Platform

A fast, intelligent, and scalable MERN stack application designed to provide AI-powered disease predictions, track health history, and connect users with verified healthcare NGOs.

## Features

- **JWT Authentication**: Secure role-based access with access and rotation-based refresh tokens.
- **Disease Prediction Engine**: Enter symptoms and receive a confidence-scored disease prediction mapped to 18 common ailments.
- **NGO Directory**: Search and filter nearby healthcare NGOs and services.
- **Health Tracking**: A personal dashboard tracking history over time.
- **Modern UI**: Fully responsive, accessible, mobile-first design using Tailwind CSS and headless UI patterns.

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Zustand, React Router, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Security**: bcrypt, jsonwebtoken, Helmet, CORS, Express Rate Limit, Joi validation.

## Prerequisites

- Node.js (v18+ recommended)
- MongoDB account (Atlas or local)

## Local Setup

### 1. Backend Configuration

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```
4. Edit `.env` and add your **MongoDB URI** and custom JWT secrets.
5. Start the backend dev server (this will automatically seed sample NGOs):
   ```bash
   npm run dev
   ```
   *The server runs on `http://localhost:5000` by default.*

### 2. Frontend Configuration

1. Open a new terminal instance and navigate to the frontend folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```
   *(Ensure `VITE_API_URL` points to your backend).*
4. Start the Vite dev server:
   ```bash
   npm run dev
   ```
   *The app runs on `http://localhost:5173` by default.*

## Scripts

**Backend (`/server`)**
- `npm start`: Runs the server (Production)
- `npm run dev`: Runs the server with auto-reload (Development)
- `npm run seed`: Manually seeds the NGO database

**Frontend (`/client`)**
- `npm run dev`: Starts Vite dev server
- `npm run build`: Builds for production
- `npm run preview`: Locally preview production build

## API Documentation

- `POST /api/auth/register` - Create an account
- `POST /api/auth/login` - Login to an account
- `POST /api/auth/refresh` - Rotate access tokens using a refresh token
- `GET /api/users/me` - Get current authenticated user profile
- `POST /api/predict` - Run a symptom analysis
- `GET /api/predict/history` - Get paginated prediction history
- `GET /api/ngos` - Get searchable list of NGOs