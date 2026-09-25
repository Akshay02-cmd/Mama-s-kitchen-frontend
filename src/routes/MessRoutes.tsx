import { Route } from "react-router-dom";
import ProtectedRoute from "../components/shared/ProtectedRoute.tsx";

// Mess Pages
import MessOrdersDashboard from "../pages/mess/MessOrdersDashboard.tsx";
import CreateMealPage from "../pages/mess/CreateMealPage.tsx";
import MessProfilePage from "../pages/mess/MessProfilePage.tsx";
import MessOrderDetailPage from "../pages/mess/MessOrderDetailPage.tsx";

/**
 * Mess Routes
 * Routes for mess management functionality
 */
const MessRoutes = () => {
  return (
    <>
      {/* Mess Orders Dashboard - Main landing page for mess managers */}
      <Route 
        path="/mess/dashboard" 
        element={
          <ProtectedRoute requireRole="OWNER">
            <MessOrdersDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/mess/:messId/dashboard" 
        element={
          <ProtectedRoute requireRole="OWNER">
            <MessOrdersDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Mess Orders - Alternative route to dashboard */}
      <Route 
        path="/mess/orders" 
        element={
          <ProtectedRoute requireRole="OWNER">
            <MessOrdersDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/mess/:messId/orders" 
        element={
          <ProtectedRoute requireRole="OWNER">
            <MessOrdersDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/mess/orders/:orderId" 
        element={
          <ProtectedRoute requireRole="OWNER">
            <MessOrderDetailPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/mess/:messId/orders/:orderId" 
        element={
          <ProtectedRoute requireRole="OWNER">
            <MessOrderDetailPage />
          </ProtectedRoute>
        } 
      />

      {/* Create Meal - Form to add new meal to mess menu */}
      <Route 
        path="/mess/create-meal" 
        element={
          <ProtectedRoute requireRole="OWNER">
            <CreateMealPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/mess/:messId/create-meal" 
        element={
          <ProtectedRoute requireRole="OWNER">
            <CreateMealPage />
          </ProtectedRoute>
        } 
      />

      {/* Mess Profile - View and edit mess details */}
      <Route 
        path="/mess/profile" 
        element={
          <ProtectedRoute requireRole="OWNER">
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
