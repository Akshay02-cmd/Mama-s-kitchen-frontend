const MealFilters = ({ filters, onFilterChange }) => {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
        Filter Meals
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block mb-2 font-medium" style={{ color: 'var(--gray-900)' }}>
            Search
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Search meals..."
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
            style={{ 
              borderColor: 'var(--gray-500)',
              color: 'var(--gray-900)'
            }}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-medium" style={{ color: 'var(--gray-900)' }}>
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
            style={{ 
              borderColor: 'var(--gray-500)',
              color: 'var(--gray-900)'
            }}
          >
            <option value="all">All Categories</option>
            <option value="Main Course">Main Course</option>
            <option value="Dal">Dal</option>
            <option value="Rice">Rice</option>
            <option value="Bread">Bread</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>

        {/* Dietary Type */}
        <div>
          <label className="block mb-2 font-medium" style={{ color: 'var(--gray-900)' }}>
            Dietary Type
          </label>
          <select
            value={filters.dietaryType}
            onChange={(e) => handleChange('dietaryType', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
            style={{ 
              borderColor: 'var(--gray-500)',
              color: 'var(--gray-900)'
            }}
          >
            <option value="all">All Types</option>
            <option value="Veg">Vegetarian</option>
            <option value="Non-Veg">Non-Vegetarian</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block mb-2 font-medium" style={{ color: 'var(--gray-900)' }}>
            Price Range
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleChange('priceRange', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
            style={{ 
              borderColor: 'var(--gray-500)',
              color: 'var(--gray-900)'
            }}
          >
            <option value="all">All Prices</option>
            <option value="low">Under ₹100</option>
            <option value="medium">₹100 - ₹150</option>
            <option value="high">Above ₹150</option>
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      {(filters.search || filters.category !== 'all' || filters.dietaryType !== 'all' || filters.priceRange !== 'all') && (
        <button
          onClick={() => onFilterChange({ search: '', category: 'all', dietaryType: 'all', priceRange: 'all' })}
          className="mt-4 px-4 py-2 rounded-lg font-medium"
          style={{ 
            backgroundColor: 'var(--primary-500)', 
            color: 'var(--white)' 
          }}
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default MealFilters;
