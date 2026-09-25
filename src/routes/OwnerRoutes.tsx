import { Route } from "react-router-dom";
import ProtectedRoute from "../components/shared/ProtectedRoute.tsx";

// Owner Pages
import OwnerProfileCompletePage from "../pages/owner/OwnerProfileCompletePage.tsx";
import OwnerDashboard from "../pages/owner/OwnerDashboard.tsx";

/**
 * Owner Routes
 * Routes accessible only to users with OWNER role
 * All routes are protected and require OWNER role authentication
 */
const OwnerRoutes = () => {
  return (
    <>
      {/* Legacy operator profile completion for provisioned mess accounts */}
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

    </>
  );
};

export default OwnerRoutes;
