import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, TrendingUp, ShoppingBag, DollarSign, Store } from 'lucide-react';
import { useAuth } from '../../hooks/shared';
import Sidebar from '../../components/shared/Sidebar';
import ownerService from '../../services/owner.service';

const OwnerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalMesses: 0,
    monthlyRevenue: 0,
  });
  const [messes, setMesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If user is not OWNER, redirect
    if (user && user.role !== 'OWNER') {
      navigate('/');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch owner dashboard statistics
        const statsResponse = await ownerService.getOwnerDashboardStats();
        setStats(statsResponse.stats || {
          totalSales: 0,
          totalOrders: 0,
          totalMesses: 0,
          monthlyRevenue: 0,
        });

        // Fetch owner's messes
        const messesResponse = await ownerService.getOwnerMesses();
        setMesses(messesResponse.messes || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        // Set empty data on error
        setStats({
          totalSales: 0,
          totalOrders: 0,
          totalMesses: 0,
          monthlyRevenue: 0,
        });
        setMesses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, navigate]);

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className="p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
      style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: color + '20' }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        {subtitle && (
          <span className="text-sm font-medium" style={{ color: '#10B981' }}>
            {subtitle}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold mb-1" style={{ color: '#111827' }}>
        {value}
      </h3>
      <p className="text-sm" style={{ color: '#6B7280' }}>{title}</p>
    </div>
  );

  const MessCard = ({ mess }) => (
    <div className="p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
      style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
      onClick={() => navigate(`/mess/${mess._id}/dashboard`)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#8B5CF6' }}>
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg" style={{ color: '#111827' }}>
              {mess.name}
            </h3>
            <p className="text-sm" style={{ color: '#6B7280' }}>{mess.location}</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium"
          style={{ backgroundColor: '#D1FAE5', color: '#065F46' }}>
          {mess.status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
        <div>
          <p className="text-sm mb-1" style={{ color: '#6B7280' }}>Total Orders</p>
          <p className="text-xl font-bold" style={{ color: '#111827' }}>{mess.totalOrders}</p>
        </div>
        <div>
          <p className="text-sm mb-1" style={{ color: '#6B7280' }}>Revenue</p>
          <p className="text-xl font-bold" style={{ color: '#111827' }}>₹{mess.revenue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        <Sidebar />
        <div className="flex-1 md:ml-64 p-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#8B5CF6' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <Sidebar />
      
      <div className="flex-1 md:ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#111827' }}>
              Owner Dashboard
            </h1>
            <p style={{ color: '#6B7280' }}>
              Welcome back, {user?.name}! Here's your business overview.
            </p>
          </div>
          <button
            onClick={() => navigate('/owner/create-mess')}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:shadow-md"
            style={{ backgroundColor: '#8B5CF6', color: '#FFFFFF' }}>
            <Plus className="w-5 h-5" />
            Create New Mess
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={DollarSign}
            title="Monthly Revenue"
            value={`₹${stats.monthlyRevenue.toLocaleString()}`}
            subtitle="+12.5%"
            color="#10B981"
          />
          <StatCard
            icon={TrendingUp}
            title="Total Sales"
            value={`₹${stats.totalSales.toLocaleString()}`}
            color="#8B5CF6"
          />
          <StatCard
            icon={ShoppingBag}
            title="Total Orders"
            value={stats.totalOrders}
            color="#3B82F6"
          />
          <StatCard
            icon={Store}
            title="Active Messes"
            value={stats.totalMesses}
            color="#F59E0B"
          />
        </div>

        {/* Messes Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#111827' }}>
            Your Messes
          </h2>
          <p className="mb-6" style={{ color: '#6B7280' }}>
            Manage and track performance of all your messes
          </p>
        </div>

        {messes.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-xl"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
            <Store className="w-16 h-16 mx-auto mb-4" style={{ color: '#9CA3AF' }} />
            <h3 className="text-xl font-bold mb-2" style={{ color: '#111827' }}>
              No Messes Yet
            </h3>
            <p className="mb-6" style={{ color: '#6B7280' }}>
              Create your first mess to start taking orders
            </p>
            <button
              onClick={() => navigate('/owner/create-mess')}
              className="px-6 py-3 rounded-lg font-medium"
              style={{ backgroundColor: '#8B5CF6', color: '#FFFFFF' }}>
              Create Your First Mess
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messes.map((mess) => (
              <MessCard key={mess._id} mess={mess} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
