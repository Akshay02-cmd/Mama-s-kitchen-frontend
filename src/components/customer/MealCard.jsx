import { memo } from 'react';
import PropTypes from 'prop-types';
import { MapPin } from 'lucide-react';

const MealCard = memo(({ meal, showAddToCart = false, onCardClick }) => {
  const getPlaceholderColor = () => {
    const colors = {
      'breakfast': 'F59E0B',
      'lunch': '10B981', 
      'dinner': '6366F1',
      'snack': 'EC4899'
    };
    return colors[meal.category?.toLowerCase()] || 'FF6B35';
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    // Add to cart logic here
    console.log('Adding to cart:', meal._id);
  };

  return (
    <div 
      className="rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
      style={{ 
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB'
      }}
      onClick={() => onCardClick && onCardClick(meal)}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-40">
        <img 
          src={meal.image || `https://placehold.co/400x250/${getPlaceholderColor()}/FFFFFF?text=${encodeURIComponent(meal.name.substring(0, 20))}`}
          alt={meal.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.style.background = `linear-gradient(135deg, #${getPlaceholderColor()} 0%, #${getPlaceholderColor()}dd 100%)`;
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Meal Name */}
        <h3 
          className="font-semibold mb-2 text-base"
          style={{ color: '#111827' }}
        >
          {meal.name}
        </h3>

        {/* Location/Mess Info */}
        <div className="flex items-center gap-1 mb-3">
          <MapPin className="w-3.5 h-3.5" style={{ color: '#10B981' }} />
          <span 
            className="text-xs"
            style={{ color: '#6B7280' }}
          >
            {typeof meal.messId === 'object' ? meal.messId.name : 'Banton, Kitchen'}
          </span>
        </div>

        {/* Price and Rating/Add to Cart */}
        {showAddToCart ? (
          <div className="flex items-center justify-between">
            <span 
              className="font-bold text-lg"
              style={{ color: '#111827' }}
            >
              ₹{meal.price}
            </span>
            <button
              onClick={handleAddToCart}
              className="px-4 py-1.5 rounded-md text-sm font-medium transition-all"
              style={{
                backgroundColor: '#3B82F6',
                color: '#FFFFFF'
              }}
            >
              Order Now
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <span className="text-sm" style={{ color: '#FBBF24' }}>★</span>
            <span 
              className="text-sm font-medium"
              style={{ color: '#111827' }}
            >
              {meal.averageRating || 4.5}
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

MealCard.displayName = 'MealCard';

MealCard.propTypes = {
  meal: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    category: PropTypes.string,
    messId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string
      })
    ]),
    price: PropTypes.number,
    averageRating: PropTypes.number
  }).isRequired,
  showAddToCart: PropTypes.bool,
  onCardClick: PropTypes.func
};

export default MealCard;
