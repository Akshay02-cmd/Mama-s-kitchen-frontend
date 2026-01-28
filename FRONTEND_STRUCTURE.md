# Mama's Kitchen Frontend - Current Structure

**Last Updated:** January 28, 2026

## 📁 Project Overview

This document provides a comprehensive overview of the current frontend structure, including all pages, components, and configurations.

---

## 🗂️ Directory Structure

```
Mama-s-kitchen-frontend/
├── public/                     # Public assets
├── src/
│   ├── assets/                 # Images and media files
│   │   ├── bg.png
│   │   ├── DefaulProfile.jpg
│   │   ├── logo.png
│   │   └── react.svg
│   ├── components/             # Reusable components
│   │   ├── about/              # About page components
│   │   │   ├── AboutIntro.jsx
│   │   │   ├── CallToAction.jsx
│   │   │   ├── FeatureCard.jsx
│   │   │   ├── FeatureSection.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── HowItWokrs.jsx
│   │   │   └── StepCard.jsx
│   │   ├── auth/               # Authentication components
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Divider.jsx
│   │   │   ├── FormInput.jsx
│   │   │   └── SocialLoginButton.jsx
│   │   ├── common/             # Common/shared components
│   │   │   ├── Footer.jsx
│   │   │   └── Header.jsx
│   │   ├── contact/            # Contact page components
│   │   │   ├── ContactForm.jsx
│   │   │   ├── ContactHeader.jsx
│   │   │   ├── ContactInfo.jsx
│   │   │   └── index.js
│   │   └── meals/              # Meals page components
│   │       ├── index.js
│   │       ├── MealCard.jsx
│   │       ├── MealFilters.jsx
│   │       └── MealsHeader.jsx
│   ├── context/                # React Context for state management (empty)
│   ├── pages/                  # Page components
│   │   ├── AboutPage.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Meals.jsx
│   │   └── Signup.jsx
│   ├── routes/                 # Route configuration (empty)
│   ├── App.jsx                 # Main app component with routes
│   ├── index.css               # Global styles
│   └── main.jsx                # App entry point
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
└── vite.config.js              # Vite configuration
```

---

## 📄 Pages

### 1. **Home** (`/`)
- **File:** `src/pages/Home.jsx`
- **Features:**
  - Hero section with background image
  - "Explore Meals" and "Learn More" CTAs
  - "How It Works" section (4-step process)
  - Features section
  - Statistics section
  - Call-to-action section

### 2. **About** (`/about`)
- **File:** `src/pages/AboutPage.jsx`
- **Components used:**
  - AboutIntro
  - HeroSection
  - FeatureSection
  - HowItWorks
  - CallToAction

### 3. **Meals** (`/meals`)
- **File:** `src/pages/Meals.jsx`
- **Components used:**
  - MealsHeader
  - MealFilters
  - MealCard (grid display)
- **Features:**
  - Search functionality
  - Filter by meal type, category, price range
  - Sort options
  - Mock meal data display

### 4. **Contact** (`/contact`)
- **File:** `src/pages/Contact.jsx`
- **Components used:**
  - ContactHeader
  - ContactForm
  - ContactInfo

### 5. **Login** (`/login`)
- **File:** `src/pages/Login.jsx`
- **Features:**
  - Email/password login
  - Role selection (Customer/Owner)
  - Show/hide password
  - Form validation
  - Social login buttons (Google, Facebook)
  - Link to signup page

### 6. **Signup** (`/signup`)
- **File:** `src/pages/Signup.jsx`
- **Features:**
  - Name, email, password fields
  - Password confirmation
  - Role selection (Customer/Owner)
  - Terms and conditions checkbox
  - Form validation
  - Social login buttons
  - Link to login page

---

## 🧩 Components

### Common Components
- **Header:** Fixed navigation with logo, nav links, "Order Now" button, profile icon
- **Footer:** Company info, quick links, contact details

