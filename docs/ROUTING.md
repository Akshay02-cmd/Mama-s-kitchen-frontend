# Routing Documentation

## Overview

The frontend uses **React Router v7.11** for client-side routing. Routes are organized by user role and functionality to maintain clear separation of concerns.

## Route Structure

```
/                           → Home (Public/Customer)
/login                      → Login (Public)
/signup                     → Signup (Public)
/contact                    → Contact (Protected)

/meals                      → Meals List (Protected)
/meals/:id                  → Meal Detail (Protected)
/mess                       → Mess List (Protected)
/mess/:id                   → Mess Detail (Protected)

/orders                     → My Orders (Protected, Profile Required)
/orders/:id                 → Order Detail (Protected, Profile Required)
/checkout                   → Checkout (Protected, Profile Required)

/profile                    → Customer Profile (Protected)
/profile/edit               → Edit Profile (Protected)

/owner/dashboard            → Owner Dashboard (Protected, Owner Role)
/owner/complete-profile     → Complete Owner Profile (Protected, Owner Role)
/owner/create-mess          → Create Mess (Protected, Owner Role)

*                           → 404 Not Found
```

## Route Organization

Routes are split into four main configuration files:

### 1. SharedRoutes.jsx

**Purpose**: Routes accessible to all users

**File Location**: `src/routes/SharedRoutes.jsx`

**Routes**:
- `/login` - Login page (public)
- `/signup` - Registration page (public)
- `/contact` - Contact support (protected, any role)

**Code Structure**:
```jsx
const SharedRoutes = () => {
  return (
    <>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Protected routes */}
      <Route 
        path="/contact" 
        element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        } 
      />
    </>
  );
};
```

---

### 2. CustomerRoutes.jsx

**Purpose**: Routes for customer users

**File Location**: `src/routes/CustomerRoutes.jsx`

**Public Routes**:
- `/` - Home page
- `/home` - Home page (alias)

**Protected Routes** (require authentication):
- `/meals` - Browse all meals
- `/meals/:id` - View meal details
- `/mess` - Browse all messes
- `/mess/:id` - View mess details
- `/profile` - Customer profile
- `/profile/edit` - Edit profile

**Profile-Required Routes** (require complete profile):
- `/orders` - Order history
- `/orders/:id` - Order details
- `/checkout` - Place order

**Code Example**:
```jsx
{/* Profile-required route */}
<Route 
  path="/checkout" 
  element={
    <ProtectedRoute requireProfileComplete={true}>
      <CheckoutPage />
    </ProtectedRoute>
  } 
/>
```

---

### 3. OwnerRoutes.jsx

**Purpose**: Routes for mess owners

**File Location**: `src/routes/OwnerRoutes.jsx`

**All Routes** (require OWNER role):
- `/owner/complete-profile` - Complete business profile
- `/owner/dashboard` - Owner dashboard
- `/owner/create-mess` - Create new mess

**Code Example**:
```jsx
<Route 
  path="/owner/dashboard" 
  element={
    <ProtectedRoute requireRole="OWNER">
      <OwnerDashboard />
    </ProtectedRoute>
  } 
/>
```

---

### 4. MessRoutes.jsx

**Purpose**: Routes for mess management (future)

**File Location**: `src/routes/MessRoutes.jsx`

**Planned Routes**:
- `/mess/manage/:id` - Manage specific mess
- `/mess/:messId/meals` - Manage mess meals
- `/mess/:messId/orders` - View mess orders
- `/mess/:messId/reviews` - View mess reviews

---

## Protection Levels

### 1. Public Routes

No authentication required. Anyone can access.

```jsx
<Route path="/login" element={<Login />} />
```

**Examples**:
- `/login`
- `/signup`
- `/` (home page)

---

### 2. Protected Routes

Requires user to be logged in (any role).

```jsx
<Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <CustomerProfilePage />
    </ProtectedRoute>
  } 
/>
```

**Examples**:
- `/meals`
- `/mess`
- `/profile`
- `/contact`

---

### 3. Role-Based Routes

