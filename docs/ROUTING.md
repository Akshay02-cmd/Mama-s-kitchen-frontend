# Frontend Routing

## Overview

Routing is built with React Router and is organized by role and feature responsibility.

The route setup is intentionally split into four files so that each part of the app is easier to reason about:

- SharedRoutes.jsx
- CustomerRoutes.jsx
- OwnerRoutes.jsx
- MessRoutes.jsx

## Full Route Map

### Public and shared

- /login
- /signup

### Shared protected

- /contact

### Customer-facing

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

### Owner-facing overview

- /owner/dashboard
- /owner/create-mess
- /owner/complete-profile

### Mess management

- /mess/dashboard
- /mess/orders
- /mess/create-meal
- /mess/profile
- /mess/:messId/dashboard
- /mess/:messId/orders
- /mess/:messId/create-meal
- /mess/:messId/profile

### Fallback

- *

## Route Intent by Group

### SharedRoutes

Use this file for pages that are not tightly coupled to a single role domain.

Current examples:

- login
- signup
- contact

### CustomerRoutes

Use this file for customer browsing and ordering features.

Key idea:

- customers browse public content after authentication
- checkout and orders live here because they are customer-driven workflows

### OwnerRoutes

Use this file for owner-level overview pages.

Examples:

- owner dashboard
- create mess
- owner profile completion

### MessRoutes

Use this file for pages that operate on a specific mess management context.

Examples:

- mess dashboard
- mess orders
- create meal
- mess profile

This route group now supports both generic and mess-specific paths.

## Current Owner to Mess Flow

The current intended owner flow is:

1. Owner logs in.
2. Owner opens /owner/dashboard.
3. Owner sees owned mess cards.
4. Clicking a card routes to /mess/:messId/dashboard.
5. The sidebar keeps navigation inside the same mess scope.

That flow is important because it reflects the current product decision to operate one selected mess at a time, even if backend aggregation can still see more than one mess.

## Route Protection

Routes are wrapped by ProtectedRoute where needed.

ProtectedRoute currently handles:

- loading state while auth state resolves
- redirect to /login when user is not authenticated
- simple role-based redirects when requireRole is present

Important current detail:

- requireProfileComplete exists in route definitions but is not the main enforcement logic inside ProtectedRoute today

So if you are adding a feature that truly depends on completed profile data, check the page flow and auth context behavior rather than assuming the route wrapper alone enforces it.

## Mess-Aware URLs

The mess management area now supports parameterized URLs.

Examples:

- /mess/123/dashboard
- /mess/123/orders
- /mess/123/create-meal
- /mess/123/profile

Benefits:

- explicit selected mess context in the URL
- easier deep linking
- sidebar links can stay scoped to the selected mess
- owner workflow is clearer for future scaling

## Navigation Patterns

### Owner dashboard to mess dashboard

Owner mess cards navigate to a selected mess dashboard route.

### Sidebar navigation

Mess sidebar reads messId from route params and builds links using that selected context when available.

### Checkout navigation

Meal detail modal navigates to checkout using route state, passing:

- meal
- quantity
- selectedExtras

That means checkout depends on prior navigation state. If the page is refreshed without that state, it falls back out of the checkout flow.

## Guidelines for Adding New Routes

When adding a route, ask these questions first:

1. Is it shared, customer, owner, or mess-specific?
2. Does it require authentication?
3. Does it require a specific role?
4. Does it need a URL param such as messId or mealId?
5. Will sidebar or navigation links need to preserve that param?

If the route acts on a selected mess, prefer placing it in MessRoutes and using a messId path segment.

## Common Routing Pitfalls

### Using the wrong list path

Customer mess browsing lives at /mess, not /messes.

### Losing mess context

If you navigate from a selected mess page to a generic /mess/... route, you can accidentally drop the messId context. Use mess-aware links when operating inside the mess dashboard area.

### Assuming profile-complete enforcement is centralized

Do not rely only on requireProfileComplete in the route config. Check actual page and auth flow behavior.

## Recommended Reading After This File

- [ARCHITECTURE.md](ARCHITECTURE.md)
- [../README.md](../README.md)