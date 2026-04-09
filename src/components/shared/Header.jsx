import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, LogOut, Bell } from "lucide-react";
import { useState } from "react";
import { useAuth, useNotification } from "../../hooks/shared";
import logo from "../../assets/logo.png";
import defaultProfilePic from "../../assets/DefaulProfile.jpg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const profileImage = localStorage.getItem('profileImage');
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const navigate = useNavigate();
  const [notificationIndex, setNotificationIndex] = useState(0);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Demo: Cycle through different notification types on bell icon click
  const handleNotificationClick = () => {
    const notifications = [
      { type: 'success', message: 'Your order has been placed successfully!' },
      { type: 'error', message: 'Failed to process payment. Please try again.' },
      { type: 'warning', message: 'Your session will expire in 5 minutes.' },
      { type: 'info', message: 'New meals added to the menu. Check them out!' },
    ];
    
    const current = notifications[notificationIndex % notifications.length];
    
    switch (current.type) {
      case 'success':
        showSuccess(current.message);
        break;
      case 'error':
        showError(current.message);
        break;
      case 'warning':
        showWarning(current.message);
        break;
      case 'info':
        showInfo(current.message);
        break;
      default:
        showInfo(current.message);
    }
    
    setNotificationIndex(prev => prev + 1);
  };

  return (
    <header className="fixed top-0 w-full z-50 border-b transition-colors"
      style={{ 
        backgroundColor: '#FFFFFF',
        borderColor: '#E5E7EB'
      }}>
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex min-w-0 items-center gap-3">
            <img src={logo} alt="Mumma's Kitchen Logo" className="h-10 w-10 shrink-0 rounded-lg" />
            <div className="hidden min-w-0 sm:block">
              <h1 className="text-lg font-bold" style={{ color: '#111827' }}>
                Mumma's Kitchen
              </h1>
            </div>
          </div>

          {/* Search - Hidden on mobile, shown on desktop in center */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            {/* Search moved to page content */}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notifications - Click to see demo */}
            {isAuthenticated && (
              <button 
                onClick={handleNotificationClick}
                className="relative p-2 rounded-lg transition-colors hover:bg-gray-100"
                style={{
                  color: '#6B7280'
                }}
                title="Click to see notification demo"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            )}

            {/* Profile */}
            {isAuthenticated ? (
              <Link to="/profile" className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2"
                  style={{ borderColor: '#E5E7EB' }}>
                  <img
                    src={profileImage || defaultProfilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium transition-all sm:px-4 sm:text-base"
                style={{
                  backgroundColor: '#3B82F6',
                  color: '#FFFFFF'
                }}
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg transition"
              style={{ 
                color: '#6B7280'
              }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t"
          style={{ 
            backgroundColor: '#FFFFFF',
            borderColor: '#E5E7EB'
          }}>
          <nav className="px-4 py-4 space-y-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/home"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg transition font-medium"
                  style={{ 
                    color: '#111827'
                  }}
                >
                  Home
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg transition font-medium"
                  style={{ 
                    color: '#111827'
                  }}
                >
                  My Orders
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg transition font-medium"
                  style={{ 
                    color: '#111827'
                  }}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="block w-full text-left px-4 py-3 rounded-lg transition font-medium"
                  style={{ 
                    color: '#EF4444'
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-lg transition font-medium"
                style={{ 
                  color: '#111827'
                }}
              >
                Login / Sign Up
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
