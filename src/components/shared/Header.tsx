import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, LogOut, Bell, UtensilsCrossed } from "lucide-react";
import { useState } from "react";
import { useAuth, useNotification } from "../../hooks/shared";
import logo from "../../assets/logo.png";
import defaultProfilePic from "../../assets/DefaulProfile.jpg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
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
    <header className="fixed top-0 z-50 w-full border-b bg-[#fffaf5]/95 backdrop-blur-md"
      style={{ 
        borderColor: 'var(--border-light)'
      }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <div className="flex min-w-0 items-center gap-3">
            <img src={logo} alt="Mumma's Kitchen" className="h-10 w-10 shrink-0 rounded-xl object-cover" />
            <h1 className="font-display hidden truncate text-xl font-bold text-stone-900 sm:block">Mumma's Kitchen</h1>
          </div>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary navigation">
            {!isAuthenticated && <NavLink to="/meals" className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-semibold ${isActive ? 'bg-orange-50 text-orange-700' : 'text-stone-600 hover:bg-orange-50 hover:text-orange-700'}`}>Menu</NavLink>}
            {isAuthenticated && user?.role === 'CUSTOMER' && <>
              <NavLink to="/meals" className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-semibold ${isActive ? 'bg-orange-50 text-orange-700' : 'text-stone-600 hover:bg-orange-50 hover:text-orange-700'}`}>Menu</NavLink>
              <NavLink to="/orders" className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-semibold ${isActive ? 'bg-orange-50 text-orange-700' : 'text-stone-600 hover:bg-orange-50 hover:text-orange-700'}`}>Orders</NavLink>
              <NavLink to="/profile" className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-semibold ${isActive ? 'bg-orange-50 text-orange-700' : 'text-stone-600 hover:bg-orange-50 hover:text-orange-700'}`}>Profile</NavLink>
            </>}
            {isAuthenticated && user?.role === 'OWNER' && <>
              <NavLink to="/mess/dashboard" className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-semibold ${isActive ? 'bg-orange-50 text-orange-700' : 'text-stone-600 hover:bg-orange-50 hover:text-orange-700'}`}>Kitchen</NavLink>
              <NavLink to="/mess/orders" className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-semibold ${isActive ? 'bg-orange-50 text-orange-700' : 'text-stone-600 hover:bg-orange-50 hover:text-orange-700'}`}>Orders</NavLink>
              <NavLink to="/mess/create-meal" className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-semibold ${isActive ? 'bg-orange-50 text-orange-700' : 'text-stone-600 hover:bg-orange-50 hover:text-orange-700'}`}>Create Meal</NavLink>
              <NavLink to="/profile" className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-semibold ${isActive ? 'bg-orange-50 text-orange-700' : 'text-stone-600 hover:bg-orange-50 hover:text-orange-700'}`}>Profile</NavLink>
            </>}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3">
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
              <Link to="/profile" className="hidden items-center gap-2 sm:flex" aria-label="Open profile">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2"
                  style={{ borderColor: 'var(--border-light)' }}>
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
                className="rounded-xl bg-orange-600 px-3 py-2 text-sm font-bold text-white hover:bg-orange-700 sm:px-4 sm:text-base"
                style={{
                }}
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-xl p-2 text-stone-600 hover:bg-orange-50 md:hidden"
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
                {(user?.role === 'CUSTOMER' ? [
                  ['/home', 'Home'], ['/meals', 'Menu'], ['/orders', 'Orders'], ['/profile', 'Profile'],
                ] : [
                  ['/mess/dashboard', 'Kitchen'], ['/mess/orders', 'Orders'], ['/mess/create-meal', 'Create Meal'], ['/profile', 'Profile'],
                ]).map(([path, label]) => <Link key={path} to={path} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-stone-700 hover:bg-orange-50">{label}</Link>)}
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
              <>
                <Link
                  to="/meals"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-stone-700 hover:bg-orange-50"
                >
                  <UtensilsCrossed className="h-5 w-5" />
                  Menu
                </Link>
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
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
