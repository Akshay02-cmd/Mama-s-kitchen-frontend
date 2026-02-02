import { Link } from 'react-router-dom';

const FoodPreferences = ({ preferences, favoriteMessId }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
        Food Preferences
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--gray-700)' }}>
          Favorite Cuisines
        </label>
        <div className="flex flex-wrap gap-2">
          {preferences.favoriteCuisines.map((cuisine, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full font-medium"
              style={{ 
                backgroundColor: 'var(--primary-50)', 
                color: 'var(--primary-500)' 
              }}
            >
              {cuisine}
            </span>
          ))}
        </div>
      </div>
      {favoriteMessId && (
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--gray-700)' }}>
            Favorite Mess
          </label>
          <Link 
            to={`/mess/${favoriteMessId._id}`}
            className="text-lg font-semibold hover:underline"
            style={{ color: 'var(--primary-500)' }}
          >
            {favoriteMessId.name}
          </Link>
        </div>
      )}
    </div>
  );
};

export default FoodPreferences;
