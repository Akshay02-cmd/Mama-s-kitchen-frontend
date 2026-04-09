import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../../components/customer/ProfileCard';
import ProfileStats from '../../components/customer/ProfileStats';
import PersonalInfo from '../../components/customer/PersonalInfo';
import FoodPreferences from '../../components/customer/FoodPreferences';
import QuickActions from '../../components/customer/QuickActions';
import { useAuth, useNotification } from '../../hooks/shared';
import Sidebar from '../../components/shared/Sidebar.jsx';
import profileService from '../../services/profile.service';
import { LogOut } from 'lucide-react';

const CustomerProfilePage = () => {
  const { logout, user } = useAuth();
  const { showSuccess } = useNotification();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        console.log('No user found, skipping profile fetch');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch profile based on user's role
        const response = user?.role === 'OWNER' 
          ? await profileService.getOwnerProfile()
          : await profileService.getCustomerProfile();
        setProfile(response.profile);

        if (response.profile?.profileImage) {
          localStorage.setItem('profileImage', response.profile.profileImage);
        }
      } catch (err) {
        console.error('Error fetching profile:', err, {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message
        });
        
        // Check if error is 404 (profile not found)
        if (err.response?.status === 404 || err.status === 404) {
          // Profile doesn't exist - show complete profile option
          console.log('Profile not found (404) - showing complete profile prompt');
          setProfile(null);
        } else if (err.response?.status === 401 || err.status === 401) {
          // Genuine authentication error - token might be expired
          console.log('Authentication error (401) - redirecting to login');
          logout();
          navigate('/login');
        } else {
          // Other errors - show complete profile option instead of redirecting
          console.log('Error fetching profile, showing complete profile option');
          setProfile(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, user, logout]);

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
        <main className="flex-1 p-4 pt-20 md:ml-64 md:p-8 md:pt-8">
          <div className="flex items-center justify-center h-64">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        <Sidebar />
        <main className="flex-1 p-4 pt-20 md:ml-64 md:p-8 md:pt-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">👤</span>
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#111827' }}>
                  Complete Your Profile
                </h2>
                <p className="text-lg mb-6" style={{ color: '#6B7280' }}>
                  Welcome! To start ordering delicious meals, please complete your profile first.
                </p>
              </div>
              
              <button
                onClick={() => navigate('/profile/edit')}
                className="px-8 py-3 rounded-lg font-medium transition-colors mb-4"
                style={{ backgroundColor: '#3B82F6', color: '#FFFFFF' }}
              >
                Complete Profile Now
              </button>
              
              <div className="mt-8 pt-8 border-t" style={{ borderColor: '#E5E7EB' }}>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all mx-auto"
                  style={{ 
                    backgroundColor: '#EF4444',
                    color: '#FFFFFF'
                  }}
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <Sidebar />
      <main className="flex-1 p-4 pt-20 md:ml-64 md:p-8 md:pt-8">
        <div className="mb-6">
          <h1 
            className="text-2xl font-bold sm:text-3xl"
            style={{ color: '#111827' }}
          >
            My Profile
          </h1>
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
            
            {/* Logout Button at Bottom */}
            <div className="pt-6">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:opacity-90"
                style={{ 
                  backgroundColor: '#EF4444',
                  color: '#FFFFFF'
                }}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerProfilePage;

