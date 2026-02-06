import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, Store } from "lucide-react";
import logo from "../../assets/logo.png";

const MessSidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/mess/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/mess/orders", icon: ShoppingBag, label: "Orders" },
    { path: "/mess/create-meal", icon: UtensilsCrossed, label: "Create Meal" },
    { path: "/mess/profile", icon: Store, label: "Profile" },
  ];

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
          <img src={logo} alt="Mess Dashboard" className="w-10 h-10 rounded-lg" />
          <div>
            <h2 className="font-bold text-lg" style={{ color: "#111827" }}>
              Mess
            </h2>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Dashboard
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
                backgroundColor: active ? "#8B5CF620" : "transparent",
                color: active ? "#8B5CF6" : "#6B7280",
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

export default MessSidebar;
