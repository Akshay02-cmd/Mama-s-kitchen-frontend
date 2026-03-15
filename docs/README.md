# Frontend Documentation

This folder explains how the React application is structured, how routing works, and how the frontend maps to the backend API.

It is written for:

- newcomers trying to understand the project quickly
- frontend contributors adding UI or routes
- backend contributors who want to understand how API responses are consumed

## Start Here

Read in this order if you are new:

1. [../README.md](../README.md)
2. [ARCHITECTURE.md](ARCHITECTURE.md)
3. [AUTHENTICATION.md](AUTHENTICATION.md)
4. [ROUTING.md](ROUTING.md)

## Documentation Map

- [ARCHITECTURE.md](ARCHITECTURE.md)
  Explains the app shell, page structure, services, contexts, and data flow.

- [AUTHENTICATION.md](AUTHENTICATION.md)
  Explains auth context, local storage, cookie support, route guards, and 401 handling.

- [ROUTING.md](ROUTING.md)
  Explains public, protected, owner, customer, and mess-specific routes.

## What Matters in This Frontend

Project-specific notes that new developers should understand early:

- The frontend is role-aware.
- Auth is held in context, but token and user are also stored in localStorage.
- Axios sends both credentials and bearer token.
- Meals support extras.
- Checkout sends selected extras in the order payload.
- Owner dashboard mess cards now route into mess-specific management URLs.
- Current product flow is one owner managing one selected mess at a time.

## Suggested Reading by Task

### I want to understand the overall app

- Read [ARCHITECTURE.md](ARCHITECTURE.md)
- Read [AUTHENTICATION.md](AUTHENTICATION.md)

### I want to add a page or route

- Read [ROUTING.md](ROUTING.md)
- Then inspect src/routes and src/pages

### I want to change auth behavior

- Read [AUTHENTICATION.md](AUTHENTICATION.md)
- Inspect src/context/AuthContext.jsx
- Inspect src/components/shared/ProtectedRoute.jsx
- Inspect src/services/auth.service.js and src/services/api/apiClient.js

### I want to change meal ordering or extras flow

- Inspect MealCard, MealDetailModal, CheckoutPage, meal.service.js, and order.service.js

## Operational Notes

- Dev server: http://localhost:5173
- Backend default: http://localhost:5000
- Main env var: VITE_API_BASE_URL

## Documentation Maintenance Rule

Whenever one of these changes, update docs in the same task when possible:

- route paths
- role requirements
- auth flow
- page ownership
- payload shapes sent to backend
- owner or customer workflow assumptions