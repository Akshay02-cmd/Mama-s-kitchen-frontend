import { Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/shared/ProtectedRoute.tsx";
import { useAuth } from "../hooks/shared";

// Customer Pages
import Home from "../pages/customer/Home.tsx";
import MealsListPage from "../pages/customer/MealsListPage.tsx";
import MealDetailPage from "../pages/customer/MealDetailPage.tsx";
import MyOrdersPage from "../pages/customer/MyOrdersPage.tsx";
import OrderDetailPage from "../pages/customer/OrderDetailPage.tsx";
import CheckoutPage from "../pages/customer/CheckoutPage.tsx";
import MessListPage from "../pages/customer/MessListPage.tsx";
import MessDetailPage from "../pages/customer/MessDetailPage.tsx";
import CustomerProfilePage from "../pages/customer/CustomerProfilePage.tsx";
import EditProfilePage from "../pages/customer/EditProfilePage.tsx";

const CustomerHomeGuard = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  // Owners should not browse customer meal discovery pages.
  if (isAuthenticated && user?.role === "OWNER") {
    return <Navigate to="/owner/dashboard" replace />;
  }

  return children;
};

/**
 * Customer Routes
 * Routes accessible to authenticated customers
 */
const CustomerRoutes = () => {
  return (
    <>
      {/* Public Home Routes - Accessible without authentication */}
      <Route
        path="/"
        element={
          <CustomerHomeGuard>
            <Home />
          </CustomerHomeGuard>
        }
      />
      <Route
        path="/home"
        element={
          <CustomerHomeGuard>
            <Home />
          </CustomerHomeGuard>
        }
      />

      {/* Meals Routes - Protected, require authentication */}
      <Route 
        path="/meals" 
        element={
          <ProtectedRoute requireRole="CUSTOMER">
            <MealsListPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/meals/:id" 
        element={
          <ProtectedRoute requireRole="CUSTOMER">
            <MealDetailPage />
          </ProtectedRoute>
        } 
      />
      <Route
        path="/menu"
        element={
          <ProtectedRoute requireRole="CUSTOMER">
            <MealsListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/menu/:id"
        element={
          <ProtectedRoute requireRole="CUSTOMER">
            <MealDetailPage />
          </ProtectedRoute>
        }
      />

      {/* Order Routes - Protected, require authentication and complete profile */}
      <Route 
        path="/orders" 
        element={
          <ProtectedRoute requireRole="CUSTOMER" requireProfileComplete={true}>
            <MyOrdersPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/orders/:id" 
        element={
          <ProtectedRoute requireRole="CUSTOMER" requireProfileComplete={true}>
            <OrderDetailPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/checkout" 
        element={
          <ProtectedRoute requireRole="CUSTOMER" requireProfileComplete={true}>
            <CheckoutPage />
          </ProtectedRoute>
        } 
      />

      {/* Mess Browsing Routes - Protected, require authentication */}
      <Route 
        path="/mess" 
        element={
          <ProtectedRoute requireRole="CUSTOMER">
            <MessListPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/mess/:id" 
        element={
          <ProtectedRoute requireRole="CUSTOMER">
            <MessDetailPage />
          </ProtectedRoute>
        } 
      />

      {/* Profile Routes - Protected, require authentication */}
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <CustomerProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile/edit" 
        element={
          <ProtectedRoute>
            <EditProfilePage />
          </ProtectedRoute>
        } 
      />
    </>
  );
};

export default CustomerRoutes;
