import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Plus, Minus, X, Package } from 'lucide-react';

const mealTypeColors = {
  breakfast: { accent: '#F97316', label: 'Breakfast' },
  lunch:     { accent: '#10B981', label: 'Lunch' },
  dinner:    { accent: '#6366F1', label: 'Dinner' },
  snack:     { accent: '#EC4899', label: 'Snack' },
};

const MealDetailModal = ({ meal, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedExtraIds, setSelectedExtraIds] = useState(new Set());

  if (!isOpen || !meal) return null;

  const typeKey = meal.mealType?.toLowerCase() || meal.category?.toLowerCase() || 'lunch';
  const colors = mealTypeColors[typeKey] || mealTypeColors.lunch;
  const availableExtras = (meal.extras || []).filter((e) => e.is_Available !== false);

  const toggleExtra = (extra) => {
    setSelectedExtraIds((prev) => {
      const next = new Set(prev);
      const key = extra._id || extra.name;
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const selectedExtras = availableExtras.filter((e) =>
    selectedExtraIds.has(e._id || e.name)
  );
  const extrasTotal = selectedExtras.reduce((s, e) => s + e.price, 0);
  const unitTotal = meal.price + extrasTotal;
  const grandTotal = unitTotal * quantity;

  const handleOrderNow = () => {
    navigate('/checkout', {
      state: {
        meal,
        quantity,
        selectedExtras: selectedExtras.map((e) => ({
          extraId: e._id,
          name: e.name,
          price: e.price,
        })),
      },
    });
    onClose();
  };

  const getPlaceholderColor = () => {
    const map = { breakfast: 'F97316', lunch: '10B981', dinner: '6366F1', snack: 'EC4899' };
    return map[typeKey] || 'FF6B35';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#FFFFFF' }}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image */}
        <div className="relative h-56 w-full">
          <img
            src={meal.image || `https://placehold.co/800x400/${getPlaceholderColor()}/FFFFFF?text=${encodeURIComponent(meal.name)}`}
            alt={meal.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.background = `linear-gradient(135deg, #${getPlaceholderColor()} 0%, #${getPlaceholderColor()}bb 100%)`;
            }}
          />
          {/* Veg/Non-veg indicator */}
          <span
            className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: '#FFFFFF',
              color: meal.is_Veg ? '#16A34A' : '#DC2626',
              border: `1.5px solid ${meal.is_Veg ? '#16A34A' : '#DC2626'}`,
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: meal.is_Veg ? '#16A34A' : '#DC2626' }}
            />
            {meal.is_Veg ? 'Veg' : 'Non-Veg'}
          </span>
          <span
            className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: colors.accent, color: '#FFFFFF' }}
          >
            {colors.label}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-bold" style={{ color: '#111827' }}>
                {meal.name}
              </h2>
              <span className="text-2xl font-bold shrink-0" style={{ color: '#111827' }}>
                ₹{meal.price}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" style={{ color: '#10B981' }} />
                <span className="text-sm" style={{ color: '#6B7280' }}>
                  {typeof meal.messId === 'object' ? meal.messId.name : 'Mess Kitchen'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400" style={{ color: '#FBBF24' }} />
                <span className="text-sm font-medium" style={{ color: '#111827' }}>
                  {meal.averageRating || 4.5}
                </span>
                <span className="text-xs" style={{ color: '#9CA3AF' }}>
                  ({meal.totalReviews || 0})
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          {meal.description && (
            <div className="mb-5">
              <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                {meal.description}
              </p>
            </div>
          )}

          {/* ── EXTRAS SECTION ── */}
          {availableExtras.length > 0 && (
            <div
              className="mb-5 rounded-xl p-4"
              style={{ backgroundColor: '#FFF7ED', border: '1px solid #FED7AA' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-4 h-4" style={{ color: '#C2410C' }} />
                <h3 className="font-semibold text-sm" style={{ color: '#C2410C' }}>
                  Add Extras
                </h3>
                <span className="text-xs ml-auto" style={{ color: '#9A3412' }}>
                  Optional add-ons
                </span>
              </div>
              <div className="space-y-2">
                {availableExtras.map((extra) => {
                  const key = extra._id || extra.name;
                  const checked = selectedExtraIds.has(key);
                  return (
                    <label
                      key={key}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all"
                      style={{
                        backgroundColor: checked ? '#FFEDD5' : '#FFFFFF',
                        border: `1.5px solid ${checked ? '#FB923C' : '#E5E7EB'}`,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleExtra(extra)}
                          className="w-4 h-4 rounded accent-orange-500"
                        />
                        <span className="text-sm font-medium" style={{ color: '#111827' }}>
                          {extra.name}
                        </span>
                      </div>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: checked ? '#C2410C' : '#374151' }}
                      >
                        +₹{extra.price}
                      </span>
                    </label>
                  );
                })}
              </div>
              {selectedExtras.length > 0 && (
                <p className="text-xs mt-2 text-right" style={{ color: '#92400E' }}>
                  Extras subtotal: ₹{extrasTotal}
                </p>
              )}
            </div>
          )}

          {/* Quantity + Total */}
          <div
            className="flex items-center justify-between mb-5 p-4 rounded-xl"
            style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}
          >
            <div>
              <span className="text-xs block mb-0.5" style={{ color: '#6B7280' }}>
                Total
              </span>
              <span className="text-3xl font-bold" style={{ color: '#111827' }}>
                ₹{grandTotal}
              </span>
              {selectedExtras.length > 0 && (
                <span className="text-xs block" style={{ color: '#9CA3AF' }}>
                  ₹{unitTotal} × {quantity}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-lg"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #D1D5DB' }}
              >
                <Minus className="w-4 h-4" style={{ color: '#111827' }} />
              </button>
              <span className="text-xl font-semibold w-8 text-center" style={{ color: '#111827' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 rounded-lg"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #D1D5DB' }}
              >
                <Plus className="w-4 h-4" style={{ color: '#111827' }} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl font-medium transition-all"
              style={{ backgroundColor: '#F3F4F6', color: '#374151', border: '1px solid #D1D5DB' }}
            >
              Cancel
            </button>
            <button
              onClick={handleOrderNow}
              className="flex-1 px-6 py-3 rounded-xl font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: '#3B82F6', color: '#FFFFFF' }}
            >
              Order Now — ₹{grandTotal}
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
