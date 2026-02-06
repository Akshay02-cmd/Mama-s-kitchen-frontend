# Project Architecture Visualization

## 🏗️ Complete Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Mama's Kitchen                            │
│                     Frontend Application                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                           │
        │              App.jsx                      │
        │         (Main Entry Point)                │
        │                                           │
        └─────────────────────┬─────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            │                 │                 │
            ▼                 ▼                 ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │   Context    │  │    Routes    │  │  Components  │
    │   Providers  │  │  (Organized) │  │   (Shared)   │
    └──────────────┘  └──────────────┘  └──────────────┘
            │                 │                 │
            │                 │                 │
    ┌───────┴────────┐       │         ┌───────┴────────┐
    │                │       │         │                │
    ▼                ▼       │         ▼                ▼
┌─────────┐   ┌──────────┐  │    ┌─────────┐    ┌─────────┐
│  Auth   │   │  Theme   │  │    │ Header  │    │ Footer  │
│ Context │   │ Context  │  │    │         │    │         │
└─────────┘   └──────────┘  │    └─────────┘    └─────────┘
                             │
                             │
            ┌────────────────┼────────────────┐
            │                │                │
            ▼                ▼                ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
    │   Customer   │ │    Owner     │ │     Mess     │
    │    Routes    │ │    Routes    │ │    Routes    │
    └──────────────┘ └──────────────┘ └──────────────┘
            │                │                │
            │                │                │
    ┌───────┴───────┐ ┌──────┴──────┐ ┌──────┴──────┐
    │               │ │             │ │             │
    ▼               ▼ ▼             ▼ ▼             ▼
┌─────────┐   ┌─────────┐ ┌─────────┐ ┌─────────┐
│Customer │   │ Owner   │ │  Mess   │ │ Shared  │
│  Pages  │   │  Pages  │ │  Pages  │ │  Pages  │
│ (10)    │   │  (3)    │ │  (3)    │ │  (3)    │
└─────────┘   └─────────┘ └─────────┘ └─────────┘
    │               │         │             │
    │               │         │             │
    ▼               ▼         ▼             ▼
┌─────────┐   ┌─────────┐ ┌─────────┐ ┌─────────┐
│Customer │   │ Owner   │ │  Mess   │ │ Shared  │
│Comps(14)│   │Comps (0)│ │Comps (0)│ │Comps(20)│
└─────────┘   └─────────┘ └─────────┘ └─────────┘
    │               │         │             │
    └───────────────┴─────────┴─────────────┘
                    │
                    ▼
          ┌──────────────────┐
          │                  │
          │    Services      │
          │    (8 files)     │
          │                  │
          └──────────────────┘
                    │
            ┌───────┴────────┐
            │                │
            ▼                ▼
      ┌──────────┐     ┌──────────┐
      │   Hooks  │     │  Utils   │
      │  (1 file)│     │ (1 file) │
      └──────────┘     └──────────┘
```

---

## 🎯 User Flow by Role

### Customer Journey
```
┌──────────┐
│  Login   │
│ /Signup  │
└────┬─────┘
     │
     ▼
┌──────────┐      ┌──────────┐      ┌──────────┐
│   Home   │ ───> │  Browse  │ ───> │   Meal   │
│   Page   │      │  Meals   │      │  Detail  │
└──────────┘      └──────────┘      └────┬─────┘
                                         │
                  ┌──────────┐           │
                  │  Browse  │           │
                  │  Messes  │           │
                  └────┬─────┘           │
                       │                 │
                       ▼                 ▼
                  ┌──────────┐      ┌──────────┐
                  │   Mess   │      │ Checkout │
                  │  Detail  │      │          │
                  └──────────┘      └────┬─────┘
                                         │
                                         ▼
                  ┌──────────┐      ┌──────────┐
                  │ Profile  │ <─── │   My     │
                  │   Edit   │      │  Orders  │
                  └──────────┘      └──────────┘
```

### Owner Journey
```
┌──────────┐
│  Signup  │
│ (OWNER)  │
└────┬─────┘
     │
     ▼
┌──────────┐
│ Complete │
│ Profile  │
└────┬─────┘
     │
     ▼
┌──────────┐      ┌──────────┐
│  Owner   │ ───> │  Create  │
│Dashboard │      │   Mess   │
└──────────┘      └──────────┘
     │
     │
┌────┴─────┐
│  View    │
│  Mess    │
│  Stats   │
└──────────┘
```

### Mess Journey
```
┌──────────┐
│  Login   │
│  (MESS)  │
└────┬─────┘
     │
     ▼
┌──────────┐      ┌──────────┐
│  Orders  │ ───> │  Create  │
│Dashboard │      │   Meal   │
└────┬─────┘      └──────────┘
     │
     ▼
