# 🍽️ Mama's Kitchen - Frontend

[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

**Mama's Kitchen Frontend** is a modern, responsive web application built with React that connects customers with local home-based caterers and mess services in Nashik, India. Built with Vite for blazing-fast development and Tailwind CSS for beautiful, responsive design.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Pages & Routes](#-pages--routes)
- [Components](#-components)
- [Styling](#-styling)
- [Backend Integration](#-backend-integration)
- [Development](#-development)
- [Build & Deployment](#-build--deployment)
- [Contributing](#-contributing)

---

## ✨ Features

### Current Implementation

- ✅ **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- ✅ **Fast Development**: Vite-powered with Hot Module Replacement (HMR)
- ✅ **Responsive Design**: Mobile-first approach, works on all devices
- ✅ **React Router**: Client-side routing with React Router DOM v7
- ✅ **Component Library**: Reusable, modular components
- ✅ **Icon System**: Lucide React icons for consistent iconography
- ✅ **Authentication UI**: Login and signup pages
- ✅ **Landing Pages**: Home, About, Meals, and Contact pages
- ✅ **SEO Friendly**: Proper meta tags and semantic HTML

### Planned Features

- 🔜 **State Management**: Context API or Redux for global state
- 🔜 **API Integration**: Connect to Mama's Kitchen backend
- 🔜 **User Dashboard**: Customer and Owner dashboards
- 🔜 **Order Management**: Shopping cart and order placement
- 🔜 **Real-time Search**: Search and filter meals
- 🔜 **Payment Integration**: Razorpay payment gateway
- 🔜 **Reviews & Ratings**: Customer feedback system

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI library |
| **Vite** | 7.2.5 (Rolldown) | Build tool & dev server |
| **React Router DOM** | 7.11.0 | Client-side routing |
| **Tailwind CSS** | 4.1.18 | Utility-first CSS framework |
| **Lucide React** | 0.562.0 | Icon library |
| **ESLint** | 9.39.1 | Code linting |
| **PropTypes** | 15.8.1 | Runtime type checking |

---

## 📁 Project Structure

```
Mama-s-kitchen-frontend/
│
├── public/                    # Static assets
│
├── src/
│   ├── assets/               # Images, fonts, etc.
│   │
│   ├── components/           # Reusable components
│   │   ├── about/           # About page components
│   │   ├── auth/            # Authentication components
│   │   ├── common/          # Common/shared components
│   │   ├── contact/         # Contact page components
│   │   └── meals/           # Meals page components
│   │
│   ├── context/             # React Context providers
│   ├── pages/               # Page components
│   ├── routes/              # Route configurations
│   │
│   ├── App.jsx              # Main app component
│   ├── index.css            # Global styles
│   └── main.jsx             # Application entry point
│
├── .gitignore              # Git ignore rules
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── README.md               # This file
└── vite.config.js          # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Akshay02-cmd/Mama-s-kitchen-frontend.git
   cd Mama-s-kitchen-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   Navigate to http://localhost:5173
   ```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000

# Application Settings
VITE_APP_NAME=Mama's Kitchen
```

**Note:** All Vite environment variables must be prefixed with `VITE_`

---

## 📜 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

---

## 🗺️ Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home.jsx | Landing page with hero and features |
| `/about` | AboutPage.jsx | About us and how it works |
| `/meals` | Meals.jsx | Browse available meals |
| `/contact` | Contact.jsx | Contact form and information |
| `/login` | Login.jsx | User login page |
| `/signup` | Signup.jsx | User registration page |

---

## 🧩 Components

### Common Components
- **Header.jsx** - Navigation bar
- **Footer.jsx** - Site footer

### Authentication Components
- **AuthLayout.jsx** - Auth page wrapper
- **FormInput.jsx** - Form input field
- **Button.jsx** - Reusable button
- **Divider.jsx** - OR divider
- **SocialLoginButton.jsx** - Social login buttons

### Meal Components
- **MealCard.jsx** - Individual meal card
- **MealFilters.jsx** - Meal filtering
- **MealsHeader.jsx** - Meals page header

### About Components
- **HeroSection.jsx** - Hero banner
- **FeatureCard.jsx** - Feature display
- **HowItWokrs.jsx** - Process steps

---

## 🎨 Styling

### Tailwind CSS

This project uses **Tailwind CSS v4** configured in `vite.config.js`.

**Primary Colors:**
- Amber: `amber-500` (brand color)
- Orange: `orange-500` (accents)
- Gray: `gray-900` (text)

**Responsive Breakpoints:**
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

---

## 🔌 Backend Integration

To connect with the backend API:

1. Set `VITE_API_BASE_URL` in `.env`
2. Create API service (see backend docs)
3. Use axios for HTTP requests

**Backend Repository:** [Mama's Kitchen Backend](https://github.com/Akshay02-cmd/Mama-s-kitchen-backend)

**API Documentation:** See backend `API_DOCUMENTATION.md`

---

## 💻 Development

### Code Style
- Use functional components with hooks
- Use PropTypes for type checking
- Follow ESLint rules
- Use meaningful variable names

### Component Structure
```jsx
import PropTypes from 'prop-types';

const MyComponent = ({ prop1 }) => {
  return <div>{prop1}</div>;
};

MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired
};

export default MyComponent;
```

---

## 🏗️ Build & Deployment

### Production Build
```bash
npm run build
# Output: dist/
```

### Deployment Options
- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature/name`
5. Open Pull Request

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Akshay02-cmd/Mama-s-kitchen-frontend/issues)
- **Backend**: [Mama's Kitchen Backend](https://github.com/Akshay02-cmd/Mama-s-kitchen-backend)

---

## 👥 Authors

- **Akshay Patil** - [@Akshay02-cmd](https://github.com/Akshay02-cmd)
- **TechRedy IT Solutions**

---

**Made with ❤️ in Nashik, India**
