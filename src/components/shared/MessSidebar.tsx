import { Link, useLocation, useParams } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, Store } from "lucide-react";
import logo from "../../assets/logo.png";

const MessSidebar = () => {
  const location = useLocation();
  const { messId } = useParams();

  const basePath = messId ? `/mess/${messId}` : "/mess";

  const navItems = [
    { path: `${basePath}/dashboard`, icon: LayoutDashboard, label: "Dashboard" },
    { path: `${basePath}/orders`, icon: ShoppingBag, label: "Orders" },
    { path: `${basePath}/create-meal`, icon: UtensilsCrossed, label: "Create Meal" },
    { path: `${basePath}/profile`, icon: Store, label: "Profile" },
  ];

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
                  backgroundColor: active ? '#8B5CF620' : '#FFFFFF',
                  color: active ? '#8B5CF6' : '#6B7280',
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
        <div className="border-b p-6" style={{ borderColor: '#E5E7EB' }}>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Mess Dashboard" className="w-10 h-10 rounded-lg" />
            <div>
              <h2 className="font-bold text-lg" style={{ color: '#111827' }}>
                Mess
              </h2>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Dashboard
              </p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition-all"
                style={{
                  backgroundColor: active ? '#8B5CF620' : 'transparent',
                  color: active ? '#8B5CF6' : '#6B7280',
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

export default MessSidebar;
