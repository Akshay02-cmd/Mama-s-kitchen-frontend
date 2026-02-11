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

  const [searchQuery, setSearchQuery] = useState('');

  const filteredMesses = useMemo(() => {
    return messes.filter(mess =>
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
