# Hooks Documentation

Complete guide to all custom React hooks in the Mama's Kitchen application.

---

## 📁 Structure

```
hooks/
├── index.js              # Central export for all hooks
├── shared/               # Shared hooks (all roles)
│   ├── useAuth.js
│   ├── useTheme.js
│   ├── useForm.js
│   ├── useLocalStorage.js
│   ├── useDebounce.js
│   ├── useAsync.js
│   ├── useMediaQuery.js
│   └── index.js
├── customer/             # Customer-specific hooks
│   ├── useMeals.js
│   ├── useCart.js
│   ├── useProfile.js
│   ├── useOrders.js
│   └── index.js
├── owner/                # Owner-specific hooks
│   ├── useOwnerDashboard.js
│   ├── useMessForm.js
│   └── index.js
└── mess/                 # Mess-specific hooks
    ├── useMessOrders.js
    ├── useMealForm.js
    └── index.js
```

---

## 🔧 Shared Hooks

### useAuth
**Purpose**: Access authentication context  
**Location**: `hooks/shared/useAuth.js`

```javascript
import { useAuth } from '@/hooks/shared';

const MyComponent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  return <div>Welcome {user?.name}</div>;
};
```

**Returns**:
- `user` - Current user object
- `login(credentials)` - Login function
- `logout()` - Logout function
- `isAuthenticated` - Boolean authentication status
- `profileComplete` - Boolean profile completion status
- `loading` - Loading state

---

### useTheme
**Purpose**: Access theme context  
**Location**: `hooks/shared/useTheme.js`

```javascript
import { useTheme } from '@/hooks/shared';

const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();
  
  return <button onClick={toggleTheme}>Toggle {theme}</button>;
};
```

**Returns**:
- `theme` - Current theme ('light' or 'dark')
- `toggleTheme()` - Toggle theme function

---

### useForm
**Purpose**: Manage form state and validation  
**Location**: `hooks/shared/useForm.js`

```javascript
import { useForm } from '@/hooks/shared';

const MyForm = () => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    async (values) => {
      await loginUser(values);
    },
    (values) => {
      const errors = {};
      if (!values.email) errors.email = 'Required';
      return errors;
    }
  );
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={values.email} onChange={handleChange} />
      {errors.email && <span>{errors.email}</span>}
    </form>
  );
};
```

**Parameters**:
- `initialValues` - Initial form values object
- `onSubmit` - Submit handler function
- `validate` - Validation function (optional)

**Returns**:
- `values` - Current form values
- `errors` - Validation errors
- `touched` - Touched fields
- `isSubmitting` - Submission state
- `handleChange` - Input change handler
- `handleBlur` - Input blur handler
- `handleSubmit` - Form submit handler
- `reset()` - Reset form
- `setFieldValue(name, value)` - Set single field
- `setFieldError(name, error)` - Set field error

---

### useLocalStorage
**Purpose**: Sync state with localStorage  
**Location**: `hooks/shared/useLocalStorage.js`

```javascript
import { useLocalStorage } from '@/hooks/shared';

const MyComponent = () => {
  const [cart, setCart, removeCart] = useLocalStorage('cart', []);
  
  const addItem = (item) => {
    setCart([...cart, item]);
  };
  
  return <div>Cart has {cart.length} items</div>;
};
```

**Parameters**:
- `key` - localStorage key
- `initialValue` - Default value if key doesn't exist

**Returns**:
- `[value, setValue, removeValue]` - Like useState with localStorage sync

---

### useDebounce
**Purpose**: Debounce a value  
**Location**: `hooks/shared/useDebounce.js`

```javascript
import { useDebounce } from '@/hooks/shared';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    if (debouncedSearch) {
      searchAPI(debouncedSearch);
    }
  }, [debouncedSearch]);
  
  return <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />;
};
```

**Parameters**:
- `value` - Value to debounce
- `delay` - Delay in milliseconds (default: 500)

**Returns**:
- Debounced value

---

### useAsync
**Purpose**: Handle async operations  
**Location**: `hooks/shared/useAsync.js`

```javascript
import { useAsync } from '@/hooks/shared';

const MyComponent = () => {
  const { execute, loading, data, error } = useAsync(fetchData, false);
  
  useEffect(() => {
    execute();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{data}</div>;
};
```

**Parameters**:
- `asyncFunction` - Async function to execute
- `immediate` - Execute immediately (default: true)

**Returns**:
- `execute(...params)` - Execute function
- `loading` - Loading state
- `data` - Response data
- `error` - Error object
- `setData` - Set data manually

---

### useMediaQuery
**Purpose**: Track media query matches  
**Location**: `hooks/shared/useMediaQuery.js`

```javascript
import { useMediaQuery, useIsMobile, useIsDesktop } from '@/hooks/shared';

const MyComponent = () => {
  const isMobile = useIsMobile();
  const isLarge = useMediaQuery('(min-width: 1200px)');
  
  return isMobile ? <MobileView /> : <DesktopView />;
};
```

