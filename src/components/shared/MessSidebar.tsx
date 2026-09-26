import { Link, useLocation, useParams } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, Store } from 'lucide-react';

const MessSidebar = () => {
  const location = useLocation();
  const { messId } = useParams();
  const basePath = messId ? `/mess/${messId}` : '/mess';
  const navItems = [
    { path: `${basePath}/dashboard`, icon: LayoutDashboard, label: 'Dashboard' },
    { path: `${basePath}/orders`, icon: ShoppingBag, label: 'Orders' },
    { path: `${basePath}/create-meal`, icon: UtensilsCrossed, label: 'Create Meal' },
    { path: `${basePath}/profile`, icon: Store, label: 'Profile' },
  ];

  return (
    <nav className="border-b bg-white" style={{ borderColor: 'var(--border-light)' }} aria-label="Kitchen navigation">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        {navItems.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path;
          return <Link key={path} to={path} className="flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors" style={{ backgroundColor: active ? '#fff7ed' : 'transparent', color: active ? '#c2410c' : '#6b7280' }}><Icon className="h-4 w-4" />{label}</Link>;
        })}
      </div>
    </nav>
  );
};

export default MessSidebar;
