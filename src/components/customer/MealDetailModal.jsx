import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Plus, Minus } from 'lucide-react';

const MealDetailModal = ({ meal, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !meal) return null;

  const handleAddToCart = () => {
    navigate('/checkout', { state: { meal, quantity } });
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getPlaceholderColor = () => {
    const colors = {
      'breakfast': 'F59E0B',
      'lunch': '10B981', 
      'dinner': '6366F1',
      'snack': 'EC4899'
    };
    return colors[meal.category?.toLowerCase()] || 'FF6B35';
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
      onClick={handleOverlayClick}
    >
      <div 
        className="relative w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{ 
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* Image */}
        <div className="relative h-64 w-full">
          <img 
            src={meal.image || `https://placehold.co/800x400/${getPlaceholderColor()}/FFFFFF?text=${encodeURIComponent(meal.name)}`}
            alt={meal.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.background = `linear-gradient(135deg, #${getPlaceholderColor()} 0%, #${getPlaceholderColor()}dd 100%)`;
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <h2 
              className="text-2xl font-bold mb-2"
              style={{ color: '#111827' }}
            >
              {meal.name}
            </h2>
            
            {/* Location */}
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4" style={{ color: '#10B981' }} />
              <span 
                className="text-sm"
                style={{ color: '#6B7280' }}
              >
                {typeof meal.messId === 'object' ? meal.messId.name : 'Banton, Kitchen'}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400" style={{ color: '#FBBF24' }} />
                <span 
                  className="font-medium"
                  style={{ color: '#111827' }}
                >
                  {meal.averageRating || 4.5}
                </span>
              </div>
              <span 
                className="text-sm"
                style={{ color: '#6B7280' }}
              >
                ({meal.totalReviews || 0} reviews)
              </span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-2 mb-4">
            <span 
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: meal.dietaryType === 'Veg' ? '#10B981' : '#EF4444',
                color: '#FFFFFF'
              }}
            >
              {meal.dietaryType || 'Non-Veg'}
            </span>
            <span 
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: '#F3F4F6',
                color: '#374151'
              }}
            >
              {meal.category || 'Main Course'}
            </span>
            {meal.isAvailable !== false && (
              <span 
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: '#10B981',
                  color: '#FFFFFF'
                }}
              >
                Available
              </span>
            )}
          </div>

          {/* Description */}
          {meal.description && (
            <div className="mb-6">
              <h3 
                className="font-semibold mb-2"
                style={{ color: '#111827' }}
              >
                Description
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: '#6B7280' }}
              >
                {meal.description}
              </p>
            </div>
          )}

          {/* Price and Quantity */}
          <div className="flex items-center justify-between mb-6 p-4 rounded-lg"
            style={{ 
              backgroundColor: '#F9FAFB',
              border: '1px solid #E5E7EB'
            }}
          >
            <div>
              <span 
                className="text-sm block mb-1"
                style={{ color: '#6B7280' }}
              >
                Price
              </span>
              <span 
                className="text-3xl font-bold"
                style={{ color: '#111827' }}
              >
                ₹{meal.price}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-lg transition-all"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D1D5DB'
                }}
              >
                <Minus className="w-4 h-4" style={{ color: '#111827' }} />
              </button>
              <span 
                className="text-xl font-semibold w-8 text-center"
                style={{ color: '#111827' }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 rounded-lg transition-all"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D1D5DB'
                }}
              >
                <Plus className="w-4 h-4" style={{ color: '#111827' }} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg font-medium transition-all"
              style={{ 
                backgroundColor: '#F3F4F6',
                color: '#374151',
                border: '1px solid #D1D5DB'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 px-6 py-3 rounded-lg font-medium transition-all"
              style={{ 
                backgroundColor: '#3B82F6',
                color: '#FFFFFF'
              }}
            >
              Order Now (₹{meal.price * quantity})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

MealDetailModal.propTypes = {
  meal: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MealDetailModal;
