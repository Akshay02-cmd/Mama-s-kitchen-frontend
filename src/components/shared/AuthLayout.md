# AuthLayout Component Documentation

## 1. Introduction

The `AuthLayout` component is a reusable layout wrapper designed for authentication pages such as Login, Signup, Forgot Password, etc. It provides a consistent and visually appealing structure for all auth-related screens.

It includes branding, decorative UI elements, and a centered form container.

---

## 2. Purpose

The main objectives of this component are:

* To provide a consistent layout for authentication pages
* To enhance UI/UX with modern design elements
* To center and structure authentication forms
* To maintain branding across auth screens

---

## 3. Technologies Used

* React (Functional Component)
* lucide-react (Icons)
* JavaScript ES6+
* Tailwind CSS (Styling)

---

## 4. Props Description

| Prop Name  | Type      | Description                            |
| ---------- | --------- | -------------------------------------- |
| `title`    | String    | Main heading of the auth page          |
| `subtitle` | String    | Supporting description text            |
| `children` | ReactNode | Form or content rendered inside layout |

---

## 5. Component Structure

The layout is divided into three main sections:

### 5.1 Background Layer

* Gradient background
* Decorative blurred circles for modern UI feel

---

### 5.2 Header Section

Contains:

* App logo icon (`ChefHat`)
* Page title
* Subtitle description

Example:

```text
Login
Welcome back to your account
```

---

### 5.3 Form Container

* White card with rounded corners
* Shadow for elevation
* Hosts authentication forms via `children`

---

## 6. UI & Design Features

### 6.1 Background Design

* Gradient: orange → amber → red
* Decorative blurred circles for depth effect
* Fully responsive layout

---

### 6.2 Logo Section

* Circular gradient background
* ChefHat icon inside
* Represents food/meal theme branding

---

### 6.3 Typography

* Large bold title (page heading)
* Subtle subtitle text
* Clean and readable hierarchy

---

### 6.4 Form Styling

* Centered card layout
* Rounded corners (3xl)
* Soft shadow for modern look
* Padding for spacing consistency

---

## 7. User Flow

1. User navigates to auth page (Login/Register)
2. `AuthLayout` renders background and structure
3. Title and subtitle are displayed
4. Form is injected via `children`
5. User interacts with authentication form

---

## 8. Usage Example

```js
import AuthLayout from "./AuthLayout";

<AuthLayout 
  title="Login"
  subtitle="Welcome back! Please login to continue"
>
  <LoginForm />
</AuthLayout>
```

---

## 9. Layout Behavior

* Fully responsive design
* Center-aligned content
* Maintains consistent spacing across devices
* Prevents overflow with safe padding
* Decorative elements positioned absolutely

---

## 10. Design Highlights

* Modern gradient background
* Food-themed branding using ChefHat icon
* Glassmorphism-inspired form container
* Soft shadows and rounded UI elements
* Clean and professional auth experience

---

## 11. Edge Case Handling

* Safe rendering of `children` ensures flexibility
* Works with any authentication form
* Responsive design avoids layout breakage
* No external data dependency

---

## 12. Best Practices Followed

* Reusable layout component design
* Clear separation of UI structure and form logic
* Responsive and mobile-friendly layout
* Clean component composition using children prop
* Consistent branding across auth screens

---

## 13. Possible Improvements

* Add animation on form load (fade/slide)
* Add dark mode support
* Add background image customization
* Add multi-step auth support (wizard-style)
* Add error boundary handling for forms

---

## 14. Conclusion

The `AuthLayout` component provides a modern, visually appealing, and consistent structure for all authentication pages. It improves user experience by offering a clean UI, strong branding, and reusable layout architecture.
