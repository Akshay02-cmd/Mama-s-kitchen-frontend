# 🚀 Quick Reference Card

## Project Organization Cheat Sheet

### 📁 Where to Put New Files

| What You're Adding | Location | Example |
|-------------------|----------|---------|
| Customer page | `src/pages/customer/` | `ProductsPage.jsx` |
| Owner page | `src/pages/owner/` | `AnalyticsPage.jsx` |
| Mess page | `src/pages/mess/` | `MenuPage.jsx` |
| Shared page | `src/pages/shared/` | `AboutPage.jsx` |
| Customer component | `src/components/customer/` | `ProductCard.jsx` |
| Owner component | `src/components/owner/` | `StatsWidget.jsx` |
| Mess component | `src/components/mess/` | `MenuBuilder.jsx` |
| Shared component | `src/components/shared/` | `Modal.jsx` |
| Route config | `src/routes/[Role]Routes.jsx` | Add to existing file |
| Context provider | `src/context/` | `CartContext.jsx` |
| Custom hook | `src/hooks/` | `useCart.js` |
| API service | `src/services/` | `product.service.js` |
| Utility function | `src/utils/` | `formatters.js` |

---

## 🎯 Import Patterns

### From Pages (2 levels up: `../../`)
```javascript
// ✅ Correct
import Component from '../../components/customer/Component';
import { service } from '../../services/service.service';
import { useHook } from '../../hooks/useHook';

// ❌ Wrong
import Component from '../components/customer/Component';
```

### From App.jsx (1 level down: `./`)
```javascript
// ✅ Correct
import { CustomerRoutes } from './routes';
import Header from './components/shared/Header.jsx';

// ❌ Wrong
import CustomerRoutes from './routes/CustomerRoutes.jsx';
```

### From Components (varies)
```javascript
// Shared component importing another shared component
import Card from './Card.jsx';

// Customer component importing shared component
import Card from '../shared/Card.jsx';
```

---

## 🛣️ Adding New Routes

### Customer Route
```javascript
// File: src/routes/CustomerRoutes.jsx
import NewPage from "../pages/customer/NewPage.jsx";

<Route 
  path="/new-page" 
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  } 
/>
```

### Owner Route (Role-Protected)
```javascript
// File: src/routes/OwnerRoutes.jsx
<Route 
  path="/owner/new-feature" 
  element={
    <ProtectedRoute requireRole="OWNER">
      <NewPage />
    </ProtectedRoute>
  } 
/>
```

### Public Route
```javascript
// File: src/routes/SharedRoutes.jsx
<Route path="/about" element={<AboutPage />} />
```

---

## 🔐 Protection Levels

```javascript
// Public - No authentication
<Route path="/about" element={<About />} />

// Protected - Authentication required
<ProtectedRoute>
  <Component />
</ProtectedRoute>

// Role Protected - Specific role required
<ProtectedRoute requireRole="OWNER">
  <Component />
</ProtectedRoute>

// Profile Complete - Completed profile required
<ProtectedRoute requireProfileComplete={true}>
  <Component />
</ProtectedRoute>
```

---

## 📦 Context Usage

```javascript
// Import provider
import { AuthProvider } from './context';

// Import context
import { AuthContext } from './context';

// Use in component
import { useAuth } from '../hooks/useAuth';
const { user, login, logout } = useAuth();
```

---

## 🔍 Finding Files

| Looking for... | Check here |
|---------------|------------|
| Customer home page | `src/pages/customer/Home.jsx` |
| Login page | `src/pages/shared/Login.jsx` |
| Owner dashboard | `src/pages/owner/OwnerDashboard.jsx` |
| Mess orders | `src/pages/mess/MessOrdersDashboard.jsx` |
| Header component | `src/components/shared/Header.jsx` |
| Meal card | `src/components/customer/MealCard.jsx` |
| Customer routes | `src/routes/CustomerRoutes.jsx` |
| Auth context | `src/context/AuthContext.jsx` |
| useAuth hook | `src/hooks/useAuth.js` |
| Meal service | `src/services/meal.service.js` |

