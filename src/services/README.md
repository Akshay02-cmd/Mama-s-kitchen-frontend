# Services Layer Documentation

This directory contains all API service functions for communicating with the backend.

## Structure

```
services/
├── api/
│   ├── apiClient.js      # Axios instance with interceptors
│   ├── constants.js      # API endpoints and constants
│   └── errorHandler.js   # Error handling utilities
├── auth.service.js       # Authentication services
├── profile.service.js    # Profile management services
├── mess.service.js       # Mess/catering services
├── meal.service.js       # Meal/menu services
├── order.service.js      # Order management services
├── review.service.js     # Review services
├── contact.service.js    # Contact us services
├── user.service.js       # User management services (Admin)
├── index.js              # Central export point
└── README.md             # This file
```

## Usage

### Basic Import

```javascript
import { authService, orderService } from '@/services';
```

### Individual Service Import

```javascript
import authService from '@/services/auth.service';
```

### Using Services

```javascript
import { authService } from '@/services';
import { formatError, getErrorMessage } from '@/services';

// Login example
try {
  const response = await authService.login({
    email: 'user@example.com',
    password: 'password123',
    role: 'CUSTOMER'
  });
  console.log('Login successful:', response);
} catch (error) {
  const errorMessage = getErrorMessage(error);
  console.error('Login failed:', errorMessage);
}

// Create order example
try {
  const order = await orderService.createOrder({
    items: [
      { mealId: '123', quantity: 2, price: 120 }
    ],
    deliveryAddress: '123 Main St',
    deliveryPhone: '9876543210',
    paymentMethod: 'UPI'
  });
  console.log('Order created:', order);
} catch (error) {
  if (isValidationError(error)) {
    console.error('Validation error:', formatError(error).errors);
  } else {
    console.error('Error:', getErrorMessage(error));
  }
}
```

## API Client Configuration

The `apiClient` is configured with:

- **Base URL**: From `VITE_API_BASE_URL` environment variable (default: `http://localhost:5000`)
- **Timeout**: 30 seconds
- **Credentials**: Cookies included (for JWT cookie-based auth)
- **Interceptors**: 
  - Request: Adds Authorization header from localStorage
  - Response: Handles errors and redirects on 401

## Error Handling

All services use consistent error handling:

```javascript
import { formatError, getErrorMessage, isAuthError } from '@/services';

try {
  await someService.someMethod();
} catch (error) {
  // Get user-friendly message
  const message = getErrorMessage(error);
  
  // Check error type
  if (isAuthError(error)) {
    // Handle authentication error
  }
  
  // Get full error details
  const formatted = formatError(error);
  console.log(formatted.status, formatted.message, formatted.errors);
}
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Authentication

The service layer handles authentication automatically:

1. **Login**: Token is stored in localStorage after successful login
2. **Requests**: Authorization header is added automatically
3. **Logout**: Token is cleared from localStorage
4. **401 Errors**: Automatically redirects to login page

## Service Methods

### Auth Service
- `register(userData)` - Register new user
- `login(credentials)` - Login user
- `logout()` - Logout user
- `getStoredUser()` - Get user from localStorage
- `getStoredToken()` - Get token from localStorage
- `isAuthenticated()` - Check if user is authenticated
- `clearAuth()` - Clear authentication data

### Profile Service
- `getCustomerProfile()` - Get customer profile
- `createCustomerProfile(profileData)` - Create customer profile
- `updateCustomerProfile(profileData)` - Update customer profile
- `getOwnerProfile()` - Get owner profile
- `createOwnerProfile(profileData)` - Create owner profile
- `updateOwnerProfile(profileData)` - Update owner profile

### Mess Service
- `getAllMesses()` - Get all messes
- `getMessById(messId)` - Get mess by ID
- `createMess(messData)` - Create mess (Owner only)
- `updateMess(messId, messData)` - Update mess (Owner only)
- `deleteMess(messId)` - Delete mess (Owner only)

### Meal Service
- `getAllMeals()` - Get all meals
- `getMealById(mealId)` - Get meal by ID
- `createMeal(mealData)` - Create meal (Owner only)
- `updateMeal(mealId, mealData)` - Update meal (Owner only)
- `deleteMeal(mealId)` - Delete meal (Owner only)
- `getMealsByMessId(messId)` - Get meals by mess ID
- `getMealsByType(mealType)` - Get meals by type
- `getAvailableMeals()` - Get available meals only

### Order Service
- `createOrder(orderData)` - Create order (Customer only)
- `getAllOrders()` - Get all orders (Admin/Owner)
- `getOrderById(orderId)` - Get order by ID
- `getUserOrders()` - Get user's orders
- `updateOrderStatus(orderId, updateData)` - Update order status (Owner only)
- `deleteOrder(orderId)` - Delete order (Owner only)
- `clearUserOrders()` - Clear user's orders
- `getOrdersByStatus(status)` - Get orders by status (Owner only)
- `getOrdersWithinDateRange(dateRange)` - Get orders by date range (Owner only)
- `getTotalSales()` - Get total sales (Owner only)

### Review Service
- `getAllReviews()` - Get all reviews
- `getReviewById(reviewId)` - Get review by ID
- `createReview(reviewData)` - Create review (Customer only)
- `updateReview(reviewId, reviewData)` - Update review (Customer only)
- `deleteReview(reviewId)` - Delete review (Customer only)
- `getReviewsByMessId(messId)` - Get reviews for mess
- `getReviewsByMealId(mealId)` - Get reviews for meal

### Contact Service
- `createContact(contactData)` - Create contact entry (Customer only)
- `getAllContacts()` - Get all contacts (Admin only)
- `getContactById(contactId)` - Get contact by ID (Admin only)
- `getContactsGroupedByUser()` - Get contacts grouped by user (Admin only)
- `deleteContact(contactId)` - Delete contact (Admin only)
- `deleteAllContacts()` - Delete all contacts (Admin only)

### User Service
- `getAllUsers()` - Get all users (Admin only)
- `getAllCustomers()` - Get all customers (Admin only)
- `getAllOwners()` - Get all owners (Admin only)

## Best Practices

1. **Always use try-catch** when calling service methods
2. **Use error handling utilities** for consistent error messages
3. **Check authentication** before making protected API calls
4. **Handle loading states** in your components
5. **Validate data** before sending to API (client-side validation)

## Example: Complete Component Integration

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
        <div key={mess._id}>{mess.messName}</div>
      ))}
    </div>
  );
};
```
