# Migration Guide - Role-Based Structure

This guide documents the migration from the old flat structure to the new role-based organization.

## What Changed

### Pages Organization

**Before:**
```
src/pages/
  ├── Home.jsx
  ├── Login.jsx
  ├── Signup.jsx
  ├── Contact.jsx
  ├── MealsListPage.jsx
  ├── MealDetailPage.jsx
  ├── ... (all pages mixed together)
```

**After:**
```
src/pages/
  ├── customer/
  │   ├── Home.jsx
  │   ├── MealsListPage.jsx
  │   └── ... (10 customer pages)
  ├── owner/
  │   ├── OwnerDashboard.jsx
  │   └── ... (3 owner pages)
  ├── mess/
  │   ├── MessOrdersDashboard.jsx
  │   └── ... (3 mess pages)
  └── shared/
      ├── Login.jsx
      ├── Signup.jsx
      └── Contact.jsx
```

### Components Organization

**Before:**
```
src/components/
  ├── auth/
  ├── common/
  ├── meals/
  ├── mess/
  ├── orders/
  ├── profile/
  └── contact/
```

**After:**
```
src/components/
  ├── customer/      # All customer-related components
  ├── owner/         # Owner-specific components
  ├── mess/          # Mess-specific components
  └── shared/        # Shared/reusable components
```

## Import Path Changes

### Example 1: Customer Pages

**Old Import (from pages/Home.jsx):**
```javascript
import MealCard from '../components/meals/MealCard';
import Sidebar from '../components/common/Sidebar';
import { getAllMeals } from '../services/meal.service';
```

**New Import (from pages/customer/Home.jsx):**
```javascript
import MealCard from '../../components/customer/MealCard';
import Sidebar from '../../components/shared/Sidebar';
import { getAllMeals } from '../../services/meal.service';
```

### Example 2: Owner Pages

**Old Import (from pages/OwnerDashboard.jsx):**
```javascript
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../hooks/useAuth';
```

**New Import (from pages/owner/OwnerDashboard.jsx):**
```javascript
import Sidebar from '../../components/shared/Sidebar';
import { useAuth } from '../../hooks/useAuth';
```

### Example 3: Shared Pages

**Old Import (from pages/Login.jsx):**
```javascript
import AuthLayout from '../components/auth/AuthLayout';
import FormInput from '../components/auth/FormInput';
```

**New Import (from pages/shared/Login.jsx):**
```javascript
import AuthLayout from '../../components/shared/AuthLayout';
import FormInput from '../../components/shared/FormInput';
```

### Example 4: App.jsx

**Old Import:**
```javascript
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Header from './components/common/Header.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
```

**New Import:**
```javascript
import Home from './pages/customer/Home.jsx';
import Login from './pages/shared/Login.jsx';
import Header from './components/shared/Header.jsx';
import ProtectedRoute from './components/shared/ProtectedRoute.jsx';
```

## Component Mapping

### Components Moved to `customer/`
- MealCard.jsx (from `meals/`)
- MealDetailModal.jsx (from `meals/`)
- MealFilters.jsx (from `meals/`)
- MessCard.jsx (from `mess/`)
- MessInfo.jsx (from `mess/`)
- OrderCard.jsx (from `orders/`)
- OrderItem.jsx (from `orders/`)
- OrderSummary.jsx (from `orders/`)
- OrderTimeline.jsx (from `orders/`)
- PersonalInfo.jsx (from `profile/`)
- ProfileCard.jsx (from `profile/`)
- ProfileStats.jsx (from `profile/`)
- QuickActions.jsx (from `profile/`)
- FoodPreferences.jsx (from `profile/`)

### Components Moved to `shared/`
- Header.jsx (from `common/`)
- Footer.jsx (from `common/`)
- Sidebar.jsx (from `common/`)
- MessSidebar.jsx (from `common/`)
- ErrorBoundary.jsx (from `common/`)
- Breadcrumb.jsx (from `common/`)
- Card.jsx (from `common/`)
- PageHeader.jsx (from `common/`)
- Pagination.jsx (from `common/`)
- StatusBadge.jsx (from `common/`)
- AuthLayout.jsx (from `auth/`)
- Button.jsx (from `auth/`)
- Divider.jsx (from `auth/`)
- FormInput.jsx (from `auth/`)
- ProtectedRoute.jsx (from `auth/`)
- SocialLoginButton.jsx (from `auth/`)
- ContactHeader.jsx (from `contact/`)
- ContactForm.jsx (from `contact/`)
- ContactInfo.jsx (from `contact/`)

## Files Updated

### All Customer Pages (10 files)
- ✅ Home.jsx
- ✅ MealsListPage.jsx
- ✅ MealDetailPage.jsx
- ✅ MyOrdersPage.jsx
- ✅ OrderDetailPage.jsx
- ✅ CheckoutPage.jsx
- ✅ MessListPage.jsx
- ✅ MessDetailPage.jsx
- ✅ CustomerProfilePage.jsx
- ✅ EditProfilePage.jsx

### All Owner Pages (3 files)
- ✅ OwnerProfileCompletePage.jsx
- ✅ OwnerDashboard.jsx
- ✅ CreateMessPage.jsx

### All Mess Pages (3 files)
- ✅ MessOrdersDashboard.jsx
- ✅ CreateMealPage.jsx
- ✅ MessProfilePage.jsx

### All Shared Pages (3 files)
- ✅ Login.jsx
- ✅ Signup.jsx
- ✅ Contact.jsx

### Main App Files
- ✅ App.jsx

## Verification Checklist

- [x] All pages moved to role-based folders
- [x] All components organized by role
- [x] All imports updated in pages
- [x] All imports updated in App.jsx
- [x] Development server runs without errors
- [x] No compilation errors
- [x] All routes still work

## Quick Reference

### Import Depth by Location

| Current File Location | Import Pattern |
|----------------------|----------------|
| `pages/customer/*` | `../../components/`, `../../services/`, `../../hooks/` |
| `pages/owner/*` | `../../components/`, `../../services/`, `../../hooks/` |
| `pages/mess/*` | `../../components/`, `../../services/`, `../../hooks/` |
| `pages/shared/*` | `../../components/`, `../../services/`, `../../hooks/` |
| `App.jsx` | `./pages/`, `./components/` |

## Notes for Future Development

1. **Adding New Customer Page:**
   - Create file in `src/pages/customer/`
   - Import components from `../../components/customer/` or `../../components/shared/`
   - Import services from `../../services/`
   - Import hooks from `../../hooks/`

2. **Adding New Owner Component:**
   - Create file in `src/components/owner/`
   - Export from `src/components/owner/index.js` if needed
   - Import in owner pages as `../../components/owner/ComponentName`

3. **Adding New Shared Component:**
   - Create file in `src/components/shared/`
   - Can be used by any role
   - Import as `../../components/shared/ComponentName` from pages

## Rollback Instructions

If you need to rollback (not recommended):
1. Move all files back to their original locations
2. Restore old import paths in all files
3. Delete the role-based folders

However, the new structure is significantly better for maintainability and scalability.
