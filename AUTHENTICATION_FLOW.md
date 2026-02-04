# Authentication Flow Documentation

## Overview
This document describes the authentication and authorization flow implemented in Mama's Kitchen frontend application.

## Flow Description

### 1. Initial Visit
When a user visits the website:
- The app checks for existing authentication token in localStorage
- If token exists, user data is loaded from localStorage
- AuthContext fetches the user's profile to check completion status
- Based on authentication state, different navigation options are shown in the Header

### 2. Authentication States

#### Unauthenticated User
- Can access: Home (`/`), About (`/about`), Meals listing (`/home`)
- **Cannot access**: Contact, Meal details, Orders, Profile, Checkout
- Header shows: "Order Now" button and Login option
- Attempting to access protected routes redirects to `/login`

#### Authenticated User (Without Complete Profile)
- Can access: All public pages + Contact, Meals, Mess listings
- **Cannot access**: Orders, Checkout (requires complete profile)
- If trying to access profile-required pages → redirected to `/profile/edit`
- Must complete profile with:
  - Valid phone number (10 digits, starting with 6-9)
  - Address (10-300 characters)

#### Authenticated User (With Complete Profile)
- Can access: **All pages** in the application
- Header shows: "My Orders" button, Profile picture, Logout button
- Full access to:
  - Browse meals and messes
  - View meal details and reviews
  - Place orders and checkout
  - View order history
  - Contact support
  - Manage profile

### 3. Route Protection

#### Public Routes (No Authentication Required)
- `/` - About page
- `/home` - Meals listing (browse)
- `/about` - About page
- `/login` - Login page
- `/signup` - Signup page

#### Protected Routes (Authentication Required)
- `/contact` - Contact page
- `/meals` - Meals listing (with ordering)
- `/meals/:id` - Meal detail page
- `/mess` - Mess listing
- `/mess/:id` - Mess detail page
- `/profile` - User profile
- `/profile/edit` - Edit profile

#### Profile-Complete Routes (Authentication + Complete Profile Required)
- `/orders` - Order history
- `/orders/:id` - Order details
- `/checkout` - Checkout page

### 4. Login Flow

```
User visits protected page
  ↓
Not authenticated?
  ↓
Redirect to /login (stores attempted URL)
  ↓
User enters credentials
  ↓
Login successful
  ↓
AuthContext checks profile completion
  ↓
Profile incomplete?
  ↓
Redirect to /profile/edit with completion warning
  ↓
User completes profile
  ↓
Redirect to originally attempted page
```

### 5. Profile Completion Check

**For CUSTOMER role:**
```javascript
- Fetches customer profile via GET /profile/customer
- Checks if phone and address exist
- Sets profileComplete state
```

**For OWNER role:**
```javascript
- Fetches owner profile via GET /profile/owner
- Checks if phone and address exist
- Sets profileComplete state
```

### 6. Components

#### ProtectedRoute Component
- Location: `src/components/auth/ProtectedRoute.jsx`
- Props:
  - `children` - Component to render if authorized
  - `requireProfileComplete` - Boolean flag for profile requirement
- Behavior:
  - Shows loading state while checking authentication
  - Redirects to login if not authenticated (saves attempted URL)
  - Redirects to profile edit if profile incomplete (when required)
  - Renders children if all conditions met

#### AuthContext
- Location: `src/context/AuthContext.jsx`
- State:
  - `user` - Current user object
  - `loading` - Authentication loading state
  - `profileComplete` - Profile completion status
  - `checkingProfile` - Profile check loading state
- Methods:
  - `register(userData)` - Register new user
  - `login(credentials)` - Login user
  - `logout()` - Logout user
  - `updateProfileStatus(isComplete)` - Update profile completion status
- Auto-checks profile on user state change

### 7. Header Navigation

**Unauthenticated:**
- About, Meals (public browsing)
- "Order Now" button → redirects to meals
- Login/Signup option

**Authenticated:**
- About, Meals, Contact
- "My Orders" button → order history
- Profile picture → profile page
- Logout button

### 8. API Integration

**Profile Endpoints:**
- `GET /profile/customer` - Get customer profile
- `POST /profile/customer` - Create customer profile
- `PUT /profile/customer` - Update customer profile
- `GET /profile/owner` - Get owner profile
- `POST /profile/owner` - Create owner profile
- `PUT /profile/owner` - Update owner profile

**Validation:**
- Phone: 10-digit Indian mobile (starts with 6-9)
- Address: 10-300 characters

### 9. User Experience Flow

#### New User Journey
1. Visit website → See public content (About, Meals preview)
2. Click "Order Now" or try to view meal details
3. Redirected to Login page
4. Click "Sign Up"
5. Register with email, password, name, role
6. Auto-login after registration
7. Redirected to profile completion page
8. Enter phone and address
9. Profile saved, redirected to originally intended page
10. Now has full access to order meals

#### Returning User Journey
1. Visit website
2. Click Login
3. Enter credentials
4. If profile complete → Access all features
5. If profile incomplete → Complete profile first
6. Browse meals, place orders, view order history

## Security Features

1. **Token-based Authentication**: JWT stored in cookies + localStorage
2. **Route Protection**: Unauthorized access attempts redirected
3. **Profile Validation**: Backend validates all profile data
4. **Role-based Access**: Different features for CUSTOMER vs OWNER
5. **Automatic Token Refresh**: Axios interceptors handle token refresh

## Testing Checklist

- [ ] Unauthenticated user cannot access protected routes
- [ ] Login redirects back to attempted page
- [ ] Profile incomplete redirects to edit page
- [ ] Profile completion unlocks all features
- [ ] Logout clears authentication state
- [ ] Header updates based on auth state
- [ ] Page refresh maintains authentication
- [ ] Token expiry handled gracefully
