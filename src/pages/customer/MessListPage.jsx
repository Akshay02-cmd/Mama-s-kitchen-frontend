import { useState, useMemo, useEffect } from 'react';
import PageHeader from '../../components/shared/PageHeader';
import MessCard from '../../components/customer/MessCard';
import { getAllMesses } from '../../services/mess.service';

const MessListPage = () => {
  const [messes, setMesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMesses = async () => {
      try {
        setLoading(true);
        const response = await getAllMesses();
        if (response.success && response.data) {
          setMesses(response.data);
        }
      } catch (err) {
        console.error('Error fetching messes:', err);
        setError('Failed to load messes');
      } finally {
        setLoading(false);
      }
    };
    fetchMesses();
  }, []);

// Fallback mock data
const mockMesses = [
  {
    _id: 'mess1',
    name: 'Delhi Mess',
    description: 'Authentic North Indian home-style food with a touch of traditional flavors',
    address: 'Sector 15, Delhi University Area',
    phone: '+91 9876543210',
    email: 'delhi.mess@example.com',
    averageRating: 4.5,
    totalReviews: 45,
    openingHours: '7:00 AM - 10:00 PM',
    cuisineTypes: ['North Indian', 'Mughlai'],
    totalMeals: 25,
    isActive: true
  },
  {
    _id: 'mess2',
    name: 'Mumbai Mess',
    description: 'Delicious Maharashtrian and Gujarati cuisine prepared with love',
    address: 'Andheri West, Mumbai',
    phone: '+91 9876543211',
    email: 'mumbai.mess@example.com',
    averageRating: 4.3,
    totalReviews: 38,
    openingHours: '8:00 AM - 9:00 PM',
    cuisineTypes: ['Maharashtrian', 'Gujarati'],
    totalMeals: 18,
    isActive: true
  },
  {
    _id: 'mess3',
    name: 'Coastal Kitchen',
    description: 'Fresh seafood and authentic coastal delicacies',
    address: 'Marine Drive, Kochi',
    phone: '+91 9876543212',
    email: 'coastal.kitchen@example.com',
    averageRating: 4.7,
    totalReviews: 52,
    openingHours: '9:00 AM - 10:00 PM',
    cuisineTypes: ['Coastal', 'Seafood', 'Kerala'],
    totalMeals: 22,
    isActive: true
  },
  {
    _id: 'mess4',
    name: 'South Delight',
    description: 'Traditional South Indian breakfast and meals',
    address: 'T Nagar, Chennai',
    phone: '+91 9876543213',
    email: 'south.delight@example.com',
    averageRating: 4.6,
    totalReviews: 61,
    openingHours: '6:00 AM - 9:00 PM',
    cuisineTypes: ['South Indian', 'Tamil'],
    totalMeals: 30,
    isActive: true
  }
];

  const [searchQuery, setSearchQuery] = useState('');

  const filteredMesses = useMemo(() => {
    const messesToFilter = messes.length > 0 ? messes : mockMesses;
    return messesToFilter.filter(mess =>
      mess.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mess.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mess.cuisineTypes?.some(cuisine => cuisine.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, messes]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gray-100)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader 
          title="Our Mess Kitchens" 
          subtitle="Discover trusted kitchens serving delicious homemade food" 
        />

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mess kitchens by name or cuisine..."
            className="w-full md:w-96 px-4 py-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2"
            style={{ 
              borderColor: 'var(--gray-500)',
              color: 'var(--gray-900)'
            }}
          />
        </div>

        {/* Messes Grid */}
        {filteredMesses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl" style={{ color: 'var(--gray-700)' }}>
              No mess kitchens found
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6" style={{ color: 'var(--gray-700)' }}>
              Showing {filteredMesses.length} mess kitchen{filteredMesses.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMesses.map(mess => (
                <Link key={mess._id} to={`/mess/${mess._id}`}>
                  <div 
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full"
                  >
                    {/* Header Image */}
                 <MessCard key={mess._id} mess={mess} />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessListPage;
