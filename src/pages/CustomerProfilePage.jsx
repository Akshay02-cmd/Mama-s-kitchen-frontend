import PageHeader from '../components/common/PageHeader';
import ProfileCard from '../components/profile/ProfileCard';
import ProfileStats from '../components/profile/ProfileStats';
import PersonalInfo from '../components/profile/PersonalInfo';
import FoodPreferences from '../components/profile/FoodPreferences';
import QuickActions from '../components/profile/QuickActions';
import Card from '../components/common/Card';

// Mock customer profile data
const mockProfile = {
  _id: 'cust1',
  userId: {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 9876543210'
  },
  address: 'Hostel Block A, Room 201, Delhi University, New Delhi - 110007',
  preferences: {
    dietaryType: 'Non-Veg',
    favoriteCuisines: ['North Indian', 'Mughlai', 'Chinese']
  },
  stats: {
    totalOrders: 45,
    totalSpent: 12500,
    favoriteMessId: { name: 'Delhi Mess', _id: 'mess1' }
  }
};

const CustomerProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader 
          title="My Profile" 
          subtitle="Manage your personal information and preferences" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Sidebar */}
          <div className="space-y-6">
            <ProfileCard profile={mockProfile} />
            <ProfileStats stats={mockProfile.stats} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <PersonalInfo profile={mockProfile} />

            {/* Delivery Address */}
            <Card className="p-8 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: 'var(--primary-600)' }}></div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--gray-900)' }}>
                  Delivery Address
                </h2>
              </div>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--gray-700)' }}>
                {mockProfile.address}
              </p>
            </Card>

            <FoodPreferences 
              preferences={mockProfile.preferences} 
              favoriteMessId={mockProfile.stats.favoriteMessId} 
            />

            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfilePage;
