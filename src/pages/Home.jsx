import { useState } from "react";
import { MealsHeader, MealFilters, MealCard } from "../components/meals";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Meals" },
    { id: "breakfast", name: "Breakfast" },
    { id: "lunch", name: "Lunch" },
    { id: "dinner", name: "Dinner" },
    { id: "dessert", name: "Desserts" },
  ];

  const meals = [
    {
      id: 1,
      name: "Classic Lasagna",
      category: "dinner",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop",
      rating: 4.9,
      prepTime: "35 min",
      calories: "450 cal",
      description: "Layers of pasta, rich meat sauce, and creamy béchamel",
    },
    {
      id: 2,
      name: "Chicken Curry",
      category: "lunch",
      price: 10.99,
      image:
        "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
      rating: 4.8,
      prepTime: "30 min",
      calories: "380 cal",
      description: "Tender chicken in aromatic curry sauce with basmati rice",
    },
    {
      id: 3,
      name: "Beef Stew",
      category: "dinner",
      price: 13.99,
      image:
        "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?w=400&h=300&fit=crop",
      rating: 4.7,
      prepTime: "40 min",
      calories: "520 cal",
      description: "Slow-cooked beef with vegetables in rich gravy",
    },
    {
      id: 4,
      name: "Pancake Stack",
      category: "breakfast",
      price: 8.99,
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
      rating: 4.9,
      prepTime: "15 min",
      calories: "320 cal",
      description: "Fluffy pancakes with maple syrup and fresh berries",
    },
    {
      id: 5,
      name: "Caesar Salad",
      category: "lunch",
      price: 7.99,
      image:
        "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
      rating: 4.6,
      prepTime: "10 min",
      calories: "280 cal",
      description: "Crisp romaine with parmesan, croutons, and Caesar dressing",
    },
    {
      id: 6,
      name: "Chocolate Cake",
      category: "dessert",
      price: 6.99,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      rating: 5.0,
      prepTime: "5 min",
      calories: "420 cal",
      description: "Rich chocolate cake with ganache frosting",
    },
    {
      id: 7,
      name: "Grilled Salmon",
      category: "dinner",
      price: 15.99,
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
      rating: 4.8,
      prepTime: "25 min",
      calories: "350 cal",
      description: "Fresh salmon with lemon butter and seasonal vegetables",
    },
    {
      id: 8,
      name: "French Toast",
      category: "breakfast",
      price: 9.49,
      image:
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop",
      rating: 4.7,
      prepTime: "20 min",
      calories: "380 cal",
      description: "Golden French toast with powdered sugar and fresh fruit",
    },
  ];

  const filteredMeals = meals.filter((meal) => {
    const matchesCategory =
      selectedCategory === "all" || meal.category === selectedCategory;
    const matchesSearch =
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <MealsHeader />

      <MealFilters
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Meals Grid */}
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
              <div className="mb-8">
                <p className="text-slate-600">
                  Showing <span className="font-bold text-amber-600">{filteredMeals.length}</span> delicious meals
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredMeals.map((meal) => (
                  <MealCard key={meal.id} meal={meal} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;