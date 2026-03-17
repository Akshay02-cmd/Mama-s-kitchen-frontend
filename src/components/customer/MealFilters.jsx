const MealFilters = ({ filters, onFilterChange }) => {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xl sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-1 h-8 rounded-full" style={{ backgroundColor: 'var(--primary-600)' }}></div>
        <h2 className="text-xl font-bold sm:text-2xl" style={{ color: 'var(--gray-900)' }}>
          Filter Meals
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block mb-3 font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--gray-700)' }}>
            Search
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Search meals..."
            className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
            style={{ 
              borderColor: 'var(--gray-200)',
              color: 'var(--gray-900)'
            }}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-3 font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--gray-700)' }}>
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 cursor-pointer"
            style={{ 
              borderColor: 'var(--gray-200)',
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
          <label className="block mb-3 font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--gray-700)' }}>
            Dietary Type
          </label>
          <select
            value={filters.dietaryType}
            onChange={(e) => handleChange('dietaryType', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 cursor-pointer"
            style={{ 
              borderColor: 'var(--gray-200)',
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
          <label className="block mb-3 font-semibold text-sm uppercase tracking-wider" style={{ color: 'var(--gray-700)' }}>
            Price Range
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleChange('priceRange', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 cursor-pointer"
            style={{ 
              borderColor: 'var(--gray-200)',
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
        <div className="mt-6 pt-6 border-t border-gray-100">
          <button
            onClick={() => onFilterChange({ search: '', category: 'all', dietaryType: 'all', priceRange: 'all' })}
            className="w-full rounded-xl px-6 py-3 font-semibold shadow-md transition-all duration-300 hover:shadow-lg sm:w-auto"
            style={{ 
              backgroundColor: 'var(--primary-600)', 
              color: 'var(--white)' 
            }}
          >
            ✕ Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default MealFilters;
