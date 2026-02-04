import { Link } from 'react-router-dom';
import { memo } from 'react';

const MealCard = memo(({ meal }) => {
  // Generate a color based on meal type for placeholder
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
    <Link to={`/meals/${meal._id}`} className="block group">
      <div 
        className="rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
        style={{ backgroundColor: 'var(--white)' }}
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <img 
            src={meal.image || `https://placehold.co/400x250/${getPlaceholderColor()}/FFFFFF?text=${encodeURIComponent(meal.name.substring(0, 20))}`}
            alt={meal.name}
            className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              // Fallback to solid color div if image fails
              e.target.style.display = 'none';
              e.target.parentElement.style.background = `linear-gradient(135deg, #${getPlaceholderColor()} 0%, #${getPlaceholderColor()}dd 100%)`;
              const fallbackDiv = document.createElement('div');
              fallbackDiv.className = 'w-full h-48 flex items-center justify-center text-white text-xl font-bold p-4 text-center';
              fallbackDiv.textContent = meal.name;
              e.target.parentElement.appendChild(fallbackDiv);
            }}
          />
          {!meal.isAvailable && (
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            >
              <span className="text-white text-lg font-bold">Not Available</span>
            </div>
          )}
          <div className="absolute top-4 right-4">
            <span 
              className="px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm border border-white/30"
              style={{ 
                backgroundColor: meal.dietaryType === 'Veg' ? 'rgba(39, 174, 96, 0.95)' : 'rgba(231, 76, 60, 0.95)',
                color: 'var(--white)'
              }}
            >
              {meal.dietaryType}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category & Mess Name */}
          <div className="flex items-center justify-between mb-3">
            <span 
              className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md"
              style={{ color: 'var(--primary-600)', backgroundColor: 'var(--primary-50)' }}
            >
              {meal.category}
            </span>
            <span 
              className="text-xs font-medium"
              style={{ color: 'var(--gray-500)' }}
            >
              {meal.messId.name}
            </span>
          </div>

          {/* Name */}
          <h3 
            className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors"
            style={{ color: 'var(--gray-900)' }}
          >
            {meal.name}
          </h3>

          {/* Description */}
          <p 
            className="text-sm mb-3 line-clamp-2"
            style={{ color: 'var(--gray-700)' }}
          >
            {meal.description}
          </p>

          {/* Rating & Price */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <span className="text-lg" style={{ color: 'var(--warning)' }}>★</span>
              <span className="font-bold text-base" style={{ color: 'var(--gray-900)' }}>
                {meal.averageRating}
              </span>
              <span className="text-xs" style={{ color: 'var(--gray-500)' }}>
                ({meal.totalReviews})
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span 
                className="text-2xl font-bold"
                style={{ color: 'var(--primary-600)' }}
              >
                ₹{meal.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

MealCard.displayName = 'MealCard';

export default MealCard;