**Predefined Hooks**:
- `useIsMobile()` - Max width 768px
- `useIsTablet()` - Width 769px - 1024px
- `useIsDesktop()` - Min width 1025px

---

## 👤 Customer Hooks

### useMeals
**Purpose**: Manage meals data and filtering  
**Location**: `hooks/customer/useMeals.js`

```javascript
import { useMeals } from '@/hooks/customer';

const MealsPage = () => {
  const { 
    meals, 
    loading, 
    filters, 
    updateFilter, 
    resetFilters 
  } = useMeals();
  
  return (
    <div>
      <input onChange={(e) => updateFilter('search', e.target.value)} />
      {meals.map(meal => <MealCard key={meal.id} meal={meal} />)}
    </div>
  );
};
```

**Returns**:
- `meals` - Filtered meals array
- `allMeals` - All meals (unfiltered)
- `loading` - Loading state
- `error` - Error message
- `filters` - Current filters object
- `updateFilter(key, value)` - Update single filter
- `resetFilters()` - Reset all filters
- `refetch()` - Refetch meals

---

### useCart
**Purpose**: Manage shopping cart  
**Location**: `hooks/customer/useCart.js`

```javascript
import { useCart } from '@/hooks/customer';

const CartPage = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    total,
    itemCount
  } = useCart();
  
  return (
    <div>
      <h2>Cart ({itemCount} items)</h2>
      <div>Total: ₹{total}</div>
      {cart.map(item => (
        <CartItem 
          key={item.id} 
          item={item}
          onRemove={() => removeFromCart(item.id)}
          onUpdateQty={(qty) => updateQuantity(item.id, qty)}
        />
      ))}
    </div>
  );
};
```

**Returns**:
- `cart` - Cart items array
- `addToCart(meal, quantity)` - Add item
- `removeFromCart(mealId)` - Remove item
- `updateQuantity(mealId, quantity)` - Update quantity
- `clearCart()` - Clear all items
- `getItemQuantity(mealId)` - Get item quantity
- `subtotal` - Subtotal amount
- `tax` - Tax amount
- `deliveryFee` - Delivery fee
- `total` - Total amount
- `itemCount` - Total item count
- `isEmpty` - Boolean cart empty status

---

### useProfile
**Purpose**: Manage customer profile  
**Location**: `hooks/customer/useProfile.js`

```javascript
import { useProfile } from '@/hooks/customer';

const ProfilePage = () => {
  const { profile, loading, updateProfile } = useProfile();
  
  const handleUpdate = async (data) => {
    await updateProfile(data);
  };
  
  if (loading) return <Spinner />;
  return <ProfileForm profile={profile} onSubmit={handleUpdate} />;
};
```

**Returns**:
- `profile` - Profile data object
- `loading` - Loading state
- `error` - Error message
- `updating` - Update in progress
- `updateProfile(updates)` - Update profile function
- `refetch()` - Refetch profile

---

### useOrders
**Purpose**: Manage customer orders  
**Location**: `hooks/customer/useOrders.js`

```javascript
import { useOrders } from '@/hooks/customer';

const OrdersPage = () => {
  const { orders, loading, filter, setFilter } = useOrders();
  
  return (
    <div>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      {orders.map(order => <OrderCard key={order.id} order={order} />)}
    </div>
  );
};
```

**Returns**:
- `orders` - Filtered orders array
- `allOrders` - All orders (unfiltered)
- `loading` - Loading state
- `error` - Error message
- `filter` - Current filter value
- `setFilter(value)` - Set filter
- `getOrderById(orderId)` - Get specific order
- `cancelOrder(orderId)` - Cancel order
- `refetch()` - Refetch orders

---

## 👨‍💼 Owner Hooks

### useOwnerDashboard
**Purpose**: Manage owner dashboard data  
**Location**: `hooks/owner/useOwnerDashboard.js`

```javascript
import { useOwnerDashboard } from '@/hooks/owner';

const OwnerDashboard = () => {
  const { stats, messes, loading } = useOwnerDashboard();
  
  return (
    <div>
      <Stats data={stats} />
      <MessList messes={messes} />
    </div>
  );
};
```

**Returns**:
- `stats` - Dashboard statistics object
- `messes` - Owner's messes array
- `loading` - Loading state
- `error` - Error message
- `refetch()` - Refetch dashboard data

---

### useMessForm
**Purpose**: Manage mess creation/update form  
**Location**: `hooks/owner/useMessForm.js`

