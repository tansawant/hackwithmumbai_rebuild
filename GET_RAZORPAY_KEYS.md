# ⚙️ Get Your Razorpay Credentials

## Step-by-Step Guide

### 1. Log in to Razorpay Dashboard
- Go to https://dashboard.razorpay.com
- Log in with your credentials (or create an account)

### 2. Navigate to API Keys
- Click on **Settings** (gear icon) in the top right
- Select **API Keys** from the left menu
- You'll see two tabs: **Live** and **Test**

### 3. Copy Your Keys

#### For PRODUCTION (Live Mode):
- Click the **Live** tab
- You'll see:
  - **Key ID** (starts with `rzp_live_`)
  - **Key Secret** (keep this secret!)

#### For TESTING (Test Mode - for development):
- Click the **Test** tab
- You'll see:
  - **Key ID** (starts with `rzp_test_`)
  - **Key Secret** (keep this secret!)

### 4. Update .env File

**For Production:**
```env
VITE_RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_ID_HERE
RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_ID_HERE
RAZORPAY_KEY_SECRET=YOUR_SECRET_KEY_HERE
PORT=5000
```

**For Testing (Development):**
```env
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_TEST_KEY_ID_HERE
RAZORPAY_KEY_ID=rzp_test_YOUR_TEST_KEY_ID_HERE
RAZORPAY_KEY_SECRET=YOUR_TEST_SECRET_KEY_HERE
PORT=5000
```

### 5. Test Payment Details (for Test Mode only)

If using test credentials, use these to test:

**Valid Card:**
- Number: `4111111111111111`
- Expiry: Any future date (e.g., 12/25)
- CVV: Any 3 digits (e.g., 123)

**Testing Tips:**
- Test mode won't actually charge your card
- You can test success and failure scenarios
- All test transactions appear in your test dashboard

⚠️ **Security:**
- Never commit `.env` to git
- Never share your secret key
- Keep your secret key private

Once you've added your credentials, restart the backend:
```bash
npm run server
```
