import { Search, SlidersHorizontal, X } from 'lucide-react';

const MealFilters = ({ filters, onFilterChange }) => {
  const handleChange = (key, value) => onFilterChange({ ...filters, [key]: value });
  const hasFilters = filters.search || filters.category !== 'all' || filters.dietaryType !== 'all' || filters.priceRange !== 'all';

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm sm:p-5" style={{ borderColor: 'var(--border-light)' }}>
      <div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-2"><SlidersHorizontal className="h-4 w-4 text-orange-600" /><h2 className="font-bold text-stone-900">Refine the menu</h2></div>{hasFilters && <button type="button" onClick={() => onFilterChange({ search: '', category: 'all', dietaryType: 'all', priceRange: 'all' })} className="inline-flex items-center gap-1 text-sm font-bold text-orange-700 hover:text-orange-800"><X className="h-3.5 w-3.5" /> Clear</button>}</div>
      <div className="grid gap-3 md:grid-cols-4">
        <label className="relative md:col-span-1"><span className="sr-only">Search meals</span><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" /><input value={filters.search} onChange={(event) => handleChange('search', event.target.value)} placeholder="Search meals" className="w-full rounded-xl border py-2.5 pl-9 pr-3 text-sm text-stone-900" style={{ borderColor: 'var(--border-light)' }} /></label>
        <label><span className="sr-only">Category</span><select value={filters.category} onChange={(event) => handleChange('category', event.target.value)} className="w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-stone-700" style={{ borderColor: 'var(--border-light)' }}><option value="all">All categories</option><option value="Main Course">Main course</option><option value="Dal">Dal</option><option value="Rice">Rice</option><option value="Bread">Bread</option><option value="Dessert">Dessert</option></select></label>
        <label><span className="sr-only">Dietary type</span><select value={filters.dietaryType} onChange={(event) => handleChange('dietaryType', event.target.value)} className="w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-stone-700" style={{ borderColor: 'var(--border-light)' }}><option value="all">Any dietary type</option><option value="Veg">Vegetarian</option><option value="Non-Veg">Non-vegetarian</option></select></label>
        <label><span className="sr-only">Price range</span><select value={filters.priceRange} onChange={(event) => handleChange('priceRange', event.target.value)} className="w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-stone-700" style={{ borderColor: 'var(--border-light)' }}><option value="all">Any price</option><option value="low">Under ₹100</option><option value="medium">₹100 - ₹150</option><option value="high">Above ₹150</option></select></label>
      </div>
    </div>
  );
};

export default MealFilters;
