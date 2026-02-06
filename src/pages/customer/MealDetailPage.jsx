import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Breadcrumb from '../../components/shared/Breadcrumb';
import Card from '../../components/shared/Card';
import StatusBadge from '../../components/shared/StatusBadge';
import { getMealById } from '../../services/meal.service';
import { getReviewsByMealId } from '../../services/review.service';

const dietaryTypeConfig = {
  'Veg': { color: 'var(--accent-500)', label: 'Veg', textColor: 'var(--white)' },
  'Non-Veg': { color: 'var(--error)', label: 'Non-Veg', textColor: 'var(--white)' }
};

const categoryConfig = {
  'Main Course': { color: 'var(--gray-100)', label: 'Main Course', textColor: 'var(--gray-700)' },
  'breakfast': { color: 'var(--gray-100)', label: 'Breakfast', textColor: 'var(--gray-700)' },
  'lunch': { color: 'var(--gray-100)', label: 'Lunch', textColor: 'var(--gray-700)' },
  'dinner': { color: 'var(--gray-100)', label: 'Dinner', textColor: 'var(--gray-700)' },
  'snack': { color: 'var(--gray-100)', label: 'Snack', textColor: 'var(--gray-700)' }
};

const MealDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchMealData = async () => {
      try {
        setLoading(true);
        const [mealResponse, reviewsResponse] = await Promise.all([
          getMealById(id),
          getReviewsByMealId(id).catch(() => ({ reviews: [] }))
        ]);
        
        // Backend returns { meal: {...} } not { success: true, data: {...} }
        const mealData = mealResponse.meal || mealResponse.data;
        
        if (mealData) {
          // Transform backend data to match frontend expectations
          const transformedMeal = {
            ...mealData,
            dietaryType: mealData.is_Veg ? 'Veg' : 'Non-Veg',
            category: mealData.mealType || 'Main Course',
            isAvailable: mealData.is_Available,
            averageRating: mealData.averageRating || 4.0,
            totalReviews: mealData.totalReviews || 0
          };
          setMeal(transformedMeal);
        }
        
        const reviewsData = reviewsResponse.reviews || reviewsResponse.data || [];
        setReviews(reviewsData);
      } catch (err) {
        console.error('Error fetching meal:', err);
        setError('Failed to load meal details');
      } finally {
        setLoading(false);
      }
    };

    fetchMealData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--gray-100)' }}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--primary-500)' }}></div>
          <p className="mt-4" style={{ color: 'var(--gray-600)' }}>Loading meal details...</p>
        </div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--gray-100)' }}>
        <div className="text-center">
          <p className="text-xl" style={{ color: 'var(--error)' }}>Meal not found</p>
          <button 
            onClick={() => navigate('/meals')}
            className="mt-4 px-6 py-2 rounded-lg"
            style={{ backgroundColor: 'var(--primary-500)', color: 'var(--white)' }}
          >
            Back to Meals
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Mock add to cart functionality
    alert(`Added ${quantity} ${meal.name} to cart!`);
    navigate('/checkout');
  };

  const handleOrderNow = () => {
    navigate('/checkout', { state: { meal, quantity } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb backTo="/meals" backText="← Back to Meals" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
          {/* Image Section */}
          <div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100" style={{ backgroundColor: 'var(--white)' }}>
              <img 
                src={meal.image || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop`}
                alt={meal.name}
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>

          {/* Details Section */}
          <div>
            <Card className="p-8 shadow-xl border border-gray-100">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <StatusBadge 
                    status={meal.dietaryType}
                    statusConfig={dietaryTypeConfig}
                  />
                  <StatusBadge status={meal.category} statusConfig={categoryConfig} />
                </div>
                <h1 className="text-4xl font-bold mb-4 leading-tight" style={{ color: 'var(--gray-900)' }}>
                  {meal.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ backgroundColor: 'var(--primary-50)' }}>
                    <span className="text-xl" style={{ color: 'var(--warning)' }}>★</span>
                    <span className="font-bold text-lg" style={{ color: 'var(--gray-900)' }}>
                      {meal.averageRating}
                    </span>
                    <span className="text-sm" style={{ color: 'var(--gray-500)' }}>
                      ({meal.totalReviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8 pb-6 border-b border-gray-100">
                <span className="text-5xl font-bold" style={{ color: 'var(--primary-600)' }}>
                  ₹{meal.price}
                </span>
                <span className="text-lg ml-2" style={{ color: 'var(--gray-700)' }}> / {meal.servingSize || 'serving'}</span>
              </div>

              {/* Description */}
              <p className="mb-8 text-lg leading-relaxed" style={{ color: 'var(--gray-700)' }}>
                {meal.description}
              </p>

              {/* Mess Info */}
              <div className="mb-8 p-6 rounded-2xl border-2" style={{ backgroundColor: 'var(--primary-50)', borderColor: 'var(--primary-100)' }}>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-3" style={{ color: 'var(--gray-600)' }}>
                  Prepared by
                </h3>
                <Link 
                  to={`/mess/${meal.messId._id}`}
                  className="text-xl font-bold hover:underline block mb-2"
                  style={{ color: 'var(--primary-600)' }}
                >
                  {meal.messId.name}
                </Link>
                <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                  {meal.messId.address}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block mb-4 font-bold text-sm uppercase tracking-wider" style={{ color: 'var(--gray-600)' }}>
                  Quantity
                </label>
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-14 h-14 rounded-xl font-bold text-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                    style={{ 
                      backgroundColor: 'var(--gray-100)', 
                      color: 'var(--gray-900)',
                      border: '2px solid var(--gray-200)'
                    }}
                  >
                    −
                  </button>
                  <span className="text-3xl font-bold w-16 text-center" style={{ color: 'var(--gray-900)' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-14 h-14 rounded-xl font-bold text-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                    style={{ 
                      backgroundColor: 'var(--gray-100)', 
                      color: 'var(--gray-900)',
                      border: '2px solid var(--gray-200)'
                    }}
                  >
                    +
                  </button>
                  <div className="ml-6 px-6 py-3 rounded-xl" style={{ backgroundColor: 'var(--primary-50)' }}>
                    <span className="text-sm font-semibold uppercase tracking-wider block mb-1" style={{ color: 'var(--gray-600)' }}>Total</span>
                    <span className="text-2xl font-bold" style={{ color: 'var(--primary-600)' }}>₹{meal.price * quantity}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleOrderNow}
                  disabled={!meal.isAvailable}
                  className="flex-1 py-4 px-8 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  style={{
                    background: meal.isAvailable ? 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%)' : 'var(--gray-400)',
                    color: 'var(--white)'
                  }}
                >
                  {meal.isAvailable ? '🛒 Order Now' : 'Not Available'}
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={!meal.isAvailable}
                  className="flex-1 py-4 px-8 rounded-xl font-bold text-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: 'var(--white)',
                    color: 'var(--primary-600)',
                    border: '3px solid var(--primary-600)'
                  }}
                >
                  🛒 Add to Cart
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <Card className="overflow-hidden shadow-xl border border-gray-100">
            {/* Tab Headers */}
            <div className="flex border-b-2" style={{ borderColor: 'var(--gray-100)' }}>
              {['details', 'nutrition', 'reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-8 py-5 font-bold capitalize transition-all text-lg"
                  style={{
                    color: activeTab === tab ? 'var(--primary-600)' : 'var(--gray-600)',
                    borderBottom: activeTab === tab ? '4px solid var(--primary-600)' : 'none',
                    backgroundColor: activeTab === tab ? 'var(--primary-50)' : 'transparent'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'details' && (
                <div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                    Meal Details
                  </h3>
                  
                  {(meal.preparationTime || meal.servingSize) && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {meal.preparationTime && (
                        <div>
                          <p className="font-medium" style={{ color: 'var(--gray-900)' }}>Preparation Time</p>
                          <p style={{ color: 'var(--gray-700)' }}>{meal.preparationTime}</p>
                        </div>
                      )}
                      {meal.servingSize && (
                        <div>
                          <p className="font-medium" style={{ color: 'var(--gray-900)' }}>Serving Size</p>
                          <p style={{ color: 'var(--gray-700)' }}>{meal.servingSize}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {meal.ingredients && meal.ingredients.length > 0 ? (
                    <>
                      <h4 className="font-bold mb-2" style={{ color: 'var(--gray-900)' }}>Ingredients</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {meal.ingredients.map((ingredient, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-sm"
                            style={{ backgroundColor: 'var(--primary-50)', color: 'var(--gray-900)' }}
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8" style={{ color: 'var(--gray-500)' }}>
                      <p>Detailed ingredients information is not available for this meal.</p>
                      <p className="text-sm mt-2">Contact the mess for more information.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                    Nutritional Information
                  </h3>
                  {meal.nutritionalInfo && Object.keys(meal.nutritionalInfo).length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(meal.nutritionalInfo).map(([key, value]) => (
                        <div key={key} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--primary-50)' }}>
                          <p className="text-sm capitalize" style={{ color: 'var(--gray-700)' }}>{key}</p>
                          <p className="text-2xl font-bold" style={{ color: 'var(--primary-500)' }}>{value}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8" style={{ color: 'var(--gray-500)' }}>
                      <p>Nutritional information is not available for this meal.</p>
                      <p className="text-sm mt-2">Contact the mess for detailed nutritional facts.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                    Customer Reviews
                  </h3>
                  <div className="text-center py-8" style={{ color: 'var(--gray-500)' }}>
                    <p>No reviews yet for this meal.</p>
                    <p className="text-sm mt-2">Be the first to order and leave a review!</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MealDetailPage;
