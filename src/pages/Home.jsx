import { useState, useEffect, useMemo } from "react";
import { MealsHeader, MealFilters, MealCard } from "../components/meals";
import Pagination from "../components/common/Pagination";
import { getAllMeals } from "../services/meal.service";

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    dietaryType: 'all',
    priceRange: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

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
            dietaryType: meal.is_Veg ? 'Veg' : 'Non-Veg',
            category: meal.mealType || 'Main Course',
            isAvailable: meal.is_Available,
            averageRating: meal.averageRating || 4.0,
            totalReviews: meal.totalReviews || 0,
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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const categories = [
    { id: "all", name: "All Meals" },
    { id: "breakfast", name: "Breakfast" },
    { id: "lunch", name: "Lunch" },
    { id: "dinner", name: "Dinner" },
    { id: "snack", name: "Snacks" },
  ];

  const filteredMeals = useMemo(() => {
    return meals.filter((meal) => {
      const matchesSearch =
        meal.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        meal.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'all' || meal.category === filters.category;
      
      return matchesCategory && matchesSearch;
    });
  }, [meals, filters]);

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
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <MealsHeader />

      <MealFilters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Loading and Error States */}
      {loading && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto text-center py-32">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mb-4"></div>
            <p className="text-xl text-slate-600">Loading delicious meals...</p>
          </div>
        </section>
      )}

      {error && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto text-center py-32">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-2xl font-semibold text-slate-900 mb-2">Oops! Something went wrong</p>
            <p className="text-slate-600">{error}</p>
          </div>
        </section>
      )}

      {/* Meals Grid */}
      {!loading && !error && (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            {filteredMeals.length === 0 ? (
              <div className="text-center py-32">
                <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-2xl font-semibold text-slate-900 mb-2">No meals found</p>
                <p className="text-slate-600">Try adjusting your search or filter to find what you're looking for</p>
              </div>
            ) : (
              <>
                {/* Results info and items per page selector */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-slate-700 text-lg">
                      Showing <span className="font-bold text-2xl text-amber-600">{filteredMeals.length}</span> delicious meals
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-md border border-gray-100">
                    <label htmlFor="itemsPerPage" className="text-sm font-semibold uppercase tracking-wider text-slate-600">
                      Show:
                    </label>
                    <select
                      id="itemsPerPage"
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="px-4 py-2 rounded-lg border-2 border-gray-200 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all font-semibold cursor-pointer"
                    >
                      <option value={8}>8</option>
                      <option value={12}>12</option>
                      <option value={16}>16</option>
                      <option value={24}>24</option>
                    </select>
                  </div>
                </div>

                {/* Meals grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
                  {paginatedMeals.map((meal) => (
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
        </section>
      )}
    </main>
  );
};

export default Home;
