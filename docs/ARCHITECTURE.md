# Frontend Architecture

## Overview

Mama's Kitchen frontend is a modern React application built with **Vite** for fast development and optimized production builds. The application follows a **component-based architecture** with clear separation of concerns.

## Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.0 | UI library for building components |
| **Vite** | 7.2.5 (Rolldown) | Build tool with fast HMR |
| **React Router** | 7.11.0 | Client-side routing |
| **Tailwind CSS** | 4.1.18 | Utility-first CSS framework |
| **Axios** | 1.13.4 | HTTP client for API calls |
| **Lucide React** | 0.562.0 | Icon library |
| **PropTypes** | 15.8.1 | Runtime type checking |

## Architecture Diagram

```
┌────────────────────────────────────────┐
│           Browser/Client               │
└────────────────┬───────────────────────┘
                 │
┌────────────────▼───────────────────────┐
│          main.jsx (Entry)              │
│  - ReactDOM.createRoot()               │
│  - BrowserRouter wrapper               │
└────────────────┬───────────────────────┘
                 │
┌────────────────▼───────────────────────┐
│          App.jsx (Root)                │
│  - Context Providers                   │
│  - Layout Components                   │
│  - Route Configuration                 │
└────────────────┬───────────────────────┘
                 │
      ┌──────────┼──────────┐
      │          │          │
┌─────▼─────┐ ┌──▼──────┐ ┌▼──────────┐
│  Context  │ │ Layout  │ │  Routes   │
│ Providers │ │ Header  │ │           │
│           │ │ Footer  │ │ Customer  │
│ - Auth    │ │ Error   │ │ Owner     │
│ - Theme   │ │ Notif.  │ │ Mess      │
│ - Notif.  │ └─────────┘ │ Shared    │
└───────────┘             └─────┬─────┘
                                │
                    ┌───────────┼───────────┐
                    │           │           │
             ┌──────▼──┐  ┌─────▼────┐  ┌──▼──────┐
             │  Pages  │  │Components│  │ Services│
             │         │  │          │  │         │
             │ Home    │  │ Meal Card│  │ Auth    │
             │ Orders  │  │ Filters  │  │ Meal    │
             │ Profile │  │ Forms    │  │ Order   │
             └─────────┘  └──────────┘  └───┬─────┘
                                            │
                                 ┌──────────▼─────────┐
                                 │   API Client       │
                                 │   (Axios)          │
                                 └──────────┬─────────┘
                                            │
                                 ┌──────────▼─────────┐
                                 │   Backend API      │
                                 │ http://localhost:5000│
                                 └────────────────────┘
```

## Project Structure

```
src/
├── main.jsx                    # Application entry point
├── App.jsx                     # Root component
├── index.css                   # Global styles & Tailwind imports
│
├── assets/                     # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── components/                 # Reusable components
│   ├── customer/              # Customer-specific components
│   │   ├── FoodPreferences.jsx
│   │   ├── MealCard.jsx
│   │   ├── MealFilters.jsx
│   │   ├── MessCard.jsx
│   │   ├── OrderCard.jsx
│   │   ├── ProfileCard.jsx
│   │   └── index.js
│   │
│   ├── owner/                 # Owner-specific components
│   │   ├── MessForm.jsx
│   │   ├── MealForm.jsx
│   │   ├── OrderList.jsx
│   │   └── index.js
│   │
│   └── shared/                # Shared components
│       ├── Header.jsx
│       ├── Footer.jsx
│       ├── AuthLayout.jsx
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── Modal.jsx
│       ├── ErrorBoundary.jsx
│       ├── NotificationContainer.jsx
│       ├── ProtectedRoute.jsx
│       └── index.js
│
├── context/                   # React Context providers
│   ├── AuthContext.jsx       # Authentication state
│   ├── ThemeContext.jsx      # Theme management
│   ├── NotificationContext.jsx # Notification system
│   └── index.js
│
├── hooks/                     # Custom React hooks
│   ├── useAuth.js            # Auth hook
│   ├── useTheme.js           # Theme hook
│   ├── index.js
│   │
│   ├── customer/             # Customer-specific hooks
│   │   ├── useMeals.js
│   │   ├── useOrders.js
│   │   └── index.js
│   │
│   ├── owner/                # Owner-specific hooks
│   │   ├── useMess.js
│   │   └── index.js
│   │
│   └── shared/               # Shared hooks
│       ├── useApi.js
│       └── index.js
│
├── pages/                     # Page components
│   ├── customer/             # Customer pages
│   │   ├── Home.jsx
│   │   ├── MealsListPage.jsx
│   │   ├── MealDetailPage.jsx
│   │   ├── MessListPage.jsx
│   │   ├── MessDetailPage.jsx
│   │   ├── MyOrdersPage.jsx
│   │   ├── OrderDetailPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── CustomerProfilePage.jsx
│   │   └── EditProfilePage.jsx
│   │
│   ├── owner/                # Owner pages
│   │   ├── OwnerDashboard.jsx
│   │   ├── CreateMessPage.jsx
│   │   └── OwnerProfileCompletePage.jsx
│   │
│   ├── mess/                 # Mess management pages
│   │
│   └── shared/               # Shared pages
│       ├── Login.jsx
│       ├── Signup.jsx
│       ├── Contact.jsx
│       └── NotFound.jsx
│
├── routes/                    # Route configurations
│   ├── CustomerRoutes.jsx
│   ├── OwnerRoutes.jsx
│   ├── MessRoutes.jsx
│   ├── SharedRoutes.jsx
│   └── index.js
│
├── services/                  # API service layer
│   ├── auth.service.js
│   ├── meal.service.js
│   ├── mess.service.js
│   ├── order.service.js
│   ├── profile.service.js
│   ├── review.service.js
│   ├── user.service.js
│   ├── contact.service.js
│   ├── index.js
│   │
│   └── api/                  # API configuration
│       ├── apiClient.js      # Axios instance
│       ├── constants.js      # API endpoints
│       └── interceptors.js   # Request/response interceptors
│
└── utils/                     # Utility functions
    ├── logger.js             # Logging utility
    ├── formatters.js         # Data formatting
    ├── validators.js         # Client-side validation
    └── helpers.js            # Helper functions
```

