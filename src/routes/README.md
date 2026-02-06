# Routes Documentation

This folder contains all route configurations organized by user role.

## Structure

```
routes/
├── index.js              # Central export for all routes
├── CustomerRoutes.jsx    # Customer-facing routes
├── OwnerRoutes.jsx       # Owner management routes
├── MessRoutes.jsx        # Mess management routes
└── SharedRoutes.jsx      # Shared/common routes
```

## Route Files

### CustomerRoutes.jsx
**Purpose**: Routes accessible to authenticated customers

**Routes**:
- `/` - Home page (public)
- `/home` - Home page (public)
- `/meals` - Meals listing (protected)
- `/meals/:id` - Meal detail page (protected)
- `/orders` - Customer orders (protected, requires complete profile)
- `/orders/:id` - Order detail page (protected, requires complete profile)
- `/checkout` - Checkout page (protected, requires complete profile)
- `/mess` - Mess listing (protected)
- `/mess/:id` - Mess detail page (protected)
- `/profile` - Customer profile (protected)
- `/profile/edit` - Edit customer profile (protected)

**Protection Levels**:
- Public: Accessible without authentication
- Protected: Requires authentication (`<ProtectedRoute>`)
- Complete Profile: Requires authentication + complete profile (`requireProfileComplete={true}`)

### OwnerRoutes.jsx
**Purpose**: Routes for owner management functionality

**Routes**:
- `/owner/complete-profile` - Complete owner profile after signup
- `/owner/dashboard` - Owner dashboard (main landing page)
- `/owner/create-mess` - Create new mess form

**Protection**: All routes require `OWNER` role authentication

### MessRoutes.jsx
**Purpose**: Routes for mess management functionality

**Routes**:
- `/mess/dashboard` - Mess orders dashboard
- `/mess/orders` - Alternative route to dashboard
- `/mess/create-meal` - Create new meal form
- `/mess/profile` - View/edit mess profile

**Protection**: Currently requires authentication (TODO: Add `MESS` role requirement)

### SharedRoutes.jsx
**Purpose**: Routes shared across all user roles

**Routes**:
- `/login` - Login page (public)
- `/signup` - Signup page (public)
- `/contact` - Contact page (protected)

## Usage

### In App.jsx
```javascript
import { Routes, Route } from "react-router-dom";
import { CustomerRoutes, OwnerRoutes, MessRoutes, SharedRoutes } from "./routes";

const App = () => {
  return (
    <Routes>
      {/* Shared Routes - Authentication and common pages */}
      <SharedRoutes />

      {/* Customer Routes - Customer-facing functionality */}
      <CustomerRoutes />

      {/* Owner Routes - Owner management functionality */}
      <OwnerRoutes />

      {/* Mess Routes - Mess management functionality */}
      <MessRoutes />

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
```

### Adding New Routes

#### Add a Customer Route
1. Open `CustomerRoutes.jsx`
2. Import the page component
3. Add the route in the appropriate section
4. Apply proper protection level

Example:
```javascript
import NewPage from "../pages/customer/NewPage.jsx";

// In the component
<Route 
  path="/new-page" 
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  } 
/>
```

#### Add an Owner Route
1. Open `OwnerRoutes.jsx`
2. Import the page component
3. Add route with `requireRole="OWNER"`

Example:
```javascript
import NewOwnerPage from "../pages/owner/NewOwnerPage.jsx";

<Route 
  path="/owner/new-feature" 
  element={
    <ProtectedRoute requireRole="OWNER">
      <NewOwnerPage />
    </ProtectedRoute>
  } 
/>
```

## Protected Route Props

The `ProtectedRoute` component accepts these props:

- **No props**: Requires authentication only
  ```jsx
  <ProtectedRoute><Component /></ProtectedRoute>
  ```

- **requireRole**: Requires specific role (OWNER, CUSTOMER, MESS)
  ```jsx
  <ProtectedRoute requireRole="OWNER"><Component /></ProtectedRoute>
  ```

- **requireProfileComplete**: Requires completed user profile
  ```jsx
  <ProtectedRoute requireProfileComplete={true}><Component /></ProtectedRoute>
  ```

## Route Organization Principles

1. **Separation by Role**: Each role has its own route file
2. **Clear Naming**: Routes clearly indicate their purpose
3. **Consistent Protection**: Similar routes have similar protection levels
4. **Documentation**: Each route file includes comments explaining purpose
5. **Maintainability**: Easy to find and update routes by role

## Navigation Flow

### Customer Flow
```
Login/Signup → Home → Browse Meals/Messes → Checkout → Orders → Profile
```

### Owner Flow
```
Signup (as OWNER) → Complete Profile → Dashboard → Create Mess
```

### Mess Flow
```
Login (as MESS) → Dashboard → View Orders → Create Meal → Profile
```

## Best Practices

1. **Always use ProtectedRoute**: Don't expose sensitive pages without authentication
2. **Role-based Access**: Use `requireRole` for role-specific pages
3. **Profile Completion**: Use `requireProfileComplete` for features needing user data
4. **Consistent Paths**: Use `/role/feature` pattern (e.g., `/owner/dashboard`)
5. **Comments**: Add comments explaining route purpose and protection level

## Future Enhancements

- [ ] Add MESS role authentication in MessRoutes
- [ ] Implement route-based analytics
- [ ] Add route transition animations
- [ ] Create route guards for additional business logic
- [ ] Add breadcrumb generation from routes
