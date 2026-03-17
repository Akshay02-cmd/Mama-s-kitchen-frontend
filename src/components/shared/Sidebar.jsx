import { Link, useLocation } from "react-router-dom";
import { Home, UtensilsCrossed, ShoppingBag, User, LayoutDashboard, Store, Plus } from "lucide-react";
import { useAuth } from "../../hooks/shared";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Different navigation items based on user role
  const customerNavItems = [
    { path: "/home", icon: Home, label: "Home" },
    { path: "/meals", icon: UtensilsCrossed, label: "Meals" },
    { path: "/orders", icon: ShoppingBag, label: "Orders" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const ownerNavItems = [
    { path: "/owner/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/owner/create-mess", icon: Plus, label: "Create Mess" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const navItems = user?.role === 'OWNER' ? ownerNavItems : customerNavItems;

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div
        className="no-scrollbar fixed inset-x-0 top-20 z-40 overflow-x-auto border-b md:hidden"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.96)',
          borderColor: '#E5E7EB',
          backdropFilter: 'blur(12px)',
        }}
      >
        <nav className="flex min-w-max gap-2 px-4 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all"
                style={{
                  backgroundColor: active ? '#F3F4F6' : '#FFFFFF',
                  color: active ? '#111827' : '#6B7280',
                  border: '1px solid #E5E7EB',
                }}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <aside
        className="hidden md:block fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 border-r transition-colors"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#E5E7EB',
        }}
      >
        <nav className="p-4 pt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition-all"
                style={{
                  backgroundColor: active ? '#F3F4F6' : 'transparent',
                  color: active ? '#111827' : '#6B7280',
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
