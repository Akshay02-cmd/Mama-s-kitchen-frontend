import { Link, useLocation } from "react-router-dom";
import { Home, UtensilsCrossed, ShoppingBag, User, LayoutDashboard, Store, Plus } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/logo.png";

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
    <aside
      className="hidden md:block fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 border-r transition-colors"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#E5E7EB",
      }}
    >
      {/* Logo Section */}
      <div className="p-6 border-b" style={{ borderColor: "#E5E7EB" }}>
        <div className="flex items-center gap-3">
          <img src={logo} alt="Mama's Kitchen" className="w-10 h-10 rounded-lg" />
          <div>
            <h2 className="font-bold text-lg" style={{ color: "#111827" }}>
              Mamma's
            </h2>
            <p className="text-sm" style={{ color: "#111827" }}>
              Kitchen
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all"
              style={{
                backgroundColor: active
                  ? "#F3F4F6"
                  : "transparent",
                color: active
                  ? "#111827"
                  : "#6B7280",
              }}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
