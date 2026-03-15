# Frontend Architecture

## Overview

The frontend is a React single-page application organized around route-level pages, reusable components, context providers, and a small service layer for backend API communication.

The app uses a pragmatic architecture rather than a heavy framework structure:

1. App.jsx defines the page shell and mounts route groups.
2. Routes are split by domain and role.
3. Pages orchestrate data fetching and UI composition.
4. Components render reusable feature UI.
5. Services wrap backend endpoints.
6. Context providers expose auth, theme, and notification state.

## High-Level Flow

```text
Browser
  -> main.jsx
  -> App.jsx
  -> route group
  -> page component
  -> service call
  -> axios client
  -> backend API
```

## Directory Responsibilities

```text
src/
  main.jsx
    Bootstraps React and router.

  App.jsx
    Renders shared layout, route groups, error boundary, notifications.

  components/
    Reusable UI pieces. Split by customer, owner, and shared concerns.

  pages/
    Route-level screens. Pages coordinate data and compose components.

  routes/
    Route configuration modules: SharedRoutes, CustomerRoutes, OwnerRoutes, MessRoutes.

  services/
    HTTP abstraction over backend endpoints.

  context/
    Auth, theme, and notification providers.

  hooks/
    Thin convenience hooks that read contexts or feature-specific behavior.

  utils/
    Logging and small helpers.
```

## Application Shell

The application shell is defined in App.jsx.

It is responsible for:

- rendering the shared header and footer
- mounting notification UI
- rendering routes
- wrapping the app in an error boundary

This means most pages only need to care about their own content and data, not global layout.

## Route Organization

The app is intentionally split into four route modules:

- SharedRoutes: login, signup, shared access pages
- CustomerRoutes: customer-facing browsing, checkout, orders, profiles
- OwnerRoutes: owner-level overview actions such as owner dashboard and create mess
- MessRoutes: mess-specific operational pages such as dashboard, orders, create meal, and mess profile

That split makes it easier to reason about access and feature boundaries.

## State Management Model

The app does not use Redux or another heavy state library. State is split by responsibility.

### Context state

- AuthContext for logged-in user and auth actions
- ThemeContext for theme preferences
- NotificationContext for user-facing notifications

### Page-local state

Pages and feature components use useState for UI-specific interaction such as filters, modal state, selected extras, and loading flags.

### Server state

Data from the backend is fetched imperatively in pages and stored locally in component state.

## Auth Architecture

AuthContext is the frontend source of truth for whether a user is logged in.

Important behavior:

- user is initialized from localStorage
- login stores token and user via auth service
- logout clears frontend state and backend cookie session
- isAuthenticated is derived from user presence

ProtectedRoute uses that context to guard route access.

### Important current behavior

ProtectedRoute still accepts requireProfileComplete, but profile completion is not centrally enforced inside ProtectedRoute today. Some profile-completion behavior is instead handled during login and page flows. New contributors should know this because the prop exists in route definitions but is not the main enforcement mechanism right now.

## API Layer

The API layer is organized in two levels.

### api/apiClient.js

Shared Axios instance with:

- baseURL from VITE_API_BASE_URL
- withCredentials enabled
- request interceptor for bearer token header
- response interceptor for centralized auth and error handling

### service files

Each service groups related endpoints.

Examples:

- auth.service.js
- profile.service.js
- mess.service.js
- meal.service.js
- order.service.js
- owner.service.js
- review.service.js
- contact.service.js

This separation keeps HTTP details out of page components.

## Feature Architecture

### Customer features

Customer pages focus on discovery and ordering.

Key pieces:

- Mess list and mess detail
- Meal list and meal detail modal
- Checkout page
- Order history and order details
- Review list plus review create, edit, and delete on mess detail
- Customer profile and edit profile pages
- Authenticated contact form submission

### Owner features

Owner flow is intentionally split into two layers:

- owner-level overview pages
- mess-specific operational pages

Owner dashboard shows mess cards. Clicking a mess card routes into a selected mess dashboard URL. From there, the mess sidebar keeps navigation scoped to that mess.

Mess-specific pages now also include a dedicated owner order detail view and in-page mess profile editing.

### Extras flow

Extras are a cross-feature concern and one of the most important recent product additions.

The frontend behavior is:

1. Meal data includes extras.
2. Meal detail modal lets the user select extras.
3. Checkout receives selected extras through route state.
4. Order payload includes selectedExtras per item.

This is why these files are closely related:

- components/customer/MealCard.jsx
- components/customer/MealDetailModal.jsx
- pages/customer/CheckoutPage.jsx
- services/order.service.js

## Review and Contact Flows

### Reviews

Review data is loaded directly inside the mess detail page.

Current behavior:

1. page loads mess and meal data
2. page requests reviews filtered by mess id
3. customer can create one review
4. customer can edit or delete their own review

This flow currently depends on these files:

- pages/customer/MessDetailPage.jsx
- services/review.service.js

### Contact

The shared contact page now performs a real API submission instead of a placeholder timeout.

This flow currently depends on these files:

- pages/shared/Contact.jsx
- components/shared/ContactForm.jsx
- services/contact.service.js

## Design System Approach

The UI uses a combination of:

- Tailwind utility classes
- inline style objects for project-specific palette values
- CSS variables from global styles

This is not a formal design system yet, but it is consistent enough to follow an existing visual language.

## How to Add a New Feature Safely

Recommended order:

1. Define or confirm backend contract.
2. Add or update service wrapper.
3. Build page state and effect logic.
4. Add or update reusable components.
5. Wire route if needed.
6. Validate auth/role behavior.
7. Update documentation.

## Mental Model for New Developers

When something breaks, debug by ownership:

- route not reachable: routes/
- redirect issue: ProtectedRoute or auth state
- wrong request payload: page or service file
- wrong response handling: page logic or service mapping
- wrong UI state: local page/component state
- wrong header/token behavior: apiClient or auth service

That framing makes this frontend much easier to work with.