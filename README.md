# Mumas Kitchen Frontend

Mumas Kitchen Frontend is the React application for the Mumas Kitchen platform. It provides the user interface for customers to browse messes and meals, customize orders with extras, place orders, and manage profiles, while owners can manage their mess workflow and review business activity.

The app is built with React, React Router, Vite, and Axios, and it integrates with the backend API running on localhost:5000 in development.

## What This Project Is

This frontend is a role-based food ordering interface for two main users:

- CUSTOMER: browses messes and meals, selects extras, checks out, and tracks orders
- OWNER: signs in, views owned messes, opens a specific mess dashboard, creates meals, and manages orders

Current product flow:

- Owners may have multiple mess records in some backend logic, but the active UI flow is designed around selecting one mess and operating that mess dashboard.
- Meals support optional extras.
- Checkout sends selected extras to the backend as part of each order item.

## Current Feature Set

- Authentication screens for login and signup
- Auth state stored through context plus localStorage-backed user session
- Customer browsing flow for messes and meals
- Meal detail modal with extras selection
- Checkout flow including selected extras
- Customer order history pages
- Customer review creation, editing, and deletion on mess detail pages
- Authenticated contact form submission
- Customer and owner profile pages
- Owner dashboard and mess-specific dashboard routing
- Owner order detail view and status updates
- In-page mess profile editing
- Create meal UI with extras management
- Shared notifications, route protection, and common layout components

## Tech Stack

| Layer | Technology |
| --- | --- |
| UI library | React 19 |
| Build tool | Vite 7 via Rolldown |
| Routing | React Router DOM 7 |
| HTTP client | Axios |
| Styling | Tailwind CSS 4 + CSS variables |
| Icons | lucide-react |
| Linting | ESLint 9 |

## Folder Structure

```text
src/
  App.jsx                    Application shell and route mounting
  main.jsx                   React bootstrap
  index.css                  Global styles and tokens

  assets/                    Static images and UI assets
  components/                Reusable UI grouped by feature and shared usage
  context/                   Auth, theme, and notification providers
  hooks/                     Shared and feature-specific hooks
  pages/                     Route-level screens
  routes/                    Route configuration modules
  services/                  API service wrappers
  utils/                     Logging and helper utilities
```

## Main User Flows

### Customer flow

1. Register or log in as CUSTOMER.
2. Browse messes or meals.
3. Open meal details.
4. Select quantity and optional extras.
5. Continue to checkout.
6. Place order.
7. Track order history.
8. Submit or manage a review on a mess detail page.

### Owner flow

1. Register or log in as OWNER.
2. Open owner dashboard.
3. View owned mess cards.
4. Click one mess card.
5. Land on that specific mess dashboard route.
6. Open order detail pages, update order status, manage meals, and edit mess-specific profile data from the sidebar.

## Important Product Notes

### One owner, one active mess workflow

The current documentation, seed data, and UI flow are written around one-owner-one-mess usage. Some backend aggregation code can still handle multiple messes, but that is not the primary product workflow today.

### Extras support

Meals can display optional extras. These extras are selected in the meal detail modal and passed through checkout into the order payload.

### Auth behavior

- The frontend stores token and user in localStorage.
- Axios also sends credentials for cookie support.
- Profile-related 401 handling is intentionally softer than generic auth failures so profile checks do not immediately destroy the session.

## Local Setup

### Prerequisites

- Node.js 18+
- npm 9+
- Backend server running locally

### Install

```bash
npm install
```

### Environment Variables

Create a .env file in the frontend project root:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Run Development Server

```bash
npm run dev
```

Default Vite URL:

```text
http://localhost:5173
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Key Route Groups

### Shared routes

- /login
- /signup
- /contact
- /contact

### Customer routes

- /
- /home
- /meals
- /meals/:id
- /mess
- /mess/:id
- /orders
- /orders/:id
- /checkout
- /profile
- /profile/edit

### Owner routes

- /owner/dashboard
- /owner/create-mess
- /owner/complete-profile

### Mess management routes

- /mess/dashboard
- /mess/orders
- /mess/orders/:orderId
- /mess/create-meal
- /mess/profile
- /mess/:messId/dashboard
- /mess/:messId/orders
- /mess/:messId/orders/:orderId
- /mess/:messId/create-meal
- /mess/:messId/profile

## Service Layer Overview

The frontend talks to the backend through service modules in src/services.

Examples:

- auth.service.js handles login, logout, register, and local storage helpers
- meal.service.js handles meal endpoints
- order.service.js handles order CRUD and status APIs
- owner.service.js handles owner dashboard and mess-specific owner APIs
- review.service.js handles review loading and customer review mutations
- contact.service.js handles authenticated contact submission

This pattern keeps pages focused on UI and interaction while service files centralize HTTP details.

## Beginner Walkthrough

If you are new to the frontend, follow this order:

1. Read this README for product and setup context.
2. Read docs/README.md for the docs map.
3. Read docs/ARCHITECTURE.md to understand how the app is organized.
4. Read docs/ROUTING.md to understand route ownership and guards.
5. Start the frontend and backend together.
6. Log in using seeded customer and owner accounts.

## Related Documentation

- [docs/README.md](docs/README.md)
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/AUTHENTICATION.md](docs/AUTHENTICATION.md)
- [docs/ROUTING.md](docs/ROUTING.md)

## Integration Notes

This frontend expects the backend to expose the route groups documented in the backend README and Swagger docs. If the backend contract changes, service files and route-level data flows in this app should be updated together.

## Status

The frontend is actively evolving. Core customer and owner workflows are now implemented and the app builds successfully for production, but there are still platform-level hardening items left for a fully mature deployment, especially admin features, production environment configuration, and broader automated test coverage.