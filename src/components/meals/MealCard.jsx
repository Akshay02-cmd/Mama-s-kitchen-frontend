import { Link } from 'react-router-dom';
import { memo } from 'react';

const MealCard = memo(({ meal }) => {
  return (
    <Link to={`/meals/${meal._id}`} className="block">
      <div 
        className="rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        style={{ backgroundColor: 'var(--white)' }}
      >
        {/* Image */}
        <div className="relative">
          <img 
            src={`https://via.placeholder.com/400x250/FF6B35/FFFFFF?text=${encodeURIComponent(meal.name)}`}
            alt={meal.name}
            className="w-full h-48 object-cover"
          />
          {!meal.isAvailable && (
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            >
              <span className="text-white text-lg font-bold">Not Available</span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span 
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: meal.dietaryType === 'Veg' ? 'var(--accent-500)' : 'var(--error)',
                color: 'var(--white)'
              }}
            >
              {meal.dietaryType}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category & Mess Name */}
          <div className="flex items-center justify-between mb-2">
            <span 
              className="text-xs font-medium"
              style={{ color: 'var(--gray-500)' }}
            >
              {meal.category}
            </span>
            <span 
              className="text-xs"
              style={{ color: 'var(--primary-500)' }}
            >
              {meal.messId.name}
            </span>
          </div>

          {/* Name */}
          <h3 
            className="text-lg font-bold mb-2 line-clamp-1"
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span style={{ color: 'var(--warning)' }}>★</span>
              <span className="font-semibold text-sm" style={{ color: 'var(--gray-900)' }}>
                {meal.averageRating}
              </span>
              <span className="text-xs" style={{ color: 'var(--gray-500)' }}>
                ({meal.totalReviews})
              </span>
            </div>
            <span 
              className="text-xl font-bold"
              style={{ color: 'var(--primary-500)' }}
            >
              ₹{meal.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
});

MealCard.displayName = 'MealCard';

export default MealCard;
