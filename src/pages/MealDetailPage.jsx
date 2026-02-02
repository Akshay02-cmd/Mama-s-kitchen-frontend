import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import Card from '../components/common/Card';
import StatusBadge from '../components/common/StatusBadge';

// Mock meal data
const mockMeal = {
  _id: '1',
  name: 'Chicken Biryani',
  description: 'Aromatic basmati rice cooked with tender chicken pieces and authentic spices. Served with raita and salad.',
  price: 150,
  category: 'Main Course',
  dietaryType: 'Non-Veg',
  isAvailable: true,
  servingSize: '1 plate',
  preparationTime: '30-40 mins',
  messId: {
    _id: 'm1',
    name: 'Delhi Mess',
    address: 'Sector 15, Delhi',
    phone: '+91 9876543210'
  },
  ingredients: ['Basmati Rice', 'Chicken', 'Onions', 'Tomatoes', 'Spices', 'Herbs'],
  nutritionalInfo: {
    calories: 450,
    protein: '25g',
    carbs: '60g',
    fat: '12g'
  },
  averageRating: 4.5,
  totalReviews: 23
};

const mockReviews = [
  {
    _id: 'r1',
    customerId: { name: 'Rahul Sharma', _id: 'c1' },
    rating: 5,
    comment: 'Absolutely delicious! Best biryani in town.',
    createdAt: '2026-01-28T10:30:00Z'
  },
  {
    _id: 'r2',
    customerId: { name: 'Priya Singh', _id: 'c2' },
    rating: 4,
    comment: 'Great taste but quantity could be more.',
    createdAt: '2026-01-25T14:20:00Z'
  },
  {
    _id: 'r3',
    customerId: { name: 'Amit Kumar', _id: 'c3' },
    rating: 5,
    comment: 'Perfectly spiced and cooked. Highly recommended!',
    createdAt: '2026-01-20T18:45:00Z'
  }
];

const MealDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  const handleAddToCart = () => {
    // Mock add to cart functionality
    alert(`Added ${quantity} ${mockMeal.name} to cart!`);
    navigate('/checkout');
  };

  const handleOrderNow = () => {
    navigate('/checkout', { state: { meal: mockMeal, quantity } });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gray-100)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb backTo="/meals" backText="← Back to Meals" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div>
            <div className="rounded-lg overflow-hidden shadow-lg" style={{ backgroundColor: 'var(--white)' }}>
              <img 
                src={`https://via.placeholder.com/600x400/FF6B35/FFFFFF?text=${encodeURIComponent(mockMeal.name)}`}
                alt={mockMeal.name}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Details Section */}
          <div>
            <Card className="p-6">
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <StatusBadge 
                    status={mockMeal.dietaryType}
                    color={mockMeal.dietaryType === 'Veg' ? 'var(--accent-500)' : 'var(--error)'}
                  />
                  <StatusBadge status={mockMeal.category} color="var(--gray-100)" textColor="var(--gray-700)" />
                </div>
                <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--gray-900)' }}>
                  {mockMeal.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <span style={{ color: 'var(--warning)' }}>★</span>
                    <span className="font-semibold" style={{ color: 'var(--gray-900)' }}>
                      {mockMeal.averageRating}
                    </span>
                    <span style={{ color: 'var(--gray-500)' }}>
                      ({mockMeal.totalReviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold" style={{ color: 'var(--primary-500)' }}>
                  ₹{mockMeal.price}
                </span>
                <span style={{ color: 'var(--gray-700)' }}> / {mockMeal.servingSize}</span>
              </div>

              {/* Description */}
              <p className="mb-6" style={{ color: 'var(--gray-700)' }}>
                {mockMeal.description}
              </p>

              {/* Mess Info */}
              <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--primary-50)' }}>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--gray-900)' }}>
                  Prepared by
                </h3>
                <Link 
                  to={`/mess/${mockMeal.messId._id}`}
                  className="hover:underline"
                  style={{ color: 'var(--primary-500)' }}
                >
                  {mockMeal.messId.name}
                </Link>
                <p className="text-sm mt-1" style={{ color: 'var(--gray-700)' }}>
                  {mockMeal.messId.address}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block mb-2 font-medium" style={{ color: 'var(--gray-900)' }}>
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg font-bold"
                    style={{ 
                      backgroundColor: 'var(--gray-100)', 
                      color: 'var(--gray-900)' 
                    }}
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-12 text-center" style={{ color: 'var(--gray-900)' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg font-bold"
                    style={{ 
                      backgroundColor: 'var(--gray-100)', 
                      color: 'var(--gray-900)' 
                    }}
                  >
                    +
                  </button>
                  <span className="text-xl font-bold" style={{ color: 'var(--primary-500)' }}>
                    Total: ₹{mockMeal.price * quantity}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleOrderNow}
                  disabled={!mockMeal.isAvailable}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold transition-colors"
                  style={{
                    backgroundColor: mockMeal.isAvailable ? 'var(--primary-500)' : 'var(--gray-500)',
                    color: 'var(--white)'
                  }}
                >
                  {mockMeal.isAvailable ? 'Order Now' : 'Not Available'}
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={!mockMeal.isAvailable}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold transition-colors"
                  style={{
                    backgroundColor: 'var(--white)',
                    color: 'var(--primary-500)',
                    border: '2px solid var(--primary-500)'
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <Card className="overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b" style={{ borderColor: 'var(--gray-100)' }}>
              {['details', 'nutrition', 'reviews'].map(tab => (
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
              {activeTab === 'details' && (
                <div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                    Meal Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="font-medium" style={{ color: 'var(--gray-900)' }}>Preparation Time</p>
                      <p style={{ color: 'var(--gray-700)' }}>{mockMeal.preparationTime}</p>
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: 'var(--gray-900)' }}>Serving Size</p>
                      <p style={{ color: 'var(--gray-700)' }}>{mockMeal.servingSize}</p>
                    </div>
                  </div>
                  <h4 className="font-bold mb-2" style={{ color: 'var(--gray-900)' }}>Ingredients</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockMeal.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{ backgroundColor: 'var(--primary-50)', color: 'var(--gray-900)' }}
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                    Nutritional Information
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(mockMeal.nutritionalInfo).map(([key, value]) => (
                      <div key={key} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--primary-50)' }}>
                        <p className="text-sm capitalize" style={{ color: 'var(--gray-700)' }}>{key}</p>
                        <p className="text-2xl font-bold" style={{ color: 'var(--primary-500)' }}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                    Customer Reviews ({mockReviews.length})
                  </h3>
                  <div className="space-y-4">
                    {mockReviews.map(review => (
                      <div key={review._id} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--gray-100)' }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold" style={{ color: 'var(--gray-900)' }}>
                            {review.customerId.name}
                          </span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                style={{ color: i < review.rating ? 'var(--warning)' : 'var(--gray-500)' }}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <p style={{ color: 'var(--gray-700)' }}>{review.comment}</p>
                        <p className="text-sm mt-2" style={{ color: 'var(--gray-500)' }}>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
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