```javascript
import { useMessForm } from '@/hooks/owner';

const CreateMessPage = () => {
  const {
    formData,
    errors,
    handleChange,
    toggleCuisine,
    handleSubmit
  } = useMessForm();
  
  const onSubmit = async (data) => {
    await createMess(data);
  };
  
  return (
    <form onSubmit={() => handleSubmit(onSubmit)}>
      <input name="name" value={formData.name} onChange={handleChange} />
      {errors.name && <span>{errors.name}</span>}
    </form>
  );
};
```

**Returns**:
- `formData` - Current form data
- `errors` - Validation errors
- `loading` - Loading state
- `handleChange(e)` - Input change handler
- `toggleCuisine(cuisine)` - Toggle cuisine selection
- `handleSubmit(onSubmit)` - Submit handler
- `reset()` - Reset form

---

## 🏪 Mess Hooks

### useMessOrders
**Purpose**: Manage mess orders  
**Location**: `hooks/mess/useMessOrders.js`

```javascript
import { useMessOrders } from '@/hooks/mess';

const MessOrdersDashboard = () => {
  const {
    orders,
    activeTab,
    setActiveTab,
    orderCounts,
    acceptOrder,
    markAsDelivered
  } = useMessOrders();
  
  return (
    <div>
      <Tabs active={activeTab} onChange={setActiveTab} counts={orderCounts} />
      {orders.map(order => (
        <OrderCard 
          key={order.id}
          order={order}
          onAccept={() => acceptOrder(order.id)}
          onDeliver={() => markAsDelivered(order.id)}
        />
      ))}
    </div>
  );
};
```

**Returns**:
- `orders` - Filtered orders array
- `allOrders` - All orders
- `loading` - Loading state
- `error` - Error message
- `activeTab` - Current tab ('new', 'preparing', 'delivered')
- `setActiveTab(tab)` - Change active tab
- `orderCounts` - Order counts by status
- `acceptOrder(orderId)` - Accept order
- `markAsDelivered(orderId)` - Mark as delivered
- `refetch()` - Refetch orders

---

### useMealForm
**Purpose**: Manage meal creation/update form  
**Location**: `hooks/mess/useMealForm.js`

```javascript
import { useMealForm } from '@/hooks/mess';

const CreateMealPage = () => {
  const {
    formData,
    imagePreview,
    errors,
    handleChange,
    handleImageChange,
    handleSubmit
  } = useMealForm();
  
  const onSubmit = async (data) => {
    await createMeal(data);
  };
  
  return (
    <form onSubmit={() => handleSubmit(onSubmit)}>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input type="file" onChange={handleImageChange} />
      {imagePreview && <img src={imagePreview} alt="Preview" />}
    </form>
  );
};
```

**Returns**:
- `formData` - Current form data
- `imageFile` - Selected image file
- `imagePreview` - Image preview URL
- `errors` - Validation errors
- `loading` - Loading state
- `handleChange(e)` - Input change handler
- `handleImageChange(e)` - Image upload handler
- `handleSubmit(onSubmit)` - Submit handler
- `reset()` - Reset form

---

## 📦 Import Examples

### Import from Central Index
```javascript
// All hooks available
import { useAuth, useMeals, useCart } from '@/hooks';
```

### Import by Category
```javascript
// Shared hooks
import { useAuth, useForm, useDebounce } from '@/hooks/shared';

// Customer hooks
import { useMeals, useCart, useOrders } from '@/hooks/customer';

// Owner hooks
import { useOwnerDashboard, useMessForm } from '@/hooks/owner';

// Mess hooks
import { useMessOrders, useMealForm } from '@/hooks/mess';
```

### Import Specific Hook
```javascript
import { useAuth } from '@/hooks/shared/useAuth';
import { useMeals } from '@/hooks/customer/useMeals';
```

---

## 🎯 Best Practices

1. **Use Appropriate Hook**: Choose role-specific hooks for role-specific functionality
2. **Error Handling**: Always handle errors returned by hooks
3. **Loading States**: Show loading indicators when hooks are fetching data
4. **Cleanup**: Hooks automatically cleanup, but be mindful of side effects
5. **Memoization**: Hooks use useCallback for stable function references
6. **Dependencies**: Hooks manage their own dependencies internally

---

## 🔄 Hook Lifecycle

```
Component Mount
     ↓
Hook Initialization
     ↓
Fetch Data (if auto-fetch)
     ↓
Update State
     ↓
Render Component
     ↓
User Interactions → Hook Methods → State Updates
     ↓
Component Unmount → Cleanup
```

---

## ✅ Testing Hooks

```javascript
import { renderHook, act } from '@testing-library/react';
import { useCart } from '@/hooks/customer';

test('adds item to cart', () => {
  const { result } = renderHook(() => useCart());
  
  act(() => {
    result.current.addToCart({ id: 1, name: 'Meal', price: 100 }, 2);
  });
  
  expect(result.current.itemCount).toBe(2);
  expect(result.current.subtotal).toBe(200);
});
```

---

**Status**: ✅ All hooks documented and ready to use!
