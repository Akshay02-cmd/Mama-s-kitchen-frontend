import { useState, useEffect } from "react";
import { MealCard } from "../../components/customer";
import MealDetailModal from "../../components/customer/MealDetailModal";
import { getAllMeals } from "../../services/meal.service";
import Sidebar from "../../components/shared/Sidebar.jsx";
import { Search } from "lucide-react";

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const response = await getAllMeals();
        const mealsData = response.meal || response.data || [];
        
        if (mealsData && mealsData.length > 0) {
          const transformedMeals = mealsData.map(meal => ({
            ...meal,
            dietaryType: meal.is_Veg ? 'Veg' : 'Non-Veg',
            category: meal.mealType || 'Main Course',
            isAvailable: meal.is_Available,
            averageRating: meal.averageRating || 4.5,
            totalReviews: meal.totalReviews || 0,
            messId: meal.messId || { name: 'Banton, Kitchen', _id: meal.messId }
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

  // Filter meals by search
  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group meals by category
  const todayLunch = filteredMeals.filter(m => m.category?.toLowerCase() === 'lunch').slice(0, 4);
  const tomorrowDinner = filteredMeals.filter(m => m.category?.toLowerCase() === 'dinner').slice(0, 4);

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
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-4 pt-20 md:ml-64 md:p-8 md:pt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 
            className="mb-6 text-2xl font-bold sm:text-3xl"
            style={{ color: '#111827' }}
          >
            Dashboard
          </h1>

          {/* Search Bar */}
          <div className="relative max-w-md mb-6">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: '#9CA3AF' }}
            />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg transition-all"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                color: '#111827'
              }}
            />
          </div>
        </div>

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

        {!loading && !error && (
          <>
            {/* Today's Lunch */}
            <section className="mb-10">
              <h2 
                className="mb-4 text-xl font-bold sm:text-2xl"
                style={{ color: '#111827' }}
              >
                Today's Lunch
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {todayLunch.length > 0 ? (
                  todayLunch.map((meal) => (
                    <MealCard key={meal._id} meal={meal} showAddToCart={true} onCardClick={handleMealClick} />
                  ))
                ) : (
                  <p style={{ color: '#6B7280' }}>No lunch items available</p>
                )}
              </div>
            </section>

            {/* Tomorrow's Dinner */}
            <section>
              <h2 
                className="mb-4 text-xl font-bold sm:text-2xl"
                style={{ color: '#111827' }}
              >
                Tomorrow's Dinner
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tomorrowDinner.length > 0 ? (
                  tomorrowDinner.map((meal) => (
                    <MealCard key={meal._id} meal={meal} showAddToCart={true} onCardClick={handleMealClick} />
                  ))
                ) : (
                  <p style={{ color: '#6B7280' }}>No dinner items available</p>
                )}
              </div>
            </section>
          </>
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

export default Home;
