import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/shared';

/**
 * ProtectedRoute Component
 * 
 * Wrapper component that protects routes requiring authentication,
 * role-based access, and profile completion. Redirects to appropriate 
 * pages if conditions are not met.
 * 
 * @param {Object} props
 * @param {React.Component} props.children - The component to render if authorized
 * @param {boolean} props.requireProfileComplete - Whether the route requires complete profile (default: false)
 * @param {string} props.requireRole - Required user role (CUSTOMER, OWNER, MESS) - optional
 */
const ProtectedRoute = ({ children, requireProfileComplete = false, requireRole = null }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#8B5CF6' }}></div>
          <p style={{ color: '#6B7280' }}>Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requireRole && user?.role !== requireRole) {
    // Redirect to appropriate dashboard based on user's actual role
    if (user?.role === 'OWNER') {
      return <Navigate to="/owner/dashboard" replace />;
    } else if (user?.role === 'CUSTOMER') {
      return <Navigate to="/" replace />;
    }
    // Default fallback
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has correct role
  // Note: We don't check profile completion here anymore
  // Profile completion is checked only during login/register
  return children;
};

export default ProtectedRoute;
