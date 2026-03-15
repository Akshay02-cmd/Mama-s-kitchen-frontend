import { Route } from "react-router-dom";
import ProtectedRoute from "../components/shared/ProtectedRoute.jsx";

// Mess Pages
import MessOrdersDashboard from "../pages/mess/MessOrdersDashboard.jsx";
import CreateMealPage from "../pages/mess/CreateMealPage.jsx";
import MessProfilePage from "../pages/mess/MessProfilePage.jsx";

/**
 * Mess Routes
 * Routes for mess management functionality
 * TODO: Add requireRole="MESS" when MESS role authentication is implemented
 */
const MessRoutes = () => {
  return (
    <>
      {/* Mess Orders Dashboard - Main landing page for mess managers */}
      <Route 
        path="/mess/dashboard" 
        element={
          <ProtectedRoute>
            <MessOrdersDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/mess/:messId/dashboard" 
        element={
          <ProtectedRoute>
            <MessOrdersDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Mess Orders - Alternative route to dashboard */}
      <Route 
        path="/mess/orders" 
        element={
          <ProtectedRoute>
            <MessOrdersDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/mess/:messId/orders" 
        element={
          <ProtectedRoute>
            <MessOrdersDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Create Meal - Form to add new meal to mess menu */}
      <Route 
        path="/mess/create-meal" 
        element={
          <ProtectedRoute>
            <CreateMealPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/mess/:messId/create-meal" 
        element={
          <ProtectedRoute>
            <CreateMealPage />
          </ProtectedRoute>
        } 
      />

      {/* Mess Profile - View and edit mess details */}
      <Route 
        path="/mess/profile" 
        element={
          <ProtectedRoute>
            <MessProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/mess/:messId/profile" 
        element={
          <ProtectedRoute>
            <MessProfilePage />
          </ProtectedRoute>
        } 
      />
    </>
  );
};

export default MessRoutes;
