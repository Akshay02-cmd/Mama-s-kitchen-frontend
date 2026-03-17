import { useState, useMemo, useEffect } from 'react';
import MealCard from '../../components/customer/MealCard';
import MealDetailModal from '../../components/customer/MealDetailModal';
import MealFilters from '../../components/customer/MealFilters';
import Pagination from '../../components/shared/Pagination';
import Sidebar from '../../components/shared/Sidebar';
import { getAllMeals } from '../../services/meal.service';

const MealsListPage = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            messId: meal.messId || { name: 'Mumas Kitchen Central', _id: meal.messId }
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

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMeal(null);
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <Sidebar />
      
      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <h1 
          className="text-3xl font-bold mb-6"
          style={{ color: '#111827' }}
        >
          Our Meals
        </h1>

        {/* Filters */}
        <div className="mb-6">
          <MealFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4" style={{ color: '#6B7280' }}>Loading meals...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p style={{ color: '#EF4444' }}>{error}</p>
          </div>
        )}

        {/* Meals Grid */}
        {!loading && !error && (
          <div>
            {filteredMeals.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl" style={{ color: '#6B7280' }}>
                  No meals found. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <>
                {/* Results info */}
                <div className="flex items-center justify-between mb-6">
                  <p style={{ color: '#6B7280' }}>
                    <span className="font-bold" style={{ color: '#111827' }}>{filteredMeals.length}</span> meal{filteredMeals.length !== 1 ? 's' : ''} found
                  </p>
                  <div className="flex items-center gap-3 px-4 py-2 rounded-lg"
                    style={{ 
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB'
                    }}>
                    <label htmlFor="itemsPerPage" className="text-sm font-medium"
                      style={{ color: '#6B7280' }}>
                      Show:
                    </label>
                    <select
                      id="itemsPerPage"
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="px-3 py-1 rounded border font-medium cursor-pointer"
                      style={{ 
                        backgroundColor: '#FFFFFF',
                        borderColor: '#D1D5DB',
                        color: '#111827'
                      }}
                    >
                      <option value={6}>6</option>
                      <option value={12}>12</option>
                      <option value={24}>24</option>
                    </select>
                  </div>
                </div>

                {/* Meals grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginatedMeals.map(meal => (
                    <MealCard key={meal._id} meal={meal} showAddToCart={true} onCardClick={handleMealClick} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={filteredMeals.length}
                  itemsPerPage={itemsPerPage}
                />
              </>
            )}
          </div>
        )}
      </main>

      {/* Meal Detail Modal */}
      <MealDetailModal 
        meal={selectedMeal}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default MealsListPage;
