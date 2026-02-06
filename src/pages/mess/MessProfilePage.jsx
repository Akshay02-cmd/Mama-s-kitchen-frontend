import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, MapPin, Phone, Mail, Clock, Edit, UtensilsCrossed } from 'lucide-react';
import { useAuth } from '../../hooks/shared';
import MessSidebar from '../../components/shared/MessSidebar';

const MessProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [messData, setMessData] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeMeals: 0,
    averageRating: 0,
  });

  useEffect(() => {
    // TODO: Fetch mess profile data from API
    setTimeout(() => {
      setMessData({
        _id: '1',
        name: 'Sunrise Mess',
        description: 'Serving delicious homestyle meals with love and care since 2020',
        address: 'MG Road, Bangalore, Karnataka - 560001',
        phone: '9876543210',
        email: 'sunrise@example.com',
        openingTime: '08:00',
        closingTime: '22:00',
        cuisineType: ['North Indian', 'South Indian', 'Chinese'],
        is_Active: true,
      });

      setStats({
        totalOrders: 1245,
        totalRevenue: 345800,
        activeMeals: 28,
        averageRating: 4.5,
      });

      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        <MessSidebar />
        <div className="flex-1 md:ml-64 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#8B5CF6' }}></div>
            <p style={{ color: '#6B7280' }}>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <MessSidebar />
      <div className="flex-1 md:ml-64 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#111827' }}>
              Mess Profile
            </h1>
            <p style={{ color: '#6B7280' }}>
              Manage your mess information and view statistics
            </p>
          </div>
          <button
            onClick={() => navigate('/mess/edit-profile')}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all"
            style={{ backgroundColor: '#8B5CF6', color: '#FFFFFF' }}>
            <Edit className="w-5 h-5" />
            Edit Profile
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="p-6 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
            <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Total Orders</p>
            <p className="text-3xl font-bold" style={{ color: '#111827' }}>{stats.totalOrders}</p>
          </div>
          <div className="p-6 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
            <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Total Revenue</p>
            <p className="text-3xl font-bold" style={{ color: '#111827' }}>₹{stats.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="p-6 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
            <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Active Meals</p>
            <p className="text-3xl font-bold" style={{ color: '#111827' }}>{stats.activeMeals}</p>
          </div>
          <div className="p-6 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
            <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Avg Rating</p>
            <p className="text-3xl font-bold" style={{ color: '#111827' }}>{stats.averageRating} ⭐</p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="rounded-xl p-8 shadow-lg mb-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
          <div className="flex items-start gap-6 mb-6">
            <div className="w-20 h-20 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#8B5CF6' }}>
              <Store className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold" style={{ color: '#111827' }}>
                  {messData.name}
                </h2>
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: messData.is_Active ? '#D1FAE5' : '#FEE2E2',
                    color: messData.is_Active ? '#065F46' : '#991B1B'
                  }}>
                  {messData.is_Active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p style={{ color: '#6B7280' }}>{messData.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Address */}
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 shrink-0 mt-1" style={{ color: '#8B5CF6' }} />
              <div>
                <p className="font-medium mb-1" style={{ color: '#111827' }}>Address</p>
                <p style={{ color: '#6B7280' }}>{messData.address}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-3">
              <Phone className="w-5 h-5 shrink-0 mt-1" style={{ color: '#8B5CF6' }} />
              <div>
                <p className="font-medium mb-1" style={{ color: '#111827' }}>Phone</p>
                <p style={{ color: '#6B7280' }}>{messData.phone}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-3">
              <Mail className="w-5 h-5 shrink-0 mt-1" style={{ color: '#8B5CF6' }} />
              <div>
                <p className="font-medium mb-1" style={{ color: '#111827' }}>Email</p>
                <p style={{ color: '#6B7280' }}>{messData.email}</p>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex gap-3">
              <Clock className="w-5 h-5 shrink-0 mt-1" style={{ color: '#8B5CF6' }} />
              <div>
                <p className="font-medium mb-1" style={{ color: '#111827' }}>Operating Hours</p>
                <p style={{ color: '#6B7280' }}>
                  {messData.openingTime} - {messData.closingTime}
                </p>
              </div>
            </div>

            {/* Cuisine Type */}
            <div className="flex gap-3 md:col-span-2">
              <UtensilsCrossed className="w-5 h-5 shrink-0 mt-1" style={{ color: '#8B5CF6' }} />
              <div>
                <p className="font-medium mb-2" style={{ color: '#111827' }}>Cuisine Types</p>
                <div className="flex flex-wrap gap-2">
                  {messData.cuisineType.map((cuisine, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{ backgroundColor: '#F3F4F6', color: '#6B7280' }}>
                      {cuisine}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => navigate('/mess/create-meal')}
            className="p-6 rounded-xl text-left hover:shadow-md transition-all"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: '#8B5CF620' }}>
              <UtensilsCrossed className="w-6 h-6" style={{ color: '#8B5CF6' }} />
            </div>
            <h3 className="font-bold text-lg mb-2" style={{ color: '#111827' }}>
              Create New Meal
            </h3>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              Add a new meal to your menu
            </p>
          </button>

          <button
            onClick={() => navigate('/mess/orders')}
            className="p-6 rounded-xl text-left hover:shadow-md transition-all"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: '#3B82F620' }}>
              <Store className="w-6 h-6" style={{ color: '#3B82F6' }} />
            </div>
            <h3 className="font-bold text-lg mb-2" style={{ color: '#111827' }}>
              View Orders
            </h3>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              Manage incoming and active orders
            </p>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MessProfilePage;
