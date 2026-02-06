import { Routes, Route } from "react-router-dom";

// Route Configurations
import { CustomerRoutes, OwnerRoutes, MessRoutes, SharedRoutes } from "./routes";

// Shared Components
import Header from "./components/shared/Header.jsx";
import Footer from "./components/shared/Footer.jsx";
import ErrorBoundary from "./components/shared/ErrorBoundary.jsx";
import NotificationContainer from "./components/shared/NotificationContainer.jsx";

// 404 Page Component
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" 
      style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4" style={{ color: 'var(--primary-500)' }}>404</h1>
        <p className="text-xl mb-4" style={{ color: 'var(--text-secondary)' }}>Page Not Found</p>
        <a href="/" className="px-6 py-3 rounded-lg" style={{ backgroundColor: 'var(--primary-500)', color: 'white' }}>
          Go Home
        </a>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <div className="App min-h-screen flex flex-col overflow-x-hidden" 
        style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <Header />
        <NotificationContainer />
        <main className="flex-1 pt-20">
          <Routes>
            {/* Shared Routes - Authentication and common pages */}
            {SharedRoutes()}

            {/* Customer Routes - Customer-facing functionality */}
            {CustomerRoutes()}

            {/* Owner Routes - Owner management functionality */}
            {OwnerRoutes()}

            {/* Mess Routes - Mess management functionality */}
            {MessRoutes()}

            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};
export default App;
