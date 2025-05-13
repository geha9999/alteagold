# Vite React Tailwind Starter with OTP and MT5 Integration

## Overview

This project is a starter template for a React app using Vite and Tailwind CSS. It includes:

- Multi-step registration form with email OTP verification.
- Backend API for OTP email sending and verification.
- MT5 account validation integration.
- File upload and subscription selection.

## Setup Instructions

### Backend

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example` and fill in your email credentials:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password-or-app-password
MT5_API_BASE_URL=https://your-mt5-server-api.com
```

4. Start the backend server:

```bash
node server.js
```

The backend server will run on `http://localhost:4000`.

### Frontend

1. Navigate to the frontend directory:

```bash
cd vite-react-tailwind-starter
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:8000` (or another port if 8000 is in use).

## Usage

- Register a new user by entering your email and verifying OTP.
- Agree to documents.
- Enter MT5 account details and validate.
- Upload ID card and select subscription.
- Complete registration.

## Notes

- Replace the MT5 API base URL in `.env` with your actual MT5 server API endpoint.
- The backend uses Gmail SMTP for sending OTP emails; configure accordingly.
- For production, secure environment variables and use HTTPS.

## Next Steps

- Implement real MT5 API backend integration.
- Add authentication and user management.
- Deploy to cloud hosting.

Feel free to reach out for support or customization.
