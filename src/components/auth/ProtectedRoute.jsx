import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * ProtectedRoute Component
 * 
 * Wrapper component that protects routes requiring authentication
 * and profile completion. Redirects to appropriate pages if conditions
 * are not met.
 * 
 * @param {Object} props
 * @param {React.Component} props.children - The component to render if authorized
 * @param {boolean} props.requireProfileComplete - Whether the route requires complete profile (default: false)
 */
const ProtectedRoute = ({ children, requireProfileComplete = false }) => {
  const { user, isAuthenticated, profileComplete, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--gray-100)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--primary-500)' }}></div>
          <p style={{ color: 'var(--gray-700)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if profile completion is required
  if (requireProfileComplete && !profileComplete) {
    // Redirect to profile edit page to complete profile
    return <Navigate to="/profile/edit" state={{ from: location, requiresCompletion: true }} replace />;
  }

  // User is authenticated and (if required) has complete profile
  return children;
};

export default ProtectedRoute;
