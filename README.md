# House Price Prediction Frontend

A Next.js frontend for the R Plumber House Price Prediction API.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- Real-time health check of the R backend
- Price Prediction form (Linear Regression)
- High/Low Classification form (Logistic Regression)

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure Environment:**

   Create a file named `.env.local` in the root directory.

   **For Local Development (with local R API):**
   ```bash
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   ```

   **For Production (with Render API):**
   ```bash
   NEXT_PUBLIC_API_BASE_URL=https://house-api-server.onrender.com
   ```

3. **Run the Development Server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `app/`: App Router pages and layout.
- `components/`: React components (Forms, HealthStatus).
- `lib/`: API helpers (`api.ts`) and TypeScript definitions (`types.ts`).
- `public/`: Static assets.

## API Integration

The app uses `lib/api.ts` to communicate with the backend. It handles:
- `/health`: Checks API status.
- `/predict_price`: Predicts house price.
- `/predict_highlow`: Classifies house value.