Requires specific user role.

```jsx
<Route 
  path="/owner/dashboard" 
  element={
    <ProtectedRoute requireRole="OWNER">
      <OwnerDashboard />
    </ProtectedRoute>
  } 
/>
```

**Owner-Only Routes**:
- `/owner/*`

**Customer-Only Routes**:
- `/orders` (implicitly customer-only as owners don't place orders)
- `/checkout`

---

### 4. Profile-Complete Routes

Requires user to have completed their profile.

```jsx
<Route 
  path="/checkout" 
  element={
    <ProtectedRoute requireProfileComplete={true}>
      <CheckoutPage />
    </ProtectedRoute>
  } 
/>
```

**Examples**:
- `/checkout`
- `/orders`
- `/orders/:id`

**Reason**: These features require user's address and contact information.

---

## ProtectedRoute Component

**File**: `src/components/shared/ProtectedRoute.jsx`

**Props**:
- `children` - Component to render if authorized
- `requireRole` - Required user role (optional)
- `requireProfileComplete` - Whether profile must be complete (optional)

**Logic**:

```jsx
const ProtectedRoute = ({ 
  children, 
  requireRole, 
  requireProfileComplete 
}) => {
  const { user, profileComplete, checkProfileCompletion } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Not logged in
    if (!user) {
      navigate('/login');
      return;
    }

    // Wrong role
    if (requireRole && user.role !== requireRole) {
      navigate('/');
      return;
    }

    // Profile incomplete
    if (requireProfileComplete) {
      checkProfileCompletion().then(isComplete => {
        if (!isComplete) {
          navigate('/profile/edit');
        }
      });
    }
  }, [user, requireRole, requireProfileComplete]);

  return user ? children : null;
};
```

**Flow**:
1. Check if user is logged in
   - If not → redirect to `/login`
2. Check if user has required role
   - If not → redirect to `/` (home)
3. Check if profile is complete (if required)
   - If not → redirect to `/profile/edit`
4. If all checks pass → render children

---

## Route Parameters

### Dynamic Segments

```jsx
<Route path="/meals/:id" element={<MealDetailPage />} />
```

**Access in Component**:
```jsx
import { useParams } from 'react-router-dom';

const MealDetailPage = () => {
  const { id } = useParams();
  // Use id to fetch meal data
};
```

**Examples**:
- `/meals/abc123` → `id = "abc123"`
- `/orders/xyz789` → `id = "xyz789"`
- `/mess/def456` → `id = "def456"`

---

## Query Parameters

**Not currently used but supported**

**Example Usage**:
```jsx
// URL: /meals?type=lunch&veg=true

import { useSearchParams } from 'react-router-dom';

const MealsPage = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');   // "lunch"
  const veg = searchParams.get('veg');     // "true"
};
```

**Planned Use**:
- `/meals?search=paneer` - Search meals
- `/mess?area=nashik` - Filter by area
- `/orders?status=delivered` - Filter orders

---

## Navigation

### Programmatic Navigation

```jsx
import { useNavigate } from 'react-router-dom';

const Component = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/meals');
  };

  const goBack = () => {
    navigate(-1);
  };

  const replaceHistory = () => {
    navigate('/home', { replace: true });
  };
};
```

### Link Navigation

```jsx
import { Link } from 'react-router-dom';

<Link to="/meals">View Meals</Link>
<Link to={`/meals/${meal._id}`}>View Details</Link>
```

### NavLink (Active State)

```jsx
import { NavLink } from 'react-router-dom';

<NavLink 
  to="/meals"
  className={({ isActive }) => 
    isActive ? 'active-link' : 'link'
  }
>
  Meals
</NavLink>
```

---

## Redirect Patterns

### After Login

```jsx
// Store intended destination before redirect to login
localStorage.setItem('redirectAfterLogin', location.pathname);

// After successful login
const redirect = localStorage.getItem('redirectAfterLogin') || '/';
localStorage.removeItem('redirectAfterLogin');
navigate(redirect);
```

### After Registration

```jsx
// Customer → Home
if (user.role === 'CUSTOMER') {
  navigate('/');
}

// Owner → Complete Profile
if (user.role === 'OWNER') {
  navigate('/owner/complete-profile');
}
```

### After Logout

```jsx
navigate('/');  // Always redirect to home
```

---

## Route Guards

### Authentication Guard

Implemented in `ProtectedRoute` component.

**Check**: Is user logged in?  
**Redirect**: `/login` if not

### Authorization Guard

**Check**: Does user have required role?  
**Redirect**: `/` (home) if not

### Profile Completeness Guard

**Check**: Has user completed their profile?  
**Redirect**: `/profile/edit` if not

---

## 404 Handling

**Fallback Route**:
```jsx
<Route path="*" element={<NotFound />} />
```

**Component**: Renders custom 404 page

**Displayed When**:
- Invalid URL paths
- Deleted resources
- Unauthorized access attempts

---

## Nested Routes (Future)

**Planned Structure**:
```jsx
<Route path="/owner" element={<OwnerLayout />}>
  <Route index element={<OwnerDashboard />} />
  <Route path="mess/:id" element={<MessManagement />}>
    <Route path="meals" element={<MealManagement />} />
    <Route path="orders" element={<OrderManagement />} />
  </Route>
</Route>
```

---

## Route Loading States

**Current**: No loading indicators

**Planned**:
```jsx
import { lazy, Suspense } from 'react';

const MealsPage = lazy(() => import('./pages/customer/MealsListPage'));

<Suspense fallback={<LoadingSpinner />}>
  <Route path="/meals" element={<MealsPage />} />
</Suspense>
```

---

## Route Transitions (Planned)

Using Framer Motion or React Transition Group:

```jsx
<AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
    {/* routes */}
  </Routes>
</AnimatePresence>
```

---

## Error Boundaries

Wrapped around route components:

```jsx
<ErrorBoundary>
  <Routes>
    {/* routes */}
  </Routes>
</ErrorBoundary>
```

**Catches**:
- Component render errors
- Page crash errors
- Data loading errors

---

## Best Practices

1. **Lazy Loading**: Implement code splitting for better performance
2. **Layout Routes**: Use layout routes for common page structures
3. **Error Handling**: Wrap routes in error boundaries
4. **Type Safety**: Add route type definitions (TypeScript planned)
5. **SEO**: Add meta tags for each route (future)
6. **Analytics**: Track page views on route change (planned)
7. **Breadcrumbs**: Show current location in navigation (planned)

---

## Route Configuration

All routes exported from `src/routes/index.js`:

```javascript
export { default as CustomerRoutes } from './CustomerRoutes';
export { default as OwnerRoutes } from './OwnerRoutes';
export { default as MessRoutes } from './MessRoutes';
export { default as SharedRoutes } from './SharedRoutes';
```

**Imported in App.jsx**:
```jsx
import { 
  CustomerRoutes, 
  OwnerRoutes, 
  MessRoutes, 
  SharedRoutes 
} from "./routes";
```

---

## Testing Routes

**Unit Tests (Planned)**:
```jsx
describe('ProtectedRoute', () => {
  it('redirects to login when not authenticated', () => {
    // test implementation
  });

  it('redirects home when wrong role', () => {
    // test implementation
  });
});
```

**E2E Tests (Planned)**:
```javascript
describe('Customer Navigation', () => {
  it('can browse meals and view details', () => {
    cy.visit('/meals');
    cy.get('.meal-card').first().click();
    cy.url().should('include', '/meals/');
  });
});
```

---

## Future Enhancements

1. **Route Prefetching**: Preload data for better UX
2. **Route Transitions**: Smooth page transitions
3. **Scroll Restoration**: Remember scroll position
4. **Route-based Code Splitting**: Automatic lazy loading
5. **Meta Tags**: Dynamic meta tags per route
6. **Breadcrumbs**: Navigation breadcrumb trail
7. **Route Aliases**: Multiple paths to same component
8. **Route Middleware**: Additional route guards

---

**Last Updated**: February 9, 2026
