# Project Structure

This document describes the role-based organization of the Mama's Kitchen frontend project.

## Directory Structure

```
src/
├── pages/
│   ├── customer/          # Customer-specific pages
│   │   ├── Home.jsx
│   │   ├── MealsListPage.jsx
│   │   ├── MealDetailPage.jsx
│   │   ├── MyOrdersPage.jsx
│   │   ├── OrderDetailPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── MessListPage.jsx
│   │   ├── MessDetailPage.jsx
│   │   ├── CustomerProfilePage.jsx
│   │   └── EditProfilePage.jsx
│   │
│   ├── owner/             # Owner-specific pages
│   │   ├── OwnerProfileCompletePage.jsx
│   │   ├── OwnerDashboard.jsx
│   │   └── CreateMessPage.jsx
│   │
│   ├── mess/              # Mess management pages
│   │   ├── MessOrdersDashboard.jsx
│   │   ├── CreateMealPage.jsx
│   │   └── MessProfilePage.jsx
│   │
│   └── shared/            # Shared/common pages
│       ├── Login.jsx
│       ├── Signup.jsx
│       └── Contact.jsx
│
├── components/
│   ├── customer/          # Customer-specific components
│   │   ├── MealCard.jsx
│   │   ├── MealDetailModal.jsx
│   │   ├── MealFilters.jsx
│   │   ├── MessCard.jsx
│   │   ├── MessInfo.jsx
│   │   ├── OrderCard.jsx
│   │   ├── OrderItem.jsx
│   │   ├── OrderSummary.jsx
│   │   ├── OrderTimeline.jsx
│   │   ├── PersonalInfo.jsx
│   │   ├── ProfileCard.jsx
│   │   ├── ProfileStats.jsx
│   │   ├── QuickActions.jsx
│   │   ├── FoodPreferences.jsx
│   │   └── index.js
│   │
│   ├── owner/             # Owner-specific components (future)
│   │
│   ├── mess/              # Mess-specific components (future)
│   │
│   └── shared/            # Shared/reusable components
│       ├── Header.jsx
│       ├── Footer.jsx
│       ├── Sidebar.jsx
│       ├── MessSidebar.jsx
│       ├── ErrorBoundary.jsx
│       ├── ProtectedRoute.jsx
│       ├── Breadcrumb.jsx
│       ├── Card.jsx
│       ├── PageHeader.jsx
│       ├── Pagination.jsx
│       ├── StatusBadge.jsx
│       ├── AuthLayout.jsx
│       ├── Button.jsx
│       ├── Divider.jsx
│       ├── FormInput.jsx
│       ├── SocialLoginButton.jsx
│       ├── ContactHeader.jsx
│       ├── ContactForm.jsx
│       ├── ContactInfo.jsx
│       └── index.js
│
├── hooks/                 # Custom React hooks
│   ├── shared/           # Shared hooks (all roles)
│   │   ├── useAuth.js
│   │   ├── useTheme.js
│   │   ├── useForm.js
│   │   ├── useLocalStorage.js
│   │   ├── useDebounce.js
│   │   ├── useAsync.js
│   │   ├── useMediaQuery.js
│   │   └── index.js
│   ├── customer/         # Customer-specific hooks
│   │   ├── useMeals.js
│   │   ├── useCart.js
│   │   ├── useProfile.js
│   │   ├── useOrders.js
│   │   └── index.js
│   ├── owner/            # Owner-specific hooks
│   │   ├── useOwnerDashboard.js
│   │   ├── useMessForm.js
│   │   └── index.js
│   ├── mess/             # Mess-specific hooks
│   │   ├── useMessOrders.js
│   │   ├── useMealForm.js
│   │   └── index.js
│   ├── index.js          # Central export for all hooks
│   └── README.md         # Hooks documentation
│
├── context/               # React Context providers
│   ├── AuthContext.jsx    # Authentication context
│   ├── ThemeContext.jsx   # Theme context (light mode)
│   └── index.js           # Central export for contexts
│
├── services/              # API service modules
│   ├── api/
│   ├── auth.service.js
│   ├── contact.service.js
│   ├── meal.service.js
│   ├── mess.service.js
│   ├── order.service.js
│   ├── profile.service.js
│   ├── review.service.js
│   ├── user.service.js
│   └── index.js
│
├── routes/                # Route configuration files
│   ├── CustomerRoutes.jsx # Customer-facing routes
│   ├── OwnerRoutes.jsx    # Owner management routes
│   ├── MessRoutes.jsx     # Mess management routes
│   ├── SharedRoutes.jsx   # Shared/authentication routes
│   ├── index.js           # Central export for all routes
│   └── README.md          # Routes documentation
│
└── utils/                 # Utility functions
    └── logger.js
```

