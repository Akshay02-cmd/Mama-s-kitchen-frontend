import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/shared/Breadcrumb';
import Card from '../../components/shared/Card';
import MealCard from '../../components/customer/MealCard';
import MessInfo from '../../components/customer/MessInfo';
import messService from '../../services/mess.service';
import ownerService from '../../services/owner.service';

const MessDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('menu');
  const [mess, setMess] = useState(null);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch mess details and meals
        const [messResponse, mealsResponse] = await Promise.all([
          messService.getMessById(id),
          ownerService.getMessMeals(id)
        ]);
        
        setMess(messResponse.mess || messResponse.data);
        setMeals(mealsResponse.meals || mealsResponse.data || []);
      } catch (err) {
        console.error('Error fetching mess details:', err);
        setError('Failed to load mess details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMessDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#8B5CF6' }}></div>
          <p style={{ color: '#6B7280' }}>Loading mess details...</p>
        </div>
      </div>
    );
  }

  if (error || !mess) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="text-center p-8">
          <h3 className="text-xl font-bold mb-2" style={{ color: '#111827' }}>{error || 'Mess not found'}</h3>
          <p className="mb-4" style={{ color: '#6B7280' }}>The mess you're looking for doesn't exist</p>
          <a href="/messes" className="text-blue-600 hover:underline">← Back to All Messes</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb backTo="/messes" backText="← Back to All Messes" />

        {/* Header */}
        <Card className="overflow-hidden mb-6">
          <div 
            className="h-48 flex items-center justify-center text-white text-6xl font-bold"
            style={{ backgroundColor: '#8B5CF6' }}
          >
            {mess.name.substring(0, 1)}
          </div>
          
          <MessInfo mess={mess} />
        </Card>

        {/* Tabs */}
        <Card className="overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b" style={{ borderColor: '#E5E7EB' }}>
            {['menu', 'about'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-4 font-medium capitalize transition-colors"
                style={{
                  color: activeTab === tab ? '#8B5CF6' : '#6B7280',
                  borderBottom: activeTab === tab ? '3px solid #8B5CF6' : 'none'
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
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#111827' }}>
                  Our Menu ({meals.length} items)
                </h2>
                {meals.length === 0 ? (
                  <p style={{ color: '#6B7280' }}>No meals available at the moment.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {meals.map(meal => (
                      <MealCard key={meal._id} meal={{ ...meal, messId: mess }} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'about' && (
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#111827' }}>
                  About {mess.name}
                </h2>
                <p className="mb-6" style={{ color: '#6B7280' }}>
                  {mess.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mess.ownerId && (
                    <div className="p-4 rounded-lg" style={{ backgroundColor: '#F3F4F6' }}>
                      <h3 className="font-bold mb-2" style={{ color: '#111827' }}>
                        Owner Information
                      </h3>
                      <p style={{ color: '#6B7280' }}>{mess.ownerId.name || 'N/A'}</p>
                      <p style={{ color: '#6B7280' }}>{mess.ownerId.phone || mess.phone}</p>
                    </div>
                  )}
                  
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#F3F4F6' }}>
                    <h3 className="font-bold mb-2" style={{ color: '#111827' }}>
                      Contact Details
                    </h3>
                    <p style={{ color: '#6B7280' }}>Phone: {mess.phone}</p>
                    {mess.area && <p style={{ color: '#6B7280' }}>Area: {mess.area}</p>}
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
