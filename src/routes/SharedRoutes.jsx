import { Route } from "react-router-dom";
import ProtectedRoute from "../components/shared/ProtectedRoute.jsx";

// Shared Pages
import Contact from "../pages/shared/Contact.jsx";
import Login from "../pages/shared/Login.jsx";
import Signup from "../pages/shared/Signup.jsx";

/**
 * Shared Routes
 * Routes accessible across all user roles
 * Includes authentication pages and common functionality
 */
const SharedRoutes = () => {
  return (
    <>
      {/* Authentication Routes - Public access */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Contact Route - Protected, requires authentication */}
      <Route 
        path="/contact" 
        element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        } 
      />
    </>
  );
};

export default SharedRoutes;
