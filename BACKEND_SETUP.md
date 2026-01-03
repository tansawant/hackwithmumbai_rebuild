# 🚀 HackwithMumbai Backend Setup

## Prerequisites
- Node.js and npm installed
- Razorpay account with credentials

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Update `.env` file with your Razorpay credentials:

```env
VITE_RAZORPAY_KEY_ID=rzp_live_YOUR_ACTUAL_KEY_ID
RAZORPAY_KEY_ID=rzp_live_YOUR_ACTUAL_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_ACTUAL_SECRET_KEY
PORT=5000
```

**How to get your Razorpay Keys:**
1. Log in to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Go to Settings → API Keys
3. Copy your **Key ID** (frontend) and **Key Secret** (backend only)
4. Paste them in the `.env` file

### 3. Run the Application

#### Option A: Run both frontend and backend together (Recommended)
```bash
npm run dev:all
```

#### Option B: Run separately
**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run server
```

### 4. Access the Application

- **Frontend:** http://localhost:5174/hackwithmumbai/
- **Backend:** http://localhost:5000

## File Structure

- `server.js` - Backend server (Express.js)
- `.env` - Environment variables
- `src/App.jsx` - Updated frontend with backend integration

## Backend API Endpoints

- `GET /api/health` - Health check
- `POST /api/create-order` - Create Razorpay order
- `POST /api/verify-payment` - Verify payment signature
- `GET /api/registrations` - Get all registrations

## Security Notes

⚠️ **Important:**
- Never commit `.env` to git (already in .gitignore)
- Secret key should NEVER be exposed in frontend code
- Use HTTPS in production
- Implement proper authentication for admin endpoints

## Troubleshooting

If you get "Payment Failed" error:
1. Check that backend is running (`npm run server`)
2. Verify Razorpay credentials in `.env`
3. Check browser console for error details
4. Make sure CORS is enabled (it is)

For more help, check the Razorpay documentation: https://razorpay.com/docs/api/orders/
