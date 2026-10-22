<div align="center">
  <h1><img src="https://cdn-icons-png.flaticon.com/512/3514/3514491.png" alt="ShopNest Logo" width="40" height="40" /> ShopNest<img src="https://cdn-icons-png.flaticon.com/512/3514/3514491.png" alt="ShopNest Logo" width="40" height="40" /></h1>
  <h3>Full-Stack MERN E-Commerce Application</h3>
  <p>A React storefront and Express API for product discovery, shopping, checkout, and administration.</p>
</div>

---

## Overview

ShopNest is a full-stack e-commerce application with a React frontend and a Node.js/Express backend connected to MongoDB. It includes customer shopping and account flows, order management, payment integration, and administrative tools.

## Features

- Browse products in the storefront, shop, and product detail pages
- Manage a shopping cart and proceed through checkout
- Register, log in, and view a customer profile and orders
- Create and verify Razorpay payment orders
- Upload product images using Cloudinary
- Admin pages for product, order, and user management
- Admin analytics dashboard
- Optional sample data seeding for development

## Technology

- **Frontend:** React, React Router, Redux Toolkit
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Integrations:** Razorpay, Cloudinary, Gmail SMTP

## Prerequisites

- Node.js **20.19.0 or newer**
- npm
- Access to a MongoDB database

Cloudinary, Razorpay, and Gmail SMTP credentials are needed only for the integrations you plan to use.

## Local Development

### 1. Install dependencies

Run this from the project root:

```bash
npm run install-all
```

Alternatively, install the packages individually:

```bash
npm install
npm --prefix backend install
npm --prefix frontend install
```

### 2. Configure environment variables

Create `backend/.env` from the example file.

**Windows PowerShell:**

```powershell
Copy-Item backend\.env.example backend\.env
```

**macOS/Linux:**

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and provide values for the settings you use:

| Variable | Purpose |
| --- | --- |
| `PORT` | Backend port. Defaults to `5000` if unset. |
| `MONGO_URI` | MongoDB connection string. |
| `JWT_SECRET` | Strong, randomly generated secret used to sign authentication tokens. |
| `EMAIL_USER` | Gmail address used to send email. |
| `EMAIL_PASS` | Gmail app password used for SMTP authentication. |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for product image uploads. |
| `CLOUDINARY_API_KEY` | Cloudinary API key. |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret. |
| `RAZORPAY_KEY_ID` | Razorpay key ID. |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret. |
| `FRONTEND_URL` | Frontend origin allowed by the backend. For local development, use `http://localhost:3000`. |
| `NODE_ENV` | Set to `development` for local development. |

Keep real credentials in `backend/.env`. Never commit or publish that file, and do not use production credentials for local development.

The frontend uses a development proxy to send `/api` requests to the backend.

### 3. Start the application

Start both services from the project root:

```bash
npm run dev
```

Or start each service in a separate terminal:

**Backend:**

```bash
npm run start:backend
```

**Frontend:**

```bash
npm run start:frontend
```

The frontend is available at [http://localhost:3000](http://localhost:3000). The backend uses port `5000` by default.

### 4. Seed sample data (optional)

To insert sample users and products into the configured database, run this from the project root:

```bash
npm run seed
```

> **Warning:** The seed script deletes all existing users and products in the configured database before inserting sample data. Run it only against a development database where replacing that data is acceptable. Review the demo account credentials in `backend/seed.js` and change or remove them before making the application available to others. Never run the seeder against production data.

## Production Build

Build the frontend from the project root:

```bash
npm run build
```

The build output is created in `frontend/build`. When `NODE_ENV` is set to `production`, the backend is configured to serve the built frontend.

To start the backend:

```bash
npm start
```

## Deploying to Render

ShopNest can be deployed as a single Render Web Service, with the Express backend serving the built frontend. Deployment requires a configured MongoDB database and environment variables.

1. Push the project to a GitHub repository.
2. In Render, create a **Web Service** and connect the repository.
3. Set the **Build Command** to:

   ```bash
   npm run install-all && npm run build
   ```

4. Set the **Start Command** to:

   ```bash
   npm start
   ```

5. Add the required environment variables in Render. Set `NODE_ENV` to `production`, provide the production MongoDB connection and a strong `JWT_SECRET`, and configure credentials for the integrations you use.
6. Set `FRONTEND_URL` to your deployed service’s public origin.
7. Deploy the service and check the build and runtime logs if it does not start successfully.

Do not run the seed script against a production database; it deletes existing users and products.

## Security

- Keep `.env` files and credentials private.
- Use strong, unique secrets for each environment.
- Use a separate development database for testing and sample data.
- Review and replace demo credentials before making the app available to others.
