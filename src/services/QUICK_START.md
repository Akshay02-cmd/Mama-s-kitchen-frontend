# Service Layer Quick Start Guide

## Setup

1. **Install dependencies** (already done):
   ```bash
   npm install axios
   ```

2. **Configure environment variables**:
   Create a `.env` file in the project root:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

## Basic Usage

### 1. Authentication

```javascript
import { authService } from '@/services';

// Register
const registerUser = async () => {
  try {
    const response = await authService.register({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'CUSTOMER'
    });
    console.log('Registered:', response);
  } catch (error) {
    console.error('Registration failed:', error.message);
  }
};

// Login
const loginUser = async () => {
  try {
    const response = await authService.login({
      email: 'john@example.com',
      password: 'password123',
      role: 'CUSTOMER'
    });
    // Token is automatically stored in localStorage
    console.log('Logged in:', response);
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};

// Check if authenticated
if (authService.isAuthenticated()) {
  const user = authService.getStoredUser();
  console.log('Current user:', user);
}

// Logout
await authService.logout();
```

### 2. Fetching Data

```javascript
import { messService, mealService } from '@/services';
import { getErrorMessage } from '@/services';

// Get all messes
const fetchMesses = async () => {
  try {
    const response = await messService.getAllMesses();
    return response.messes || response.data || [];
  } catch (error) {
    console.error('Error:', getErrorMessage(error));
    return [];
  }
};

// Get single mess
const mess = await messService.getMessById('mess-id-here');

// Get all meals
const meals = await mealService.getAllMeals();
```

### 3. Creating Resources

```javascript
import { orderService } from '@/services';

// Create order
const createOrder = async () => {
  try {
    const order = await orderService.createOrder({
      items: [
        { mealId: 'meal-123', quantity: 2, price: 120 },
        { mealId: 'meal-456', quantity: 1, price: 150 }
      ],
      deliveryAddress: '123 Main Street, Nashik',
      deliveryPhone: '9876543210',
      paymentMethod: 'UPI',
      notes: 'Please deliver before 2 PM'
    });
    console.log('Order created:', order);
  } catch (error) {
    console.error('Failed to create order:', error.message);
  }
};
```

### 4. Error Handling

```javascript
import { 
  formatError, 
  getErrorMessage, 
  isAuthError, 
  isValidationError 
} from '@/services';

try {
  await someService.someMethod();
} catch (error) {
  // Simple error message
  const message = getErrorMessage(error);
  console.error(message);
  
  // Detailed error info
  const formatted = formatError(error);
  console.log('Status:', formatted.status);
  console.log('Message:', formatted.message);
  console.log('Validation errors:', formatted.errors);
  
  // Check error type
  if (isAuthError(error)) {
    // Handle authentication error
    console.log('Please login again');
  }
  
  if (isValidationError(error)) {
    // Handle validation errors
    formatted.errors.forEach(err => {
      console.log('Validation error:', err);
    });
  }
}
```

### 5. React Component Example

```javascript
import { useState, useEffect } from 'react';
import { messService } from '@/services';
import { getErrorMessage } from '@/services';

const MessList = () => {
  const [messes, setMesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMesses = async () => {
      try {
        setLoading(true);
        const response = await messService.getAllMesses();
        setMesses(response.messes || response.data || []);
        setError(null);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchMesses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {messes.map(mess => (
        <div key={mess._id}>
          <h3>{mess.messName}</h3>
          <p>{mess.area}</p>
        </div>
      ))}
    </div>
  );
};

export default MessList;
```

## Available Services

- `authService` - Authentication (login, register, logout)
- `profileService` - User profiles (customer & owner)
- `messService` - Mess/catering services
- `mealService` - Meal/menu items
- `orderService` - Order management
- `reviewService` - Reviews and ratings
- `contactService` - Contact us
- `userService` - User management (Admin)

## Constants

```javascript
import { 
  ORDER_STATUS, 
  PAYMENT_METHODS, 
  PAYMENT_STATUS, 
  MEAL_TYPES,
  USER_ROLES 
} from '@/services';

// Use in your code
const status = ORDER_STATUS.PLACED;
const paymentMethod = PAYMENT_METHODS.UPI;
const mealType = MEAL_TYPES.LUNCH;
```

## Tips

1. **Always use try-catch** when calling service methods
2. **Handle loading states** in your components
3. **Use error handling utilities** for consistent UX
4. **Check authentication** before protected operations
5. **Token is managed automatically** - no need to manually add to requests

## Next Steps

- Integrate services into your React components
- Set up state management (Context API or Redux) if needed
- Add loading and error states to your UI
- Implement form validation before API calls
