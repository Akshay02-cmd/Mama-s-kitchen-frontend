import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/shared/Breadcrumb';
import Card from '../../components/shared/Card';
import MealCard from '../../components/customer/MealCard';
import MessInfo from '../../components/customer/MessInfo';

// Mock mess detail
const mockMess = {
  _id: 'mess1',
  name: 'Delhi Mess',
  description: 'Authentic North Indian home-style food with a touch of traditional flavors. We have been serving quality meals to students and working professionals for over 10 years.',
  address: 'Sector 15, Delhi University Area, New Delhi - 110007',
  phone: '+91 9876543210',
  email: 'delhi.mess@example.com',
  averageRating: 4.5,
  totalReviews: 45,
  openingHours: '7:00 AM - 10:00 PM',
  cuisineTypes: ['North Indian', 'Mughlai'],
  totalMeals: 25,
  isActive: true,
  ownerId: {
    name: 'Rajesh Kumar',
    phone: '+91 9876543210'
  }
};

const mockMeals = [
  {
    _id: 'm1',
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice cooked with tender chicken',
    price: 150,
    category: 'Main Course',
    dietaryType: 'Non-Veg',
    isAvailable: true,
    averageRating: 4.5,
    totalReviews: 23
  },
  {
    _id: 'm2',
    name: 'Dal Tadka',
    description: 'Yellow lentils tempered with spices',
    price: 80,
    category: 'Dal',
    dietaryType: 'Veg',
    isAvailable: true,
    averageRating: 4.2,
    totalReviews: 15
  },
  {
    _id: 'm3',
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese in creamy tomato gravy',
    price: 120,
    category: 'Main Course',
    dietaryType: 'Veg',
    isAvailable: true,
    averageRating: 4.4,
    totalReviews: 18
  }
];

const MessDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('menu');

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gray-100)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb backTo="/mess" backText="← Back to All Messes" />

        {/* Header */}
        <Card className="overflow-hidden mb-6">
          <div 
            className="h-48 flex items-center justify-center text-white text-6xl font-bold"
            style={{ backgroundColor: 'var(--primary-500)' }}
          >
            {mockMess.name.substring(0, 1)}
          </div>
          
          <MessInfo mess={mockMess} />
        </Card>

        {/* Tabs */}
        <Card className="overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b" style={{ borderColor: 'var(--gray-100)' }}>
            {['menu', 'about'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-4 font-medium capitalize transition-colors"
                style={{
                  color: activeTab === tab ? 'var(--primary-500)' : 'var(--gray-700)',
                  borderBottom: activeTab === tab ? '3px solid var(--primary-500)' : 'none'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'menu' && (
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--gray-900)' }}>
                  Our Menu ({mockMeals.length} items)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockMeals.map(meal => (
                    <MealCard key={meal._id} meal={{ ...meal, messId: mockMess }} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                  About {mockMess.name}
                </h2>
                <p className="mb-6" style={{ color: 'var(--gray-700)' }}>
                  {mockMess.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--primary-50)' }}>
                    <h3 className="font-bold mb-2" style={{ color: 'var(--gray-900)' }}>
                      Owner Information
                    </h3>
                    <p style={{ color: 'var(--gray-700)' }}>{mockMess.ownerId.name}</p>
                    <p style={{ color: 'var(--gray-700)' }}>{mockMess.ownerId.phone}</p>
                  </div>
                  
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--primary-50)' }}>
                    <h3 className="font-bold mb-2" style={{ color: 'var(--gray-900)' }}>
                      Contact Details
                    </h3>
                    <p style={{ color: 'var(--gray-700)' }}>Email: {mockMess.email}</p>
                    <p style={{ color: 'var(--gray-700)' }}>Phone: {mockMess.phone}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MessDetailPage;
