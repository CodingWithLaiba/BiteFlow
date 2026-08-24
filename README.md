# BiteFlow 🍔

BiteFlow is a full-stack food ordering platform where diners can discover restaurants, browse menus, and check out with Stripe, while restaurant owners can create and manage their own restaurant listings and menus. It's built as a MERN-style app with a TypeScript/Express API and a React + Vite frontend.

**Live demo:** [bite-flow-rho.vercel.app](https://bite-flow-rho.vercel.app/)

## Features

- 🔐 Authentication and user sessions via Auth0
- 🔍 Search and filter restaurants by cuisine, city, and other criteria
- 🍽️ Restaurant owner dashboard to create/manage a restaurant and its menu
- 🖼️ Image uploads (restaurant/menu images) via Cloudinary
- 🛒 Cart, checkout, and payments powered by Stripe (with webhook handling)
- 📦 Order tracking with status updates
- 👤 Editable user profile
- 📱 Responsive UI built with Tailwind CSS and shadcn/Radix UI components

## Tech Stack

**Frontend** (`/Frontend`)
- React 19 + TypeScript + Vite
- React Router
- TanStack Query for data fetching/caching
- React Hook Form + Zod for forms and validation
- Tailwind CSS, Radix UI / shadcn, Lucide icons
- Auth0 React SDK

**Backend** (`/Backend`)
- Node.js + Express (TypeScript)
- MongoDB with Mongoose
- Auth0 (`express-oauth2-jwt-bearer`) for JWT-protected routes
- Stripe for checkout sessions and payment webhooks
- Cloudinary + Multer for image storage/uploads

**Deployment**
- Hosted on Vercel as a single project: the frontend is built as static output, and the Express API is exposed as a serverless function via `/api` (see `vercel.json`).

## Project Structure

```
BiteFlow/
├── Backend/               # Express + TypeScript API
│   └── src/
│       ├── controllers/   # Restaurant, order, and user controllers
│       ├── middleware/    # Auth (Auth0) and request validation
│       ├── models/        # Mongoose schemas (User, Restaurant, Order)
│       └── routes/        # Route definitions mounted under /api/*
├── Frontend/               # React + Vite client
│   └── src/
│       ├── api/            # API client hooks (React Query)
│       ├── auth/           # Auth0 provider and protected routes
│       ├── components/     # UI components
│       ├── forms/          # Profile & manage-restaurant forms
│       └── config/         # App-level config (cuisines, order status, etc.)
├── api/                    # Vercel serverless entry point for the backend
├── package.json
└── vercel.json
```

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- A MongoDB database (e.g. MongoDB Atlas)
- An Auth0 application (SPA + API)
- A Stripe account (test mode is fine)
- A Cloudinary account

### 1. Clone the repo

```bash
git clone https://github.com/CodingWithLaiba/BiteFlow.git
cd BiteFlow
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/` with:

```env
MONGOBD_CONNECTION=your_mongodb_connection_string
AUTH0_AUDIENCE=your_auth0_api_audience
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com/
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_API_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
FRONTEND_URL=http://localhost:5173
```

Run the backend (also starts the Stripe CLI webhook listener):

```bash
npm run dev
```

The API runs on `http://localhost:7000`. Stripe webhook events are forwarded to `/api/order/checkout/webhook`, so you'll need the [Stripe CLI](https://stripe.com/docs/stripe-cli) installed and logged in.

### 3. Frontend setup

```bash
cd Frontend
npm install
```

Create a `.env` file in `Frontend/` with your Auth0 SPA credentials and API base URL, for example:

```env
VITE_API_BASE_URL=http://localhost:7000
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_AUTH0_CALLBACK_URL=http://localhost:5173
```

Run the frontend:

```bash
npm run dev
```

The app runs on `http://localhost:5173` by default.

## Deployment

The project is configured to deploy as a single Vercel project (`vercel.json`):
- Frontend is built with Vite and served as static output.
- API requests to `/api/*` are routed to the Express app in `/api`.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a pull request or file an issue.

## License

This project currently has no explicit license. Contact the repo owner if you'd like to use it beyond personal/learning purposes.
