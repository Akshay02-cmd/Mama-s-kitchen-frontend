import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, MapPin, Phone, Mail, Clock, Edit, UtensilsCrossed } from 'lucide-react';
import { useAuth, useNotification } from '../../hooks/shared';
import MessSidebar from '../../components/shared/MessSidebar';
import ownerService from '../../services/owner.service';
import messService from '../../services/mess.service';

const MessProfilePage = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messData, setMessData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    phone: '',
    address: '',
    description: '',
    is_Active: true,
  });
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    activeMeals: 0,
    averageRating: 0,
  });

  useEffect(() => {
    const fetchMessProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get the mess(es) owned by this user
        const messesResponse = await ownerService.getOwnerMesses();
        const messes = messesResponse.messes || [];
        
        if (messes.length === 0) {
          setError('No mess found. Please create a mess first.');
          setLoading(false);
          return;
        }
        
        // Use the first mess
        const mess = messes[0];
        setMessData(mess);
        setFormData({
          name: mess.name || '',
          area: mess.area || '',
          phone: mess.phone || '',
          address: mess.address || '',
          description: mess.description || '',
          is_Active: mess.is_Active ?? true,
        });
        
        // Fetch stats for this mess
        const statsResponse = await ownerService.getMessStats(mess._id);
        setStats(statsResponse.stats || {
          totalOrders: 0,
          totalRevenue: 0,
          activeMeals: 0,
          averageRating: 0,
        });
      } catch (err) {
        console.error('Error fetching mess profile:', err);
        setError('Failed to load mess profile');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMessProfile();
    }
  }, [user]);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!messData?._id) return;

    try {
      setIsSaving(true);
      const response = await messService.updateMess(messData._id, formData);
      const updatedMess = response.mess || response.data || { ...messData, ...formData };
      setMessData(updatedMess);
      setFormData({
        name: updatedMess.name || '',
        area: updatedMess.area || '',
        phone: updatedMess.phone || '',
        address: updatedMess.address || '',
        description: updatedMess.description || '',
        is_Active: updatedMess.is_Active ?? true,
      });
      setIsEditing(false);
      showSuccess('Mess profile updated successfully.');
    } catch (err) {
      console.error('Error updating mess profile:', err);
      showError(err?.message || 'Failed to update mess profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      name: messData.name || '',
      area: messData.area || '',
      phone: messData.phone || '',
      address: messData.address || '',
      description: messData.description || '',
      is_Active: messData.is_Active ?? true,
    });
    setIsEditing(false);
  };

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

  if (error || !messData) {
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        <MessSidebar />
        <div className="flex-1 md:ml-64 flex items-center justify-center">
          <div className="text-center p-8">
            <Store className="w-16 h-16 mx-auto mb-4" style={{ color: '#EF4444' }} />
            <h3 className="text-xl font-bold mb-2" style={{ color: '#111827' }}>{error || 'No mess found'}</h3>
            <p className="mb-4" style={{ color: '#6B7280' }}>Please create a mess to continue</p>
            <button
              onClick={() => navigate('/owner/create-mess')}
              className="px-6 py-3 rounded-lg font-medium"
              style={{ backgroundColor: '#8B5CF6', color: '#FFFFFF' }}>
              Create Mess
            </button>
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
            onClick={() => setIsEditing(true)}
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
                {isEditing ? (
                  <input
                    value={formData.name}
                    onChange={(event) => handleFieldChange('name', event.target.value)}
                    className="w-full max-w-md rounded-lg border px-4 py-2 text-2xl font-bold focus:outline-none focus:ring-2"
                    style={{ borderColor: '#D1D5DB', color: '#111827' }}
                  />
                ) : (
                  <h2 className="text-2xl font-bold" style={{ color: '#111827' }}>
                    {messData.name}
                  </h2>
                )}
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: (isEditing ? formData.is_Active : messData.is_Active) ? '#D1FAE5' : '#FEE2E2',
                    color: (isEditing ? formData.is_Active : messData.is_Active) ? '#065F46' : '#991B1B'
                  }}>
                  {(isEditing ? formData.is_Active : messData.is_Active) ? 'Active' : 'Inactive'}
                </span>
              </div>
              {isEditing ? (
                <textarea
                  value={formData.description}
                  onChange={(event) => handleFieldChange('description', event.target.value)}
                  rows={4}
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2"
                  style={{ borderColor: '#D1D5DB', color: '#111827' }}
                />
              ) : (
                <p style={{ color: '#6B7280' }}>{messData.description}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>Area</label>
                <input
                  value={formData.area}
                  onChange={(event) => handleFieldChange('area', event.target.value)}
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2"
                  style={{ borderColor: '#D1D5DB', color: '#111827' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>Phone</label>
                <input
                  value={formData.phone}
                  onChange={(event) => handleFieldChange('phone', event.target.value)}
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2"
                  style={{ borderColor: '#D1D5DB', color: '#111827' }}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>Address</label>
                <textarea
                  value={formData.address}
                  onChange={(event) => handleFieldChange('address', event.target.value)}
                  rows={3}
                  className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2"
                  style={{ borderColor: '#D1D5DB', color: '#111827' }}
                />
              </div>
              <div className="md:col-span-2 flex items-center gap-3">
                <input
                  id="mess-active-toggle"
                  type="checkbox"
                  checked={formData.is_Active}
                  onChange={(event) => handleFieldChange('is_Active', event.target.checked)}
                />
                <label htmlFor="mess-active-toggle" style={{ color: '#111827' }}>
                  Mess is active and visible to customers
                </label>
              </div>
              <div className="md:col-span-2 flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-5 py-3 rounded-lg font-semibold disabled:opacity-50"
                  style={{ backgroundColor: '#8B5CF6', color: '#FFFFFF' }}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-5 py-3 rounded-lg font-semibold"
                  style={{ backgroundColor: '#F3F4F6', color: '#374151' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Address */}
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 shrink-0 mt-1" style={{ color: '#8B5CF6' }} />
              <div>
                <p className="font-medium mb-1" style={{ color: '#111827' }}>Address</p>
                <p style={{ color: '#6B7280' }}>{isEditing ? formData.address : messData.address}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-3">
              <Phone className="w-5 h-5 shrink-0 mt-1" style={{ color: '#8B5CF6' }} />
              <div>
                <p className="font-medium mb-1" style={{ color: '#111827' }}>Phone</p>
                <p style={{ color: '#6B7280' }}>{isEditing ? formData.phone : messData.phone}</p>
              </div>
            </div>

            {/* Email */}
            {messData.email && (
              <div className="flex gap-3">
                <Mail className="w-5 h-5 shrink-0 mt-1" style={{ color: '#8B5CF6' }} />
                <div>
                  <p className="font-medium mb-1" style={{ color: '#111827' }}>Email</p>
                  <p style={{ color: '#6B7280' }}>{messData.email}</p>
                </div>
              </div>
            )}

            {/* Area */}
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 shrink-0 mt-1" style={{ color: '#8B5CF6' }} />
              <div>
                <p className="font-medium mb-1" style={{ color: '#111827' }}>Area</p>
                <p style={{ color: '#6B7280' }}>{isEditing ? formData.area : messData.area}</p>
              </div>
            </div>

            {/* Operating Hours */}
            {messData.openingTime && messData.closingTime && (
              <div className="flex gap-3">
                <Clock className="w-5 h-5 shrink-0 mt-1" style={{ color: '#8B5CF6' }} />
                <div>
                  <p className="font-medium mb-1" style={{ color: '#111827' }}>Operating Hours</p>
                  <p style={{ color: '#6B7280' }}>
                    {messData.openingTime} - {messData.closingTime}
                  </p>
                </div>
              </div>
            )}

            {/* Cuisine Type */}
            {messData.cuisineType && messData.cuisineType.length > 0 && (
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
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => navigate(messData?._id ? `/mess/${messData._id}/create-meal` : '/mess/create-meal')}
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
            onClick={() => navigate(messData?._id ? `/mess/${messData._id}/orders` : '/mess/orders')}
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
