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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gray-100)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader 
          title="My Profile" 
          subtitle="Manage your personal information and preferences" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            <ProfileCard profile={mockProfile} />
            <ProfileStats stats={mockProfile.stats} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <PersonalInfo profile={mockProfile} />

            {/* Delivery Address */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                Delivery Address
              </h2>
              <p className="text-lg" style={{ color: 'var(--gray-700)' }}>
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
