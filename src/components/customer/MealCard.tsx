import { memo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus } from 'lucide-react';

const mealTypeColors = {
  breakfast: { bg: 'FFF7ED', accent: 'F97316', label: 'Breakfast' },
  lunch:     { bg: 'F0FDF4', accent: '10B981', label: 'Lunch' },
  dinner:    { bg: 'EEF2FF', accent: '6366F1', label: 'Dinner' },
  snack:     { bg: 'FDF2F8', accent: 'EC4899', label: 'Snack' },
};

const MealCard = memo(({ meal, showAddToCart = false, onCardClick }) => {
  const navigate = useNavigate();

  const typeKey = meal.mealType?.toLowerCase() || meal.category?.toLowerCase() || 'lunch';
  const colors = mealTypeColors[typeKey] || mealTypeColors.lunch;

  const availableExtras = (meal.extras || []).filter((e) => e.is_Available !== false);

  const handleOrderNow = (e) => {
    e.stopPropagation();
    navigate('/checkout', { state: { meal, quantity: 1 } });
  };

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer group"
      style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
      onClick={() => onCardClick && onCardClick(meal)}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-44">
        <img
          src={meal.image || `https://placehold.co/400x280/${colors.accent.replace('#','')}/FFFFFF?text=${encodeURIComponent(meal.name.substring(0, 18))}`}
          alt={meal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.style.background = `linear-gradient(135deg, #${colors.accent} 0%, #${colors.accent}bb 100%)`;
          }}
        />
        {/* Meal type badge */}
        <span
          className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold"
          style={{ backgroundColor: `#${colors.bg}`, color: `#${colors.accent}` }}
        >
          {colors.label}
        </span>
        {/* Veg / Non-veg dot */}
        <span
          className="absolute top-2 right-2 w-6 h-6 rounded-sm flex items-center justify-center"
          style={{ backgroundColor: '#FFFFFF', border: `2px solid ${meal.is_Veg ? '#16A34A' : '#DC2626'}` }}
          title={meal.is_Veg ? 'Vegetarian' : 'Non-Vegetarian'}
        >
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: meal.is_Veg ? '#16A34A' : '#DC2626' }}
          />
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name */}
        <h3 className="font-semibold text-base mb-1 truncate" style={{ color: '#111827' }}>
          {meal.name}
        </h3>

        {/* Mess name */}
        <div className="flex items-center gap-1 mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: '#10B981' }} />
          <span className="text-xs truncate" style={{ color: '#6B7280' }}>
            {typeof meal.messId === 'object' ? meal.messId.name : 'Mess Kitchen'}
          </span>
        </div>

        {/* Extras pill */}
        {availableExtras.length > 0 && (
          <div className="flex items-center gap-1 mb-3">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: '#FFF7ED', color: '#C2410C', border: '1px solid #FED7AA' }}
            >
              <Plus className="w-3 h-3" />
              {availableExtras.length} extra{availableExtras.length > 1 ? 's' : ''} available
            </span>
          </div>
        )}

        {/* Price row */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg" style={{ color: '#111827' }}>
            ₹{meal.price}
          </span>
          {showAddToCart ? (
            <button
              onClick={handleOrderNow}
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: '#3B82F6', color: '#FFFFFF' }}
            >
              Order
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <span className="text-sm" style={{ color: '#FBBF24' }}>★</span>
              <span className="text-sm font-medium" style={{ color: '#374151' }}>
                {meal.averageRating || 4.5}
              </span>
            </div>
          )}
        </div>
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
    mealType: PropTypes.string,
    category: PropTypes.string,
    is_Veg: PropTypes.bool,
    messId: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ name: PropTypes.string })]),
    price: PropTypes.number,
    averageRating: PropTypes.number,
    extras: PropTypes.array,
  }).isRequired,
  showAddToCart: PropTypes.bool,
  onCardClick: PropTypes.func
};

export default MealCard;
