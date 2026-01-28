import { Star, Clock, Flame, ShoppingCart, ChefHat } from "lucide-react";

const MealCard = ({ meal }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-slate-100 hover:border-amber-200">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg z-20">
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span className="font-bold text-sm text-slate-900">{meal.rating}</span>
        </div>
        <div className="absolute top-4 left-4 bg-amber-500/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg z-20">
          <ChefHat className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
          {meal.name}
        </h3>
        <p className="text-slate-600 text-sm mb-5 line-clamp-2 leading-relaxed">
          {meal.description}
        </p>

        <div className="flex items-center gap-5 text-sm text-slate-500 mb-5 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <Clock className="w-4 h-4 text-slate-600" />
            </div>
            <span className="font-medium">{meal.prepTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
            <span className="font-medium">{meal.calories}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 mb-1">Starting from</p>
            <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
              ${meal.price.toFixed(2)}
            </span>
          </div>
          <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 inline-flex items-center gap-2 group-hover:scale-105 transform">
            <ShoppingCart className="w-4 h-4" />
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