## Import Path Conventions

### Pages

**Customer Pages:**
```javascript
// From customer pages (pages/customer/)
import Component from '../../components/customer/Component';
import Shared from '../../components/shared/Shared';
import { useAuth } from '../../hooks/useAuth';
import { service } from '../../services/service.service';
```

**Owner Pages:**
```javascript
// From owner pages (pages/owner/)
import Component from '../../components/owner/Component';
import Shared from '../../components/shared/Shared';
import { useAuth } from '../../hooks/useAuth';
```

**Mess Pages:**
```javascript
// From mess pages (pages/mess/)
import Component from '../../components/mess/Component';
import Shared from '../../components/shared/Shared';
import { useAuth } from '../../hooks/useAuth';
```

**Shared Pages:**
```javascript
// From shared pages (pages/shared/)
import Shared from '../../components/shared/Shared';
import { useAuth } from '../../hooks/useAuth';
```

### Components

**From App.jsx:**
```javascript
// Customer pages
import Home from './pages/customer/Home.jsx';

// Owner pages
import OwnerDashboard from './pages/owner/OwnerDashboard.jsx';

// Mess pages
import MessOrdersDashboard from './pages/mess/MessOrdersDashboard.jsx';

// Shared pages
import Login from './pages/shared/Login.jsx';

// Shared components
import Header from './components/shared/Header.jsx';
```

## Role-Based Access

### Customer Routes
- `/` - Home page
- `/meals` - Meals listing
- `/meals/:id` - Meal details
- `/mess` - Mess listing
- `/mess/:id` - Mess details
- `/orders` - My orders
- `/orders/:id` - Order details
- `/checkout` - Checkout
- `/profile` - Customer profile
- `/profile/edit` - Edit profile

### Owner Routes (Protected: `requireRole="OWNER"`)
- `/owner/complete-profile` - Complete owner profile
- `/owner/dashboard` - Owner dashboard
- `/owner/create-mess` - Create new mess

### Mess Routes (Protected: `requireRole="MESS"`)
- `/mess/dashboard` - Mess orders dashboard
- `/mess/create-meal` - Create new meal
- `/mess/profile` - Mess profile

### Shared Routes
- `/login` - Login page
- `/signup` - Signup page
- `/contact` - Contact page

## Benefits of This Structure

1. **Clear Separation of Concerns**: Each role has its own folder, making it easy to find and maintain code
2. **Scalability**: Easy to add new pages/components for specific roles
3. **Code Reusability**: Shared components are in a dedicated folder
4. **Better Collaboration**: Team members can work on different roles without conflicts
5. **Easier Testing**: Role-based testing is more straightforward
6. **Improved Navigation**: Developers can quickly locate files based on role

## Future Enhancements

- ~~Create route configuration files in `src/routes/`~~ ✅ **COMPLETED**
- ~~Organize hooks by role~~ ✅ **COMPLETED**
- Add role-specific utilities in `src/utils/customer/`, `src/utils/owner/`, etc.

## Notes

- All paths use **relative imports** from their location
- Customer components are imported from `../../components/customer/`
- Shared components are imported from `../../components/shared/`
- Services and hooks maintain their current structure
- The `index.js` files in component folders enable named exports
- **Routes are now organized by role** in `src/routes/` folder
- **Context providers are shared globally** via `src/context/index.js`
- **Hooks are organized by role** in `src/hooks/` folder with 15+ custom hooks
