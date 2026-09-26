import { useEffect, useState } from 'react';
import { ArrowRight, Clock3, Search, ShieldCheck, Sparkles, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MealCard } from '../../components/customer';
import MealDetailModal from '../../components/customer/MealDetailModal';
import { getAllMeals } from '../../services/meal.service';

const Home = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await getAllMeals();
        const mealsData = response.meal || response.data || [];
        setMeals(mealsData.map((meal) => ({
          ...meal,
          dietaryType: meal.is_Veg ? 'Veg' : 'Non-Veg',
          category: meal.mealType || 'Main Course',
          isAvailable: meal.is_Available,
          averageRating: meal.averageRating || 4.5,
          totalReviews: meal.totalReviews || 0,
          messId: meal.messId || { name: "Mumma's Kitchen", _id: meal.messId },
        })));
      } catch (fetchError) {
        console.error('Error fetching meals:', fetchError);
        setError('We could not load today\'s menu. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const filteredMeals = meals.filter((meal) => meal.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const featuredMeals = filteredMeals.slice(0, 4);

  return (
    <div className="bg-[#fffaf5] text-stone-900">
      <section className="relative overflow-hidden bg-[#f5e6d5]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_0.9fr] md:py-20 lg:px-8 lg:py-24">
          <div className="relative z-10 animate-fade-in-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-orange-700"><Sparkles className="h-3.5 w-3.5" /> Made fresh today</div>
            <h1 className="font-display max-w-xl text-5xl leading-[0.98] text-stone-950 sm:text-6xl lg:text-7xl">Comfort food, <span className="text-orange-600">right on time.</span></h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-stone-600 sm:text-lg">Home-style meals prepared with care, packed warm, and delivered from Mumma's Kitchen to your table.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/meals" className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-orange-600/20 hover:-translate-y-0.5 hover:bg-orange-700">Explore today's menu <ArrowRight className="h-4 w-4" /></Link>
              <a href="#how-it-works" className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white/60 px-5 py-3.5 font-bold text-stone-700 hover:bg-white">How it works</a>
            </div>
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-4xl shadow-2xl shadow-orange-900/10 sm:min-h-100">
            <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85" alt="A warm bowl of home-style food" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-stone-950/65 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white"><div><p className="text-sm text-orange-100">Tonight's recommendation</p><p className="font-display mt-1 text-2xl">Dal Khichdi Bowl</p></div><span className="rounded-full bg-white/15 px-3 py-1.5 text-sm font-bold backdrop-blur">₹85</span></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-600">The menu</p><h2 className="font-display mt-2 text-4xl text-stone-950">What are you craving?</h2><p className="mt-2 text-stone-600">A small menu made with big care.</p></div><div className="relative w-full sm:max-w-xs"><Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" /><label htmlFor="menu-search" className="sr-only">Search the menu</label><input id="menu-search" type="search" placeholder="Search today's dishes" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-stone-900 shadow-sm placeholder:text-stone-400" style={{ borderColor: 'var(--border-light)' }} /></div></div>
        {loading && <div className="grid gap-5 py-8 sm:grid-cols-2 lg:grid-cols-4">{[1, 2, 3, 4].map((item) => <div key={item} className="h-80 animate-pulse rounded-2xl bg-orange-100" />)}</div>}
        {error && <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>}
        {!loading && !error && featuredMeals.length === 0 && <div className="mt-8 rounded-2xl border border-dashed border-orange-200 bg-white p-10 text-center text-stone-600">No dishes match that search.</div>}
        {!loading && !error && featuredMeals.length > 0 && <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{featuredMeals.map((meal) => <MealCard key={meal._id} meal={meal} showAddToCart onCardClick={setSelectedMeal} />)}</div>}
        <div className="mt-8 text-center"><Link to="/meals" className="inline-flex items-center gap-2 font-bold text-orange-700 hover:text-orange-800">View full menu <ArrowRight className="h-4 w-4" /></Link></div>
      </section>

      <section id="how-it-works" className="border-y border-orange-100 bg-white"><div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8 lg:py-16">{[
        { icon: UtensilsCrossed, title: 'Choose your meal', text: 'Browse a focused menu of dishes made in our kitchen.' },
        { icon: Clock3, title: 'Pick your time', text: 'Tell us where and when you would like your meal.' },
        { icon: ShieldCheck, title: 'Eat with confidence', text: 'Fresh ingredients, careful packing, and no surprises.' },
      ].map(({ icon: Icon, title, text }, index) => <div key={title} className="relative flex gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700"><Icon className="h-5 w-5" /></div><div><p className="text-xs font-bold uppercase tracking-wider text-orange-600">0{index + 1}</p><h3 className="mt-1 font-bold text-stone-900">{title}</h3><p className="mt-1 text-sm leading-6 text-stone-600">{text}</p></div></div>)}</div></section>
      <MealDetailModal meal={selectedMeal} isOpen={Boolean(selectedMeal)} onClose={() => setSelectedMeal(null)} />
    </div>
  );
};

export default Home;
