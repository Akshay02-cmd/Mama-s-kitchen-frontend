import { useState, useMemo, useEffect } from 'react';
import MealCard from '../components/meals/MealCard';
import MealFilters from '../components/meals/MealFilters';
import PageHeader from '../components/common/PageHeader';
import Pagination from '../components/common/Pagination';
import { getAllMeals } from '../services/meal.service';

const MealsListPage = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const response = await getAllMeals();
        // Backend returns { meal: [...] } not { success: true, data: [...] }
        const mealsData = response.meal || response.data || [];
        
        if (mealsData && mealsData.length > 0) {
          // Transform backend data to match frontend expectations
          const transformedMeals = mealsData.map(meal => ({
            ...meal,
            // Backend uses is_Veg, frontend expects dietaryType
            dietaryType: meal.is_Veg ? 'Veg' : 'Non-Veg',
            // Backend uses mealType, map to category
            category: meal.mealType ? meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1) : 'Main Course',
            // Backend uses is_Available, frontend expects isAvailable
            isAvailable: meal.is_Available,
            // Default ratings if not present
            averageRating: meal.averageRating || 4.0,
            totalReviews: meal.totalReviews || 0,
            // Ensure messId is an object
            messId: meal.messId || { name: 'Mama\'s Kitchen Central', _id: meal.messId }
          }));
          setMeals(transformedMeals);
        } else {
          setMeals([]);
        }
      } catch (err) {
        console.error('Error fetching meals:', err);
        setError('Failed to load meals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    dietaryType: 'all',
    priceRange: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const filteredMeals = useMemo(() => {
    return meals.filter(meal => {
      const matchesSearch = meal.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           meal.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'all' || meal.category === filters.category;
      const matchesDiet = filters.dietaryType === 'all' || meal.dietaryType === filters.dietaryType;
      
      let matchesPrice = true;
      if (filters.priceRange === 'low') matchesPrice = meal.price < 100;
      else if (filters.priceRange === 'medium') matchesPrice = meal.price >= 100 && meal.price < 150;
      else if (filters.priceRange === 'high') matchesPrice = meal.price >= 150;

      return matchesSearch && matchesCategory && matchesDiet && matchesPrice;
    });
  }, [filters, meals]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);
  const paginatedMeals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredMeals.slice(startIndex, endIndex);
  }, [filteredMeals, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader 
          title="Our Meals"
          subtitle="Discover delicious meals from various mess kitchens"
        />

        {/* Filters */}
        <div className="mb-10">
          <MealFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-md">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200" style={{ borderTopColor: 'var(--primary-600)' }}></div>
            <p className="mt-6 text-lg font-medium" style={{ color: 'var(--gray-600)' }}>Loading delicious meals...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-md">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(231, 76, 60, 0.1)' }}>
              <span className="text-4xl">⚠️</span>
            </div>
            <p className="text-xl font-semibold" style={{ color: 'var(--error)' }}>{error}</p>
          </div>
        )}

        {/* Meals Grid */}
        {!loading && !error && (
          <div className="mt-8">
            {filteredMeals.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-md">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary-50)' }}>
                  <span className="text-5xl">🍴</span>
                </div>
                <p className="text-2xl font-bold mb-2" style={{ color: 'var(--gray-900)' }}>
                  No meals found
                </p>
                <p className="text-lg" style={{ color: 'var(--gray-600)' }}>
                  Try adjusting your filters to discover more delicious options
                </p>
              </div>
            ) : (
              <>
                {/* Results info and items per page selector */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-lg font-medium" style={{ color: 'var(--gray-700)' }}>
                      <span className="font-bold text-2xl" style={{ color: 'var(--primary-600)' }}>{filteredMeals.length}</span> meal{filteredMeals.length !== 1 ? 's' : ''} found
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-md border border-gray-100">
                    <label htmlFor="itemsPerPage" className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--gray-600)' }}>
                      Show:
                    </label>
                    <select
                      id="itemsPerPage"
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="px-4 py-2 rounded-lg border-2 font-semibold cursor-pointer transition-all focus:outline-none focus:ring-2"
                      style={{ 
                        borderColor: 'var(--gray-200)',
                        color: 'var(--gray-700)',
                        backgroundColor: 'var(--white)'
                      }}
                    >
                      <option value={6}>6</option>
                      <option value={12}>12</option>
                      <option value={24}>24</option>
                      <option value={48}>48</option>
                    </select>
                  </div>
                </div>

                {/* Meals grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                  {paginatedMeals.map(meal => (
                    <MealCard key={meal._id} meal={meal} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={filteredMeals.length}
                  itemsPerPage={itemsPerPage}
                  className="mt-8"
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MealsListPage;
