# Frontend Authentication

## Overview

The frontend authentication model is intentionally simple:

- `AuthContext` is the app-level source of truth for the current user
- auth data is initialized from `localStorage`
- API requests also send the JWT as a bearer token
- axios is configured with `withCredentials: true` so cookie-based auth still works

This means the app currently uses both browser cookie support and explicit token storage.

## Main Pieces

### AuthContext

File:

```text
src/context/AuthContext.jsx
```

Responsibilities:

- initialize user state from stored auth data
- expose `register`, `login`, and `logout`
- expose `isAuthenticated`
- expose profile-completion helpers used by some flows

The context stores:

- `user`
- `loading`
- `profileComplete`
- `isAuthenticated`

### useAuth hook

The app reads auth state through the shared auth hook rather than importing the context directly in most components.

### ProtectedRoute

File:

```text
src/components/shared/ProtectedRoute.jsx
```

Responsibilities:

- wait while auth state is resolving
- redirect unauthenticated users to `/login`
- enforce `requireRole` when present

Important current behavior:

- `requireProfileComplete` still appears in route declarations
- `ProtectedRoute` explicitly does not enforce profile completion anymore

That matters because a route can look profile-protected in configuration while the real enforcement happens in page flow or login flow instead.

## Storage Model

### Local storage

The frontend expects auth service helpers to persist:

- `token`
- `user`

`AuthContext` initializes from that stored user on first render.

### Cookie support

The backend writes an `httpOnly` `token` cookie on login and registration.

The frontend keeps `withCredentials: true` enabled so requests can carry that cookie when available.

## API Client Behavior

File:

```text
src/services/api/apiClient.js
```

Current behavior:

1. read `VITE_API_BASE_URL`
2. enable `withCredentials: true`
3. add `Authorization: Bearer <token>` if a token exists in `localStorage`
4. normalize common error responses

This is why the app works even though auth is split across both local storage and cookie transport.

## 401 Handling Nuance

The axios response interceptor is intentionally selective.

### Generic 401 behavior

For most non-auth endpoints:

- clear `token`
- clear `user`
- redirect to `/login`

### Profile endpoint exception

For `/profile/...` endpoints:

- do not immediately clear auth state
- do not immediately force logout

Reason:

- profile checks can legitimately fail while the user is still authenticated
- a missing or incomplete profile should not automatically destroy the session

This is one of the most important implementation details in the frontend auth layer.

## Login and Logout Flow

### Login

`AuthContext.login(credentials)`:

1. calls the auth service
2. receives `user` and `token`
3. updates context user state
4. leaves redirect decisions to the calling page flow

### Register

`AuthContext.register(userData)` follows the same pattern and updates context user state if registration succeeds.

### Logout

`AuthContext.logout()`:

1. calls backend logout
2. clears local auth state
3. clears profile-completion state

Even if the logout API call fails, the context still clears local auth state.

## Profile Completion Behavior

`AuthContext` exposes `checkProfileCompletion()`.

Current behavior:

- fetch customer profile for `CUSTOMER`
- fetch owner profile for `OWNER`
- read `profile.isProfileCompleted === true`
- return `false` if the profile is missing or the request fails

This helper is used only when needed. It is not the same thing as route protection.

## Route Protection Model

Current route protection should be read like this:

- logged-in requirement: centralized in `ProtectedRoute`
- role requirement: centralized in `ProtectedRoute`
- profile-completion requirement: partially decentralized and flow-dependent

That means when a page truly depends on completed profile data, you should inspect both:

- the route declaration
- the page or auth-context logic

## Owner and Customer Differences

### Customer

- can browse meals and messes after authentication
- order and checkout flows may still call profile-completion checks

### Owner

- owner-only routes use `requireRole="OWNER"`
- owner dashboard is the entry point for selecting a mess context

### Contact route

- `/contact` is a protected shared page
- authenticated customers and owners can both submit the contact form
- backend attaches the authenticated user id during submission

## Known Tradeoffs

### Why both cookie and bearer token are used

This is not the cleanest long-term design, but it is practical for the current stack:

- cookies let the backend support browser-based auth naturally
- bearer tokens make frontend API calls explicit and easy to debug

### Why profile enforcement is not centralized

The app evolved past an earlier assumption that `ProtectedRoute` should enforce everything. The current code deliberately keeps auth protection centralized but leaves some workflow requirements to the page layer.

## Troubleshooting

### User gets logged out unexpectedly

Check:

- whether the failing request returned a generic `401`
- whether the failing endpoint was a profile endpoint or not
- whether the token in `localStorage` is missing or stale

### Profile page fails but session should stay alive

Check:

- response handling in `apiClient.js`
- the specific profile service call
- whether the backend returned `401` or `404`

### Route looks protected but incomplete profiles still pass through

Check:

- `ProtectedRoute.jsx`
- `AuthContext.checkProfileCompletion()`
- the page component using that route