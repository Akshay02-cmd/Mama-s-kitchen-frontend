# Frontend-Backend Integration Complete

## ✅ Backend Setup

### 1. CORS Enabled
- Added `cors` package to backend
- Configured CORS in `app.js` to allow requests from `http://localhost:5173`
- Enabled credentials for cookie-based authentication

### 2. Database Indexes Fixed
- ✅ Removed obsolete `username_1` unique index from users collection
- ✅ Removed `unique: true` constraint from `ownerId` in Mess model
- ✅ Dropped `ownerId_1` unique index from messes collection

### 3. Backend Routes (Port 3000)
```
POST   /auth/register     - Register new user
POST   /auth/login        - User login
POST   /auth/logout       - User logout

GET    /menu              - Get all meals (requires auth)
GET    /menu/:mealid      - Get single meal (requires auth)
POST   /menu/:mealid      - Create meal (OWNER only)
PUT    /menu/:mealid      - Update meal (OWNER only)
DELETE /menu/:mealid      - Delete meal (OWNER only)

GET    /mess              - Get all messes (ADMIN only)
POST   /mess              - Create mess (OWNER only)
GET    /mess/:id          - Get single mess (requires auth)
PUT    /mess/:id          - Update mess (OWNER only)
DELETE /mess/:id          - Delete mess (OWNER only)

GET    /orders            - Get all orders
POST   /orders            - Create order
GET    /orders/:id        - Get single order
PUT    /orders/:id        - Update order
DELETE /orders/:id        - Delete order

GET    /reviews           - Get all reviews
POST   /reviews           - Create review
GET    /reviews/:id       - Get single review
PUT    /reviews/:id       - Update review
DELETE /reviews/:id       - Delete review

GET    /contacts          - Get all contacts
POST   /contacts          - Create contact
GET    /profile/customer  - Get customer profile
GET    /profile/owner     - Get owner profile
```

## ✅ Frontend Setup

### 1. Environment Configuration
- Created `.env` file with `VITE_API_BASE_URL=http://localhost:3000`

### 2. Authentication Context
- Created `AuthContext` for global auth state management
- Wrapped app with `AuthProvider` in `main.jsx`
- Provides: `user`, `loading`, `register()`, `login()`, `logout()`, `isAuthenticated`

### 3. Updated Pages
- ✅ **Login.jsx** - Now calls real API with error handling
- ✅ **Signup.jsx** - Now calls real API with error handling
- Both redirect based on user role after successful auth

### 4. API Client Configuration
- Already configured in `services/api/apiClient.js`
- Base URL: `http://localhost:3000` (from env)
- Includes JWT token in Authorization header
- Cookie-based auth with `withCredentials: true`
- Request/response interceptors for error handling

### 5. Service Files Ready
All service files are already configured to match backend routes:
- ✅ `auth.service.js` - `/auth/*`
- ✅ `meal.service.js` - `/menu/*`
- ✅ `mess.service.js` - `/mess/*`
- ✅ `order.service.js` - `/orders/*`
- ✅ `review.service.js` - `/reviews/*`
- ✅ `profile.service.js` - `/profile/*`
- ✅ `contact.service.js` - `/contacts/*`

## 🚀 How to Run

### Start Backend (Port 3000)
```bash
cd D:\Projects\Mama-s-kitchen-backend
npm start
```

### Start Frontend (Port 5173)
```bash
cd D:\Projects\Mama-s-kitchen-frontend
npm run dev
```

## 📝 Next Steps to Complete Integration

### 1. Update Home.jsx to Use Real API
Replace mock meals data with API call:
```javascript
import { getAllMeals } from '../services/meal.service';
// Use useEffect to fetch meals on mount
```

### 2. Update Other Pages
- MealDetailPage.jsx - Fetch meal by ID from API
- MealsListPage.jsx - Use API instead of mock data
- MessListPage.jsx - Fetch messes from API
- MessDetailPage.jsx - Fetch mess details from API
- MyOrdersPage.jsx - Fetch user orders from API
- OrderDetailPage.jsx - Fetch order details from API

### 3. Add Protected Routes
Create a ProtectedRoute component to require authentication for certain pages

### 4. Add Loading States
Add loading indicators while fetching data from API

### 5. Error Handling
Add proper error boundaries and user-friendly error messages

## 🔐 Authentication Flow

1. User registers/logs in through Login or Signup page
2. Backend returns JWT token (stored in httpOnly cookie)
3. Token also stored in localStorage for client-side checks
4. User data stored in AuthContext
5. All subsequent API calls include token automatically
6. Protected routes check authentication before rendering

## ⚠️ Important Notes

- Backend runs on port 3000
- Frontend runs on port 5173
- Make sure MongoDB is running before starting backend
- Check `.env` file exists in backend with proper MongoDB URL
- CORS is configured for localhost:5173 only

## 🐛 Known Issues to Fix

1. Some pages still use mock data - need to integrate with API
2. Add proper error boundaries for better error handling
3. Add loading skeletons for better UX
4. Implement proper authentication guards for protected routes
