import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import MealCard from '../../components/customer/MealCard';
import MealDetailModal from '../../components/customer/MealDetailModal';
import MealFilters from '../../components/customer/MealFilters';
import Pagination from '../../components/shared/Pagination';
import { getAllMeals } from '../../services/meal.service';

const MealsListPage = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [filters, setFilters] = useState({ search: '', category: 'all', dietaryType: 'all', priceRange: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await getAllMeals();
        const mealsData = response.meal || response.data || [];
        setMeals(mealsData.map((meal) => ({ ...meal, dietaryType: meal.is_Veg ? 'Veg' : 'Non-Veg', category: meal.mealType ? meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1) : 'Main Course', isAvailable: meal.is_Available, averageRating: meal.averageRating || 4, totalReviews: meal.totalReviews || 0, messId: meal.messId || { name: "Mumma's Kitchen", _id: meal.messId } })));
      } catch (fetchError) {
        console.error('Error fetching meals:', fetchError);
        setError('We could not load the menu. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  const handleFilterChange = (newFilters) => { setFilters(newFilters); setCurrentPage(1); };
  const filteredMeals = useMemo(() => meals.filter((meal) => {
    const search = filters.search.toLowerCase();
    const matchesSearch = meal.name.toLowerCase().includes(search) || (meal.description || '').toLowerCase().includes(search);
    const matchesCategory = filters.category === 'all' || meal.category === filters.category;
    const matchesDiet = filters.dietaryType === 'all' || meal.dietaryType === filters.dietaryType;
    const matchesPrice = filters.priceRange === 'all' || (filters.priceRange === 'low' && meal.price < 100) || (filters.priceRange === 'medium' && meal.price >= 100 && meal.price < 150) || (filters.priceRange === 'high' && meal.price >= 150);
    return matchesSearch && matchesCategory && matchesDiet && matchesPrice;
  }), [filters, meals]);
  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);
  const paginatedMeals = useMemo(() => filteredMeals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [filteredMeals, currentPage, itemsPerPage]);

  return (
    <div className="min-h-screen bg-[#fffaf5]"><div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-orange-700 hover:text-orange-800"><ArrowLeft className="h-4 w-4" /> Back home</Link><p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-600">Mumma's Kitchen</p><h1 className="font-display mt-2 text-5xl text-stone-950">The full menu</h1><p className="mt-2 max-w-xl text-stone-600">Comforting classics and fresh specials, prepared in one kitchen.</p></div><div className="flex items-center gap-2 rounded-xl bg-orange-100 px-3 py-2 text-sm font-bold text-orange-800"><Utensils className="h-4 w-4" /> {filteredMeals.length} dishes</div></div>
      <MealFilters filters={filters} onFilterChange={handleFilterChange} />
      {loading && <div className="grid gap-5 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{[1, 2, 3, 4, 5, 6].map((item) => <div key={item} className="h-80 animate-pulse rounded-2xl bg-orange-100" />)}</div>}
      {error && <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>}
      {!loading && !error && filteredMeals.length === 0 && <div className="mt-8 rounded-2xl border border-dashed border-orange-200 bg-white p-12 text-center text-stone-600">No dishes match these filters. Try a different craving.</div>}
      {!loading && !error && filteredMeals.length > 0 && <><div className="my-6 flex flex-col gap-3 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between"><span>Showing <strong className="text-stone-900">{paginatedMeals.length}</strong> of <strong className="text-stone-900">{filteredMeals.length}</strong> dishes</span><label className="flex items-center gap-2">Per page<select value={itemsPerPage} onChange={(event) => { setItemsPerPage(Number(event.target.value)); setCurrentPage(1); }} className="rounded-lg border bg-white px-2 py-1.5 text-stone-700" style={{ borderColor: 'var(--border-light)' }}><option value={6}>6</option><option value={12}>12</option><option value={24}>24</option></select></label></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{paginatedMeals.map((meal) => <MealCard key={meal._id} meal={meal} showAddToCart onCardClick={setSelectedMeal} />)}</div><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }} totalItems={filteredMeals.length} itemsPerPage={itemsPerPage} className="mt-8" /></>}
    </div><MealDetailModal meal={selectedMeal} isOpen={Boolean(selectedMeal)} onClose={() => setSelectedMeal(null)} /></div>
  );
};

export default MealsListPage;