## Core Components

### 1. Application Entry Point

**File**: `main.jsx`

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

**Responsibilities**:
- Mount React app to DOM
- Wrap with BrowserRouter
- Enable StrictMode for development warnings

### 2. Root Component

**File**: `App.jsx`

```jsx
import { Routes, Route } from "react-router-dom";
import { CustomerRoutes, OwnerRoutes, MessRoutes, SharedRoutes } from "./routes";
import Header from "./components/shared/Header.jsx";
import Footer from "./components/shared/Footer.jsx";
import ErrorBoundary from "./components/shared/ErrorBoundary.jsx";
import NotificationContainer from "./components/shared/NotificationContainer.jsx";

const App = () => {
  return (
    <ErrorBoundary>
      <div className="App min-h-screen flex flex-col">
        <Header />
        <NotificationContainer />
        <main className="flex-1 pt-20">
          <Routes>
            {SharedRoutes()}
            {CustomerRoutes()}
            {OwnerRoutes()}
            {MessRoutes()}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};
```

**Responsibilities**:
- Define application layout
- Mount context providers
- Configure routing
- Global error handling

## Design Patterns

### 1. Component Composition

Components are built using composition over inheritance:

```jsx
// Composite components
<Page>
  <Header />
  <Content>
    <Filters />
    <List>
      <Card />
      <Card />
    </List>
  </Content>
  <Footer />
</Page>
```

### 2. Container/Presentational Pattern

**Container Components** (Smart):
- Manage state
- Handle business logic
- Make API calls
- Pass data to presentational components

```jsx
// Container
const MealsListPage = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMeals();
  }, []);

  return <MealsList meals={meals} loading={loading} />;
};
```

**Presentational Components** (Dumb):
- Receive data via props
- Display data
- Emit events via callbacks
- No business logic

```jsx
// Presentational
const MealsList = ({ meals, loading }) => {
  if (loading) return <Spinner />;
  
  return (
    <div>
      {meals.map(meal => <MealCard key={meal._id} meal={meal} />)}
    </div>
  );
};
```

### 3. Custom Hooks Pattern

Extract reusable logic into custom hooks:

```jsx
// Custom hook
const useMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMeals = async (filters) => {
    setLoading(true);
    try {
      const data = await mealService.getAllMeals(filters);
      setMeals(data.meals);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { meals, loading, error, fetchMeals };
};

// Usage in component
const MealsPage = () => {
  const { meals, loading, error, fetchMeals } = useMeals();
  
  useEffect(() => {
    fetchMeals();
  }, []);

  // ... render
};
```

### 4. Context Provider Pattern

Global state management using Context API:

```jsx
// Context Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    setUser(response.user);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Usage
const Profile = () => {
  const { user, logout } = useAuth();
  // ... render
};
```

### 5. Protected Route Pattern

Route guards for authentication and authorization:

```jsx
const ProtectedRoute = ({ children, requireRole, requireProfileComplete }) => {
  const { user, profileComplete, checkProfileCompletion } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (requireRole && user.role !== requireRole) {
      navigate('/');
    } else if (requireProfileComplete) {
      checkProfileCompletion().then(isComplete => {
        if (!isComplete) {
          navigate('/profile/complete');
        }
      });
    }
  }, [user]);

  return user ? children : null;
};
```

## State Management

### 1. Local State (useState)

For component-specific state:

```jsx
const [showModal, setShowModal] = useState(false);
const [selectedMeal, setSelectedMeal] = useState(null);
```

### 2. Context API

For global application state:

```jsx
// AuthContext - User authentication state
// ThemeContext - Application theme
// NotificationContext - Toast notifications
```

### 3. URL State (React Router)

For shareable state:

```jsx
// Query parameters
/meals?type=lunch&veg=true

// URL params
/meals/:id
```

### 4. Server State (API)

For data from backend:

```jsx
// Fetched and cached in components
const [meals, setMeals] = useState([]);
```

## Routing Architecture

### Route Organization

