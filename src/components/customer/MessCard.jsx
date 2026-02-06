import { Link } from 'react-router-dom';
import { memo } from 'react';

const MessCard = memo(({ mess }) => {
  return (
    <Link to={`/mess/${mess._id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
        {/* Header Image */}
        <div 
          className="h-32 flex items-center justify-center text-white text-3xl font-bold"
          style={{ backgroundColor: 'var(--primary-500)' }}
        >
          {mess.name.substring(0, 1)}
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--gray-900)' }}>
            {mess.name}
          </h2>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <span style={{ color: 'var(--warning)' }}>★</span>
              <span className="font-semibold" style={{ color: 'var(--gray-900)' }}>
                {mess.averageRating}
              </span>
              <span className="text-sm" style={{ color: 'var(--gray-500)' }}>
                ({mess.totalReviews} reviews)
              </span>
            </div>
          </div>

          <p className="mb-4 line-clamp-2" style={{ color: 'var(--gray-700)' }}>
            {mess.description}
          </p>

          {/* Cuisine Types */}
          <div className="flex flex-wrap gap-2 mb-4">
            {mess.cuisineTypes.map((cuisine, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm"
                style={{ 
                  backgroundColor: 'var(--primary-50)', 
                  color: 'var(--primary-500)' 
                }}
              >
                {cuisine}
              </span>
            ))}
          </div>

          {/* Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-start gap-2">
              <span style={{ color: 'var(--gray-500)' }}>📍</span>
              <span className="text-sm" style={{ color: 'var(--gray-700)' }}>
                {mess.address}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--gray-500)' }}>🕐</span>
              <span className="text-sm" style={{ color: 'var(--gray-700)' }}>
                {mess.openingHours}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--gray-500)' }}>🍽️</span>
              <span className="text-sm" style={{ color: 'var(--gray-700)' }}>
                {mess.totalMeals} meals available
              </span>
            </div>
          </div>

          {/* View Button */}
          <button
            className="w-full py-2 rounded-lg font-semibold"
            style={{ 
              backgroundColor: 'var(--primary-500)', 
              color: 'var(--white)' 
            }}
          >
            View Menu
          </button>
        </div>
      </div>
    </Link>
  );
});

MessCard.displayName = 'MessCard';

export default MessCard;
