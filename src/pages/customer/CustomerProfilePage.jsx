import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../../components/customer/ProfileCard';
import ProfileStats from '../../components/customer/ProfileStats';
import PersonalInfo from '../../components/customer/PersonalInfo';
import FoodPreferences from '../../components/customer/FoodPreferences';
import QuickActions from '../../components/customer/QuickActions';
import Card from '../../components/shared/Card';
import { useAuth, useNotification } from '../../hooks/shared';
import Sidebar from '../../components/shared/Sidebar.jsx';
import { getCustomerProfile } from '../../services/profile.service';
import { LogOut } from 'lucide-react';

const CustomerProfilePage = () => {
  const { logout } = useAuth();
  const { showSuccess } = useNotification();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getCustomerProfile();
        setProfile(response.profile);
        setError(null);
      } catch (err) {
        console.error('Error fetching profile:', err);
        
        // Don't logout on profile errors - user is still authenticated
        // Profile might just not exist yet or there's a temporary issue
        // Only the explicit logout button should log them out
        if (err.status === 404) {
          setError('Profile not found. Please complete your profile.');
        } else if (err.status === 401) {
          setError('Authentication issue. Please try refreshing the page.');
        } else {
          setError('Failed to load profile. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      showSuccess('Logged out successfully. See you soon!');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        <Sidebar />
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          <div className="flex items-center justify-center h-64">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        <Sidebar />
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          <div className="text-center py-20">
            <p style={{ color: '#EF4444' }}>{error || 'Profile not found'}</p>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <Sidebar />
      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 
            className="text-3xl font-bold"
            style={{ color: '#111827' }}
          >
            My Profile
          </h1>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:opacity-90"
            style={{ 
              backgroundColor: '#EF4444',
              color: '#FFFFFF'
            }}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            <ProfileCard profile={profile} />
            <ProfileStats stats={profile.stats || { totalOrders: 0, totalSpent: 0 }} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <PersonalInfo profile={profile} />

            {/* Delivery Address */}
            <div className="p-6 rounded-lg"
              style={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB'
              }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: '#111827' }}>
                Delivery Address
              </h2>
              <p style={{ color: '#6B7280' }}>
                {profile.address}
              </p>
            </div>

            <FoodPreferences 
              preferences={profile.preferences} 
              favoriteMessId={profile.stats?.favoriteMessId} 
            />

            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerProfilePage;