Routes are organized by user role:

1. **Shared Routes** (`/login`, `/signup`, `/contact`)
2. **Customer Routes** (`/meals`, `/orders`, `/profile`)
3. **Owner Routes** (`/owner/dashboard`, `/owner/create-mess`)
4. **Mess Routes** (Mess-specific management)

### Route Protection Levels

1. **Public** - Accessible to all
2. **Authenticated** - Requires login
3. **Role-Based** - Requires specific role
4. **Profile-Complete** - Requires completed profile

### Lazy Loading (Planned)

```jsx
const MealsListPage = lazy(() => import('./pages/customer/MealsListPage'));

<Suspense fallback={<Spinner />}>
  <Route path="/meals" element={<MealsListPage />} />
</Suspense>
```

## API Integration

### Service Layer

All API calls go through service modules:

```
Component → Custom Hook → Service → API Client → Backend
```

### Axios Configuration

```jsx
// apiClient.js
const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,  // Include cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## Styling Architecture

### Tailwind CSS

Utility-first approach with custom theme:

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: {...},
        secondary: {...}
      },
      spacing: {...},
      fontSize: {...}
    }
  }
};
```

### CSS Custom Properties

```css
/* index.css */
:root {
  --primary-500: #FF6B35;
  --secondary-500: #004E89;
  --bg-primary: #FFFFFF;
  --bg-secondary: #F7F7F7;
  --text-primary: #1A1A1A;
  --text-secondary: #6B7280;
}
```

### Component Styles

```jsx
// Inline Tailwind classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h2 className="text-xl font-semibold text-gray-900">Title</h2>
</div>

// Dynamic classes
<button 
  className={`px-4 py-2 rounded ${
    variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500'
  }`}
>
  Click Me
</button>
```

## Error Handling

### Error Boundary

Catches React errors:

```jsx
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### API Error Handling

```jsx
try {
  const data = await mealService.getMeals();
  setMeals(data.meals);
} catch (error) {
  if (error.response) {
    // Server error response
    setError(error.response.data.error);
  } else if (error.request) {
    // Network error
    setError('Network error, please try again');
  } else {
    // Other errors
    setError('An error occurred');
  }
}
```

### Form Validation

```jsx
const validateForm = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Invalid email format';
  }

  if (!values.password || values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};
```

## Performance Optimization

### 1. React.memo

Prevent unnecessary re-renders:

```jsx
const MealCard = React.memo(({ meal, onSelect }) => {
  return (
    <div onClick={() => onSelect(meal)}>
      {meal.name}
    </div>
  );
});
```

### 2. useMemo

Memoize expensive calculations:

```jsx
const filteredMeals = useMemo(() => {
  return meals.filter(meal => 
    meal.is_Veg === filters.isVeg &&
    meal.mealType === filters.type
  );
}, [meals, filters]);
```

### 3. useCallback

Memoize callback functions:

```jsx
const handleSelect = useCallback((meal) => {
  setSelected(meal);
}, []);
```

### 4. Code Splitting (Planned)

```jsx
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
```

## Accessibility

### ARIA Labels

```jsx
<button aria-label="Close modal" onClick={onClose}>
  <X />
</button>
```

### Keyboard Navigation

```jsx
<div 
  role="button"
  tabIndex="0"
  onKeyPress={(e) => e.key === 'Enter' && onClick()}
>
  Clickable Div
</div>
```

### Semantic HTML

```jsx
<nav>
  <ul>
    <li><Link to="/home">Home</Link></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Page Title</h1>
    <section>Content</section>
  </article>
</main>
```

## Development Workflow

### Hot Module Replacement (HMR)

Vite provides instant updates during development:

```bash
npm run dev  # Starts dev server with HMR
```

### Build Process

```bash
npm run build   # Production build
npm run preview # Preview production build
```

### Linting

```bash
npm run lint    # ESLint checking
```

## Testing Strategy (Planned)

### Unit Tests
- Component rendering
- Utility functions
- Custom hooks

### Integration Tests
- Page workflows
- API integration
- Context providers

### E2E Tests
- User journeys
- Critical paths
- Cross-browser testing

## Best Practices

1. **Component Organization** - One component per file
2. **PropTypes** - Define prop types for all components
3. **Export Patterns** - Named exports for utilities, default for components
4. **File Naming** - PascalCase for components, camelCase for utilities
5. **State Lifting** - Keep state at the appropriate level
6. **Effect Cleanup** - Clean up subscriptions in useEffect
7. **Key Props** - Always use unique keys in lists
8. **Error Boundaries** - Wrap major sections
9. **Loading States** - Show loading indicators
10. **Responsive Design** - Mobile-first approach

## Future Enhancements

1. **State Management**: Redux or Zustand
2. **Testing**: Jest + React Testing Library
3. **TypeScript**: Type safety
4. **PWA**: Offline functionality
5. **Performance Monitoring**: Analytics integration
6. **Internationalization**: Multi-language support
7. **Dark Mode**: Theme switching
8. **Animation**: Framer Motion
9. **Form Library**: React Hook Form
10. **Data Tables**: Advanced filtering and sorting
