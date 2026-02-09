# Frontend Documentation Index

Welcome to the Mama's Kitchen Frontend documentation. This folder contains comprehensive documentation for the React application.

## 📚 Documentation Files

### Architecture & Design

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Complete frontend architecture
  - Technology stack
  - Project structure
  - Component patterns
  - State management
  - Design patterns
  - Styling architecture

- **[ROUTING.md](./ROUTING.md)** - Routing system documentation
  - Route structure
  - Protection levels
  - Route parameters
  - Navigation patterns
  - Route guards

### Component Library

- **Components** - Organized by feature
  - Customer components (`src/components/customer/`)
  - Owner components (`src/components/owner/`)
  - Shared components (`src/components/shared/`)

### Pages

- **Customer Pages** (`src/pages/customer/`)
  - Home, Meals, Orders, Profile
- **Owner Pages** (`src/pages/owner/`)
  - Dashboard, Mess Management
- **Shared Pages** (`src/pages/shared/`)
  - Login, Signup, Contact

## 🚀 Quick Start

1. **New to the project?** Start with [ARCHITECTURE.md](./ARCHITECTURE.md)
2. **Understanding navigation?** Check [ROUTING.md](./ROUTING.md)
3. **Need to setup?** See [../../SETUP.md](../../SETUP.md)

## 📖 Related Documentation

### Root Documentation
- [PROJECT_OVERVIEW.md](../../PROJECT_OVERVIEW.md) - Overall project information
- [SETUP.md](../../SETUP.md) - Installation and setup guide
- [USER_WORKFLOWS.md](../../USER_WORKFLOWS.md) - User journey documentation

### Backend Documentation
- Navigate to `../Mama-s-kitchen-backend/docs/` for backend API documentation

## 🔍 Quick Reference

### Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI library |
| Vite | 7.2.5 | Build tool |
| React Router | 7.11.0 | Routing |
| Tailwind CSS | 4.1.18 | Styling |
| Axios | 1.13.4 | API client |

### Development Server

```bash
# Start dev server
npm run dev

# Runs on http://localhost:5173
```

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Linting
npm run lint
```

## 📂 Project Structure

```
src/
├── components/          # Reusable components
│   ├── customer/       # Customer-specific
│   ├── owner/          # Owner-specific
│   └── shared/         # Shared components
├── pages/              # Page components
│   ├── customer/
│   ├── owner/
│   └── shared/
├── routes/             # Route configurations
├── services/           # API services
├── context/            # State management
├── hooks/              # Custom hooks
└── utils/              # Utility functions
```

## 🎨 Styling

### Tailwind CSS

Utility-first CSS framework:

```jsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h2 className="text-xl font-semibold">Title</h2>
</div>
```

### CSS Custom Properties

```css
:root {
  --primary-500: #FF6B35;
  --secondary-500: #004E89;
  --bg-primary: #FFFFFF;
  --text-primary: #1A1A1A;
}
```

## 🔐 Authentication

### Using Auth Context

```jsx
import { useAuth } from '../hooks/useAuth';

const Component = () => {
  const { user, login, logout } = useAuth();
  
  // user.role: "CUSTOMER" or "OWNER"
  // user._id: User ID
  // user.name: User name
};
```

### Protected Routes

```jsx
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>

// With role requirement
<ProtectedRoute requireRole="OWNER">
  <OwnerComponent />
</ProtectedRoute>

// With profile requirement
<ProtectedRoute requireProfileComplete={true}>
  <CheckoutPage />
</ProtectedRoute>
```

## 🌐 API Integration

### Service Layer

```jsx
import { mealService } from '../services';

const fetchMeals = async () => {
  const data = await mealService.getAllMeals();
  setMeals(data.meals);
};
```

### API Base URL

**Default**: `http://localhost:5000`

Configure in `src/services/api/apiClient.js`

## 📱 Responsive Design

Mobile-first approach using Tailwind breakpoints:

```jsx
<div className="
  w-full           /* mobile */
  md:w-1/2         /* tablet */
  lg:w-1/3         /* desktop */
">
  Content
</div>
```

## 🧩 Component Patterns

### Container/Presentational

**Container** (smart):
```jsx
const MealsPageContainer = () => {
  const [meals, setMeals] = useState([]);
  
  useEffect(() => {
    fetchMeals();
  }, []);
  
  return <MealsList meals={meals} />;
};
```

**Presentational** (dumb):
```jsx
const MealsList = ({ meals }) => (
  <div>
    {meals.map(meal => <MealCard meal={meal} />)}
  </div>
);
```

### Custom Hooks

```jsx
const useMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchMeals = async () => {
    setLoading(true);
    // fetch logic
    setLoading(false);
  };
  
  return { meals, loading, fetchMeals };
};
```

## 🎯 State Management

### Local State (useState)
Component-specific state

### Context API
Global state (Auth, Theme, Notifications)

### URL State
Query parameters and route params

### Server State
API data fetched and cached

## 🔄 Navigation

### Programmatic

```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/meals');
navigate(-1);  // Go back
```

### Link Component

```jsx
import { Link } from 'react-router-dom';

<Link to="/meals">View Meals</Link>
```

## 🎨 Icons

Using Lucide React:

```jsx
import { Home, ShoppingCart, User } from 'lucide-react';

<Home size={24} />
<ShoppingCart className="text-blue-500" />
```

## ⚡ Performance

### Optimization Techniques

- React.memo for component memoization
- useMemo for expensive calculations
- useCallback for function memoization
- Code splitting with lazy loading (planned)

## 🧪 Testing (Planned)

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

## 📦 Building for Production

```bash
# Build
npm run build

# Output: dist/ folder

# Preview build
npm run preview
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload dist/ folder
```

## 🔧 Configuration Files

- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.js` - ESLint rules
- `jsconfig.json` - JavaScript configuration
- `package.json` - Dependencies and scripts

## 🎨 Theme

### Colors

```
Primary: #FF6B35 (Orange)
Secondary: #004E89 (Blue)
Background: #FFFFFF / #F7F7F7
Text: #1A1A1A / #6B7280
```

### Typography

```
Font Family: System fonts
Headings: font-semibold / font-bold
Body: font-normal
```

## 🐛 Debugging

### React DevTools
Install React DevTools browser extension

### Console Logging
Use logger utility for development-only logs

### Network Tab
Inspect API calls in browser DevTools

## 📋 Best Practices

1. **Component Organization** - One component per file
2. **PropTypes** - Define prop types
3. **File Naming** - PascalCase for components
4. **State Management** - Keep state at appropriate level
5. **Effect Cleanup** - Clean up in useEffect
6. **Keys in Lists** - Always use unique keys
7. **Error Boundaries** - Wrap sections
8. **Loading States** - Show loading indicators
9. **Responsive Design** - Mobile-first approach
10. **Accessibility** - ARIA labels, semantic HTML

## 🔄 Updates

**Last Updated**: February 9, 2026  
**Version**: 1.0.0

## 📞 Support

For questions or issues:
- Check relevant documentation file
- Review code comments
- Check GitHub issues
- Contact: your-email@example.com

## 📋 Contributing

When adding new features:
1. Follow component patterns
2. Add PropTypes
3. Update documentation
4. Follow naming conventions
5. Write responsive code

---

**Note**: All documentation is maintained in markdown files. Code files contain minimal comments - refer to these docs for comprehensive information.
