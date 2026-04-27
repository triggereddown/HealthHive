# Deployment Guide

This guide covers the deployment of the ComCare platform using Render for the Node.js backend and Vercel for the React frontend.

## 1. Deploying the Backend (Render)

Render is a great platform for hosting Node.js applications with free/hobby tiers.

### Prerequisites
- Create a free account on [Render.com](https://render.com/)
- Host your code in a GitHub repository
- Ensure you have a production MongoDB URI ready (e.g., MongoDB Atlas)

### Steps
1. Navigate to your Render Dashboard and create a new **Web Service**.
2. Connect your GitHub repository containing the ComCare code.
3. Configure the service:
   - **Name**: `comcare-api` (or similar)
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Expand **Advanced** and set Environment Variables:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `MONGO_URI`: `your_mongodb_connection_string`
   - `JWT_SECRET`: `your_secure_random_string`
   - `REFRESH_TOKEN_SECRET`: `your_secure_random_string_2`
   - `CLIENT_URL`: `https://your-frontend-url.vercel.app` (You can update this after deploying the frontend later)
5. Click **Create Web Service**. Render will build and deploy the API. Save the generated `onrender.com` URL.

---

## 2. Deploying the Frontend (Vercel)

Vercel is optimized for building and deploying Vite/React applications quickly.

### Prerequisites
- Create a free account on [Vercel.com](https://vercel.com/)
- Host your code in a GitHub repository (same repo as backend is fine)

### Steps
1. In the Vercel Dashboard, click **Add New...** → **Project**.
2. Import the ComCare repository.
3. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Set Environment Variables:
   - `VITE_API_URL`: Use the URL from your Render backend deployment (e.g., `https://comcare-api.onrender.com/api`).
5. Click **Deploy**. Vercel will build and go live.
6. **Important**: Go back to your Render backend dashboard and update the `CLIENT_URL` environment variable to match the newly generated Vercel URL, then trigger a manual deploy on Render so CORS configuration applies properly.

## Verifying Deployment
Once both are deployed:
1. Navigate to your Vercel URL.
2. Verify the application loads correctly.
3. Attempt to register a user.
4. Verify the database saves the user and the system logs you in.
5. In the Health Dashboard, try a dummy prediction and fetch NGOs to confirm API stability.