---

## 🎨 Component Export Patterns

### Named Export (Recommended for components)
```javascript
// Component file
export default MealCard;

// Importing
import MealCard from '../../components/customer/MealCard';
```

### Index Exports (For multiple exports)
```javascript
// components/customer/index.js
export { default as MealCard } from './MealCard.jsx';
export { default as MealFilters } from './MealFilters.jsx';

// Importing
import { MealCard, MealFilters } from '../../components/customer';
```

---

## 🚨 Common Mistakes to Avoid

❌ **Don't mix roles**
```javascript
// Bad: Owner component in customer folder
src/components/customer/OwnerStats.jsx
```

✅ **Do organize by role**
```javascript
// Good: Owner component in owner folder
src/components/owner/OwnerStats.jsx
```

---

❌ **Don't use absolute paths without configuration**
```javascript
// Will cause errors
import Component from 'components/customer/Component';
```

✅ **Do use relative paths**
```javascript
// Correct
import Component from '../../components/customer/Component';
```

---

❌ **Don't import pages in components**
```javascript
// Bad: Creates circular dependencies
import HomePage from '../../pages/customer/Home';
```

✅ **Do import components in pages**
```javascript
// Good: Proper hierarchy
import MealCard from '../../components/customer/MealCard';
```

---

## 📊 File Structure Snapshot

```
src/
├── pages/           (19 files organized)
│   ├── customer/    (10 files) 🔵
│   ├── owner/       (3 files)  🟢
│   ├── mess/        (3 files)  🟡
│   └── shared/      (3 files)  ⚪
│
├── components/      (30+ files)
│   ├── customer/    (14 files) 🔵
│   ├── owner/       (0 files)  🟢
│   ├── mess/        (0 files)  🟡
│   └── shared/      (20 files) ⚪
│
├── routes/          (6 files) ✨
├── context/         (3 files)
├── hooks/           (1 file)
├── services/        (9 files)
└── utils/           (1 file)
```

---

## 🎯 Development Workflow

### 1️⃣ Starting Development
```bash
cd d:\Projects\Mama-s-kitchen-frontend
npm run dev
# Server: http://localhost:5174/
```

### 2️⃣ Adding Customer Feature
1. Create page: `src/pages/customer/NewFeature.jsx`
2. Create components: `src/components/customer/FeatureCard.jsx`
3. Add route: Update `src/routes/CustomerRoutes.jsx`
4. Add service (if needed): `src/services/feature.service.js`

### 3️⃣ Adding Owner Feature
1. Create page: `src/pages/owner/NewFeature.jsx`
2. Create components: `src/components/owner/FeatureWidget.jsx`
3. Add route: Update `src/routes/OwnerRoutes.jsx` with `requireRole="OWNER"`

### 4️⃣ Adding Shared Component
1. Create: `src/components/shared/NewComponent.jsx`
2. Import anywhere: `import NewComponent from '../../components/shared/NewComponent';`

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `PROJECT_STRUCTURE.md` | Complete directory reference |
| `MIGRATION_GUIDE.md` | Before/after comparison |
| `CODE_ORGANIZATION_SUMMARY.md` | What was done |
| `ARCHITECTURE_VISUALIZATION.md` | Visual diagrams |
| `QUICK_REFERENCE.md` | This file! |
| `src/routes/README.md` | Routes documentation |

---

## ✅ Verification Checklist

Before committing new features:
- [ ] File in correct role folder?
- [ ] Imports use correct relative paths?
- [ ] Route added to appropriate Routes file?
- [ ] Protection level correct?
- [ ] Component exported properly?
- [ ] No compilation errors?
- [ ] Dev server running?

---

**Remember**: 
- **Pages** organize by **role**
- **Components** organize by **usage**
- **Routes** organize by **access level**
- **Everything** is **well-documented**!

🎉 **You're ready to develop!**
