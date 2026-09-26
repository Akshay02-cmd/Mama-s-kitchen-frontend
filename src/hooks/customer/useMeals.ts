import { useState, useEffect, useCallback } from 'react';
import { getAllMeals } from '../../services/meal.service';

/**
 * useMeals Hook
 * Manages meals data fetching and filtering
 * 
 * @returns {Object} Meals data, loading state, filters, and handlers
 */
export const useMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    cuisine: '',
    dietaryType: '',
    spiceLevel: '',
    priceRange: [0, 500],
    sortBy: 'popular'
  });
  const [filteredMeals, setFilteredMeals] = useState([]);

  // Fetch meals
  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllMeals();
      setMeals(data);
      setFilteredMeals(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch meals');
      console.error('Error fetching meals:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...meals];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(meal => 
        meal.name.toLowerCase().includes(searchLower) ||
        meal.description?.toLowerCase().includes(searchLower)
      );
    }

    // Cuisine filter
    if (filters.cuisine) {
      result = result.filter(meal => meal.cuisine === filters.cuisine);
    }

    // Dietary type filter
    if (filters.dietaryType) {
      result = result.filter(meal => meal.dietaryType === filters.dietaryType);
    }

    // Spice level filter
    if (filters.spiceLevel) {
      result = result.filter(meal => meal.spiceLevel === filters.spiceLevel);
    }

    // Price range filter
    result = result.filter(meal => 
      meal.price >= filters.priceRange[0] && 
      meal.price <= filters.priceRange[1]
    );

    // Sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popular':
      default:
        result.sort((a, b) => (b.ordersCount || 0) - (a.ordersCount || 0));
        break;
    }

    setFilteredMeals(result);
  }, [meals, filters]);

  // Update filter
  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      cuisine: '',
      dietaryType: '',
      spiceLevel: '',
      priceRange: [0, 500],
      sortBy: 'popular'
    });
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  return {
    meals: filteredMeals,
    allMeals: meals,
    loading,
    error,
    filters,
    updateFilter,
    resetFilters,
    refetch: fetchMeals
  };
};
