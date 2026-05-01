# ErrorBoundary Component Documentation

## 1. Introduction

The `ErrorBoundary` component is a React class-based component used to catch JavaScript runtime errors in child components and prevent the entire application from crashing.

It displays a fallback UI when an error occurs.

---

## 2. Purpose

- Prevent full application crash  
- Show user-friendly error screen  
- Improve UX during unexpected failures  
- Help developers debug errors  

---

## 3. Technologies Used

- React (Class Component)  
- PropTypes  
- JavaScript Error Handling API  

---

## 4. Props

| Prop Name | Type | Required | Description |
|-----------|------|----------|-------------|
| children  | Node | Yes      | Components wrapped inside ErrorBoundary |

---

## 5. State

- `hasError` → boolean (tracks if error occurred)  
- `error` → stores error details  

---

## 6. Lifecycle Methods

### getDerivedStateFromError(error)
- Runs when a child component throws an error  
- Updates state to show fallback UI  

### componentDidCatch(error, errorInfo)
- Captures error details  
- Logs error in development mode  
- Can be integrated with tools like Sentry in production  

---

## 7. UI Behavior

### Normal State
- Renders child components normally  

### Error State
Shows fallback UI:
- ⚠️ Error icon  
- Error message  
- Reload button  
- Centered responsive layout  

---

## 8. Usage

```jsx
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

---

## 9. User Flow

1. App runs normally  
2. A component throws an error  
3. ErrorBoundary catches it  
4. Fallback UI is displayed  
5. User clicks “Reload Page” to recover  

---

## 10. Features

- Prevents full app crash  
- Clean fallback UI  
- Reload functionality  
- Development error logging  
- Production-ready structure  

---

## 11. Accessibility

- Simple and readable UI  
- Clear error message  
- One-click recovery option  

---

## 12. Possible Improvements

- Add “Try Again” without full reload  
- Integrate Sentry / LogRocket  
- Show expandable error details (dev mode)  
- Route-level error boundaries  

---

## 13. Conclusion

The `ErrorBoundary` component improves application stability by catching runtime errors and displaying a safe fallback UI instead of breaking the entire app.