┌──────────┐
│   Mess   │
│ Profile  │
└──────────┘
```

---

## 📂 Folder Organization Map

```
src/
│
├── 📁 pages/                    # All page components
│   ├── 📁 customer/            # Customer role pages
│   │   ├── 🏠 Home.jsx
│   │   ├── 🍽️  MealsListPage.jsx
│   │   ├── 🍜 MealDetailPage.jsx
│   │   ├── 📦 MyOrdersPage.jsx
│   │   ├── 📋 OrderDetailPage.jsx
│   │   ├── 💳 CheckoutPage.jsx
│   │   ├── 🏪 MessListPage.jsx
│   │   ├── 🏬 MessDetailPage.jsx
│   │   ├── 👤 CustomerProfilePage.jsx
│   │   └── ✏️  EditProfilePage.jsx
│   │
│   ├── 📁 owner/               # Owner role pages
│   │   ├── 📝 OwnerProfileCompletePage.jsx
│   │   ├── 📊 OwnerDashboard.jsx
│   │   └── ➕ CreateMessPage.jsx
│   │
│   ├── 📁 mess/                # Mess role pages
│   │   ├── 📦 MessOrdersDashboard.jsx
│   │   ├── 🍲 CreateMealPage.jsx
│   │   └── 🏪 MessProfilePage.jsx
│   │
│   └── 📁 shared/              # Shared pages
│       ├── 🔐 Login.jsx
│       ├── 📝 Signup.jsx
│       └── 📧 Contact.jsx
│
├── 📁 components/              # All UI components
│   ├── 📁 customer/           # Customer components (14 files)
│   ├── 📁 owner/              # Owner components (empty)
│   ├── 📁 mess/               # Mess components (empty)
│   └── 📁 shared/             # Shared components (20 files)
│
├── 📁 routes/                  # ✨ NEW! Route configs
│   ├── 🛣️  CustomerRoutes.jsx  # Customer routes
│   ├── 🛣️  OwnerRoutes.jsx     # Owner routes
│   ├── 🛣️  MessRoutes.jsx      # Mess routes
│   ├── 🛣️  SharedRoutes.jsx    # Shared routes
│   ├── 📦 index.js            # Central export
│   └── 📖 README.md           # Documentation
│
├── 📁 context/                 # Global state
│   ├── 🔐 AuthContext.jsx
│   ├── 🎨 ThemeContext.jsx
│   └── 📦 index.js            # ✨ NEW! Central export
│
├── 📁 hooks/                   # Custom hooks
│   └── 🪝 useAuth.js
│
├── 📁 services/                # API services
│   ├── 📁 api/
│   ├── 🔐 auth.service.js
│   ├── 🍽️  meal.service.js
│   ├── 🏪 mess.service.js
│   ├── 📦 order.service.js
│   ├── 👤 profile.service.js
│   ├── ⭐ review.service.js
│   ├── 📧 contact.service.js
│   ├── 👥 user.service.js
│   └── 📦 index.js
│
└── 📁 utils/                   # Utilities
    └── 📝 logger.js
```

---

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Interaction                      │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                  React Component                         │
│                    (Page/UI)                             │
└───────────────────────┬─────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Custom    │  │   Context   │  │   Local     │
│    Hooks    │  │  (Global)   │  │   State     │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       │                │                │
       └────────────────┼────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                  Service Layer                           │
│              (API Communication)                         │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                  Backend API                             │
│            (Mama's Kitchen Server)                       │
└─────────────────────────────────────────────────────────┘
```

---

## 🔒 Authentication & Protection Layers

```
┌─────────────────────────────────────────────────────────┐
│                     Public Routes                        │
│           / (Home), /login, /signup                      │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              Authentication Required                     │
│          ProtectedRoute (no role check)                  │
│     /meals, /mess, /profile, /contact, etc.             │
└───────────────────────┬─────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  CUSTOMER   │  │    OWNER    │  │    MESS     │
│   Routes    │  │   Routes    │  │   Routes    │
│             │  │             │  │             │
│ Profile     │  │ Dashboard   │  │ Dashboard   │
│ Complete    │  │ Required    │  │ (TODO)      │
│ Optional    │  │             │  │             │
└─────────────┘  └─────────────┘  └─────────────┘
```

---

## 📊 Component Hierarchy

```
App
 │
 ├── ErrorBoundary
 │    │
 │    └── Header (Shared)
 │         └── Navigation (Role-based)
 │
 ├── Routes (Role-separated)
 │    │
 │    ├── SharedRoutes
 │    │    ├── Login
 │    │    ├── Signup
 │    │    └── Contact
 │    │
 │    ├── CustomerRoutes
 │    │    ├── Home
 │    │    │    └── MealCard (×N)
 │    │    ├── MealsListPage
 │    │    │    ├── MealFilters
 │    │    │    ├── MealCard (×N)
 │    │    │    └── Pagination
 │    │    └── CustomerProfile
 │    │         ├── ProfileCard
 │    │         ├── ProfileStats
 │    │         └── QuickActions
 │    │
 │    ├── OwnerRoutes
 │    │    ├── OwnerDashboard
 │    │    │    └── Sidebar (Owner)
 │    │    └── CreateMessPage
 │    │         └── Form Components
 │    │
 │    └── MessRoutes
 │         ├── MessOrdersDashboard
 │         │    └── MessSidebar
 │         └── CreateMealPage
 │              └── MessSidebar
 │
 └── Footer (Shared)
```

---

## 🎨 Import Strategy Visualization

```
                    App.jsx
                       │
         ┌─────────────┼─────────────┐
         │             │             │
         ▼             ▼             ▼
    ./routes/     ./components/  ./context/
       │             shared/         │
       │                             │
    Import         Import         Import
    routes       Header/Footer   Providers
       │                             │
       └──────────┬──────────────────┘
                  │
                  ▼
            pages/[role]/
                  │
                  │
         ┌────────┼────────┐
         │        │        │
         ▼        ▼        ▼
    ../../    ../../    ../../
  components/ services/ hooks/
    [role]/
```

---

## ✅ Quality Checklist

- [x] **Pages**: Organized by role
- [x] **Components**: Separated by usage
- [x] **Routes**: Modular & role-based
- [x] **Context**: Centralized exports
- [x] **Imports**: All paths corrected
- [x] **Documentation**: Comprehensive guides
- [x] **Compilation**: Zero errors
- [x] **Dev Server**: Running successfully
- [x] **Architecture**: Scalable & maintainable

---

**Status**: ✅ **Production-Ready Architecture**

The project now has a **world-class folder structure** that supports:
- Easy navigation
- Team collaboration
- Feature isolation
- Rapid development
- Long-term maintenance
