# Authentication Testing Guide

## Pre-Testing Setup

### 1. Run Database Migration
```bash
cd server
npm run migrate
```

This will add the `full_name` column to the users table.

### 2. Start the Backend Server
```bash
cd server
npm run dev
```

The server should start on port 3000 (or the PORT specified in .env).

### 3. Start the Frontend Development Server
```bash
# In the root directory
npm run dev
```

The frontend should start on port 5173 (Vite default).

## Test Scenarios

### Test 1: New User Signup

**Steps:**
1. Navigate to `http://localhost:5173/signup`
2. Fill in the form:
   - Full name: `John Doe`
   - Email: `john.doe@example.com`
   - Password: `TestPassword123`
   - Confirm password: `TestPassword123`
3. Click "Sign up"

**Expected Results:**
- ✅ No validation errors
- ✅ Redirected to `/login` page
- ✅ Email field is pre-filled with `john.doe@example.com`
- ✅ Success message displayed: "Account created successfully! Please log in."
- ✅ `localStorage` does NOT contain tokens yet
- ✅ User is NOT logged in yet

**Check in Browser DevTools:**
```javascript
// Open Console and run:
localStorage.getItem('token')        // Should return null
localStorage.getItem('refresh_token') // Should return null
```

---

### Test 2: Duplicate Email Signup

**Steps:**
1. Try to sign up again with the same email: `john.doe@example.com`
2. Use any password

**Expected Results:**
- ❌ Form submission fails
- ✅ Error message: "This email is already registered. Try logging in instead."
- ✅ User stays on signup page

---

### Test 3: Invalid Signup Data

**Test 3a: Short Password**
- Password: `test123` (only 7 characters)
- Expected: "Password must be at least 8 characters."

**Test 3b: Passwords Don't Match**
- Password: `TestPassword123`
- Confirm: `TestPassword456`
- Expected: "Passwords do not match."

**Test 3c: Invalid Email**
- Email: `notanemail`
- Expected: "Please enter a valid email address."

**Test 3d: Missing Full Name**
- Full name: (empty or just 1 character)
- Expected: "Full name is required."

---

### Test 4: User Login (After Signup)

**Steps:**
1. Continue from Test 1 (should already be on login page)
2. Password field should be empty, email should be pre-filled
3. Enter password: `TestPassword123`
4. Click "Login"

**Expected Results:**
- ✅ User is logged in successfully
- ✅ Redirected to home page (`/`)
- ✅ `localStorage` contains `token` and `refresh_token`
- ✅ Dashboards are displayed on home page
- ✅ Success message is cleared

**Alternative: Direct Login**
1. Navigate to `http://localhost:5173/login`
2. Fill in the form:
   - Email: `john.doe@example.com`
   - Password: `TestPassword123`
3. Click "Login"

**Expected Results:**
- ✅ User is logged in successfully
- ✅ Redirected to home page (`/`)
- ✅ `localStorage` contains `token` and `refresh_token`
- ✅ No error messages

---

### Test 5: Invalid Login Credentials

**Test 5a: Wrong Password**
- Email: `john.doe@example.com`
- Password: `WrongPassword`
- Expected: "Invalid email or password. Please check your credentials."

**Test 5b: Non-existent Email**
- Email: `doesnotexist@example.com`
- Password: `TestPassword123`
- Expected: "Invalid email or password. Please check your credentials."

---

### Test 6: Protected Routes

**Steps:**
1. Logout (clear localStorage)
2. Try to navigate directly to: `http://localhost:5173/employer-dashboard`

**Expected Results:**
- ✅ Redirected to `/login` page
- ✅ After login, redirected back to the originally requested page

---

### Test 7: Token Refresh Flow

**Steps:**
1. Login successfully
2. Open Browser DevTools → Application → Local Storage
3. Note the current `token` value
4. Wait for 1 hour (or manually expire the token by decoding and changing `exp`)
5. Make an authenticated request (navigate to a protected page)

**Expected Results:**
- ✅ Access token is automatically refreshed
- ✅ New token is stored in localStorage
- ✅ User stays logged in
- ✅ No interruption in user experience

