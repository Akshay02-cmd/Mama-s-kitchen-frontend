import { Route } from "react-router-dom";
import ProtectedRoute from "../components/shared/ProtectedRoute.jsx";

// Owner Pages
import OwnerProfileCompletePage from "../pages/owner/OwnerProfileCompletePage.jsx";
import OwnerDashboard from "../pages/owner/OwnerDashboard.jsx";
import CreateMessPage from "../pages/owner/CreateMessPage.jsx";

/**
 * Owner Routes
 * Routes accessible only to users with OWNER role
 * All routes are protected and require OWNER role authentication
 */
const OwnerRoutes = () => {
  return (
    <>
      {/* Owner Profile Completion - First step after owner signup */}
      <Route 
        path="/owner/complete-profile" 
        element={
          <ProtectedRoute requireRole="OWNER">
            <OwnerProfileCompletePage />
          </ProtectedRoute>
        } 
      />

      {/* Owner Dashboard - Main owner landing page */}
      <Route 
        path="/owner/dashboard" 
        element={
          <ProtectedRoute requireRole="OWNER">
            <OwnerDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Create Mess - Form to register a new mess */}
      <Route 
        path="/owner/create-mess" 
        element={
          <ProtectedRoute requireRole="OWNER">
            <CreateMessPage />
          </ProtectedRoute>
        } 
      />
    </>
  );
};

export default OwnerRoutes;
