import { Star, Clock, Flame, ShoppingCart } from "lucide-react";

const MealCard = ({ meal }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition group">
      <div className="relative overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
          <span className="font-semibold text-sm">{meal.rating}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {meal.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {meal.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{meal.prepTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4" />
            <span>{meal.calories}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-600">
            ${meal.price.toFixed(2)}
          </span>
          <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition inline-flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