**Manual Token Expiration Test:**
```javascript
// In browser console:
// 1. Get current token
const token = localStorage.getItem('token');

// 2. Decode it (you'll see it's a JWT with exp claim)
const payload = JSON.parse(atob(token.split('.')[1]));
console.log('Token expires:', new Date(payload.exp * 1000));

// 3. To simulate expiration, you can temporarily clear the token
// and see if refresh works
localStorage.removeItem('token');

// 4. Navigate to a protected route - should trigger refresh
window.location.href = '/jobs';
```

---

### Test 8: Logout Flow

**Steps:**
1. Login first
2. Navigate to a page with logout button
3. Click logout

**Expected Results:**
- ✅ User is logged out
- ✅ Tokens are cleared from localStorage
- ✅ User state is set to null
- ✅ Redirected to home or login page

**Verify in Console:**
```javascript
localStorage.getItem('token')        // Should return null
localStorage.getItem('refresh_token') // Should return null
```

---

### Test 9: Session Persistence

**Steps:**
1. Login successfully
2. Close the browser tab
3. Open a new tab and navigate to `http://localhost:5173`
4. Navigate to a protected route like `/jobs`

**Expected Results:**
- ✅ User is still logged in
- ✅ Tokens are restored from localStorage
- ✅ User data is fetched from `/api/auth/me`
- ✅ Protected routes are accessible

---

### Test 10: API Error Handling

**Test 10a: Server Down**
1. Stop the backend server
2. Try to login
- Expected: Error message about connection failure

**Test 10b: Invalid JWT Secret**
1. Change `JWT_ACCESS_SECRET` in server `.env`
2. Restart server
3. Try to access protected route with old token
- Expected: Token validation fails, user logged out

---

## API Endpoint Testing (using curl or Postman)

### Register Endpoint
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Smith",
    "email": "jane.smith@example.com",
    "password": "SecurePass123"
  }'
```

**Expected Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "jane.smith@example.com",
    "full_name": "Jane Smith",
    "app_metadata": {
      "role": "user"
    }
  }
}
```

**Note:** No tokens are returned. User must login separately.

### Login Endpoint
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.smith@example.com",
    "password": "SecurePass123"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Refresh Token
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "YOUR_REFRESH_TOKEN_HERE"
  }'
```

### Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "YOUR_REFRESH_TOKEN_HERE"
  }'
```

---

## Database Verification

After testing, verify the data in the database:

```sql
-- Check users table
SELECT id, email, full_name, created_at FROM users;

-- Check refresh tokens
SELECT user_id, token, expires_at FROM refresh_tokens;

-- Verify full_name column exists
\d users;
```

---

## Common Issues and Solutions

### Issue: "JWT_ACCESS_SECRET is not configured"
**Solution:** Make sure `.env` file has `JWT_ACCESS_SECRET` set

### Issue: Database connection error
**Solution:** Check `DATABASE_URL` in `.env` and ensure PostgreSQL is running

### Issue: CORS error in browser
**Solution:** Verify `CLIENT_ORIGIN` in `.env` matches frontend URL

### Issue: Tokens not persisting
**Solution:** Check browser's localStorage is not disabled; verify token storage in API calls

### Issue: "Email already in use" but user doesn't exist
**Solution:** Check if email normalization is working (lowercase, trimmed)

---

## Success Criteria

All tests should pass with the following outcomes:

- ✅ Users can sign up with full name, email, and password
- ✅ After signup, users are redirected to login page with pre-filled email
- ✅ Success message is displayed on login page after signup
- ✅ Users can log in with valid credentials
- ✅ After login, users are redirected to home page (`/`) with dashboards
- ✅ Invalid credentials are rejected with clear error messages
- ✅ Tokens are stored and used correctly
- ✅ Token refresh works automatically
- ✅ Protected routes require authentication
- ✅ Logout clears session properly
- ✅ Session persists across browser restarts
- ✅ Full name is stored and returned in all user objects

---

## Performance Checks

- Token refresh should be seamless (< 500ms)
- Login/signup should complete in < 2 seconds
- Protected route checks should be instant (from localStorage)
- No unnecessary API calls on page navigation

---

## Security Checklist

- ✅ Passwords are hashed (bcrypt with 10 rounds)
- ✅ JWTs have expiration times
- ✅ Refresh tokens are single-use (deleted after use)
- ✅ Authorization header uses Bearer scheme
- ✅ Email addresses are normalized (lowercase, trimmed)
- ✅ Invalid credentials use constant-time comparison
- ✅ Error messages don't leak information about user existence