### Auth Components
- **AuthLayout:** Wrapper for auth pages with consistent styling
- **FormInput:** Reusable form input with validation and icons
- **Button:** Styled button component with loading state
- **SocialLoginButton:** Button for Google/Facebook login
- **Divider:** "OR" divider for separating auth options

### About Components
- **AboutIntro:** Introduction section
- **HeroSection:** Hero banner
- **FeatureSection:** Features grid
- **FeatureCard:** Individual feature card
- **HowItWorks:** Process explanation
- **StepCard:** Individual step card
- **CallToAction:** CTA section

### Contact Components
- **ContactHeader:** Contact page header
- **ContactForm:** Form with name, email, subject, message
- **ContactInfo:** Contact details with icons

### Meals Components
- **MealsHeader:** Search bar
- **MealFilters:** Filter and sort options
- **MealCard:** Individual meal display card

---

## 🔧 Dependencies

### Production
- **React** (19.2.0): UI library
- **React DOM** (19.2.0): React rendering
- **React Router DOM** (7.11.0): Client-side routing
- **Tailwind CSS** (4.1.18): Utility-first CSS framework
- **Lucide React** (0.562.0): Icon library
- **Prop Types** (15.8.1): Type checking for props

### Development
- **Vite**: Build tool and dev server
- **ESLint**: Code linting
- **TypeScript types**: Type definitions for React

---

## 🎨 Styling

- **Framework:** Tailwind CSS v4.1.18
- **Approach:** Utility-first CSS with custom configurations
- **Color Scheme:**
  - Primary: Orange/Amber (#F97316, #F59E0B)
  - Background: White, Gray shades
  - Text: Gray-900, Gray-700, Gray-600

---

## 🛣️ Routing

Configured in `App.jsx` using React Router DOM:

```jsx
/ → Home
/about → AboutPage
/meals → Meals
/contact → Contact
/login → Login
/signup → Signup
```

---

## 🚀 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

---

## 📋 To-Do / Missing Features

### 1. **API Integration**
- [ ] Create API service layer (`src/services/api.js`)
- [ ] Configure base URL and axios instance
- [ ] Create auth service (`src/services/authService.js`)
- [ ] Create meal service (`src/services/mealService.js`)
- [ ] Create order service (`src/services/orderService.js`)
- [ ] Create mess service (`src/services/messService.js`)

### 2. **State Management**
- [ ] Create AuthContext (`src/context/AuthContext.jsx`)
- [ ] Create CartContext (if needed)
- [ ] Create ThemeContext (if needed)

### 3. **Authentication Flow**
- [ ] Connect login to backend API
- [ ] Connect signup to backend API
- [ ] Implement token storage (localStorage/sessionStorage)
- [ ] Add protected routes
- [ ] Add auth redirect logic

### 4. **Additional Pages**
- [ ] Profile page
- [ ] Order history page
- [ ] Mess details page
- [ ] Cart/checkout page
- [ ] Dashboard (for owners)
- [ ] 404 Not Found page

### 5. **Utilities**
- [ ] Create utility functions (`src/utils/`)
- [ ] Add form validation helpers
- [ ] Add date/time formatters
- [ ] Add price formatters

### 6. **Environment Configuration**
- [ ] Create `.env` file for API URLs
- [ ] Configure environment variables

---

## 🔐 Environment Variables Needed

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Mama's Kitchen
```

---

## 📦 Assets

Current assets in `src/assets/`:
- `logo.png`: Application logo
- `bg.png`: Background image
- `DefaulProfile.jpg`: Default profile picture
- `react.svg`: React logo

---

## 🏗️ Next Steps for Full Integration

1. **Set up API services** to connect with backend
2. **Create context providers** for global state
3. **Implement authentication flow** with token management
4. **Add protected routes** for authenticated users
5. **Create additional pages** (Profile, Orders, Dashboard)
6. **Add error handling** and loading states
7. **Implement real data fetching** instead of mock data
8. **Add form submission** to backend APIs
9. **Set up environment variables**
10. **Add proper error boundaries**

---

**Note:** This document reflects the current state of the frontend. Update this file as new components and pages are added.
