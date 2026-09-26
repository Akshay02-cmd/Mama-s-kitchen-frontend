import { Link, useLocation } from 'react-router-dom';
import { Home, UtensilsCrossed, ShoppingBag, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../hooks/shared';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const navItems = user?.role === 'OWNER'
    ? [{ path: '/mess/dashboard', icon: LayoutDashboard, label: 'Kitchen' }, { path: '/profile', icon: User, label: 'Profile' }]
    : [{ path: '/home', icon: Home, label: 'Home' }, { path: '/meals', icon: UtensilsCrossed, label: 'Meals' }, { path: '/orders', icon: ShoppingBag, label: 'Orders' }, { path: '/profile', icon: User, label: 'Profile' }];

  return (
    <nav className="border-b bg-white" style={{ borderColor: 'var(--border-light)' }} aria-label="Account navigation">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        {navItems.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path;
          return <Link key={path} to={path} className="flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors" style={{ backgroundColor: active ? '#fff7ed' : 'transparent', color: active ? '#c2410c' : '#6b7280' }}><Icon className="h-4 w-4" />{label}</Link>;
        })}
      </div>
    </nav>
  );
};

export default Sidebar;
