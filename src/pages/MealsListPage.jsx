import { useState, useMemo } from 'react';
import MealCard from '../components/meals/MealCard';
import MealFilters from '../components/meals/MealFilters';
import PageHeader from '../components/common/PageHeader';

// Mock data for meals
const mockMeals = [
  {
    _id: '1',
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice cooked with tender chicken pieces and authentic spices',
    price: 150,
    category: 'Main Course',
    dietaryType: 'Non-Veg',
    isAvailable: true,
    messId: { name: 'Delhi Mess', _id: 'm1' },
    averageRating: 4.5,
    totalReviews: 23
  },
  {
    _id: '2',
    name: 'Paneer Butter Masala',
    description: 'Rich and creamy paneer curry with butter and tomato gravy',
    price: 120,
    category: 'Main Course',
    dietaryType: 'Veg',
    isAvailable: true,
    messId: { name: 'Mumbai Mess', _id: 'm2' },
    averageRating: 4.3,
    totalReviews: 18
  },
  {
    _id: '3',
    name: 'Dal Tadka',
    description: 'Yellow lentils tempered with aromatic spices and herbs',
    price: 80,
    category: 'Dal',
    dietaryType: 'Veg',
    isAvailable: true,
    messId: { name: 'Delhi Mess', _id: 'm1' },
    averageRating: 4.2,
    totalReviews: 15
  },
  {
    _id: '4',
    name: 'Fish Curry',
    description: 'Fresh fish cooked in traditional coastal style curry',
    price: 180,
    category: 'Main Course',
    dietaryType: 'Non-Veg',
    isAvailable: true,
    messId: { name: 'Coastal Kitchen', _id: 'm3' },
    averageRating: 4.7,
    totalReviews: 31
  },
  {
    _id: '5',
    name: 'Veg Pulao',
    description: 'Fragrant rice cooked with mixed vegetables and mild spices',
    price: 90,
    category: 'Rice',
    dietaryType: 'Veg',
    isAvailable: true,
    messId: { name: 'Mumbai Mess', _id: 'm2' },
    averageRating: 4.0,
    totalReviews: 12
  },
  {
    _id: '6',
    name: 'Mutton Rogan Josh',
    description: 'Tender mutton cooked in aromatic Kashmiri style gravy',
    price: 220,
    category: 'Main Course',
    dietaryType: 'Non-Veg',
    isAvailable: false,
    messId: { name: 'Delhi Mess', _id: 'm1' },
    averageRating: 4.8,
    totalReviews: 27
  }
];

const MealsListPage = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    dietaryType: 'all',
    priceRange: 'all'
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredMeals = useMemo(() => {
    return mockMeals.filter(meal => {
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
  }, [filters]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gray-100)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader 
          title="Our Meals"
          subtitle="Discover delicious meals from various mess kitchens"
        />

        {/* Filters */}
        <MealFilters filters={filters} onFilterChange={handleFilterChange} />

        {/* Meals Grid */}
        <div className="mt-8">
          {filteredMeals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl" style={{ color: 'var(--gray-700)' }}>
                No meals found matching your filters
              </p>
            </div>
          ) : (
            <>
              <p className="mb-4" style={{ color: 'var(--gray-700)' }}>
                Showing {filteredMeals.length} meal{filteredMeals.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMeals.map(meal => (
                  <MealCard key={meal._id} meal={meal} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealsListPage;
