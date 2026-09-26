import { memo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Plus, Star } from 'lucide-react';

const mealTypeLabels = { breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', snack: 'Snack' };

const MealCard = memo(({ meal, showAddToCart = false, onCardClick }) => {
  const navigate = useNavigate();
  const typeKey = meal.mealType?.toLowerCase() || meal.category?.toLowerCase() || 'lunch';
  const available = meal.is_Available !== false && meal.isAvailable !== false;
  const availableExtras = (meal.extras || []).filter((extra) => extra.is_Available !== false);

  const handleOrderNow = (event) => {
    event.stopPropagation();
    navigate('/checkout', { state: { meal, quantity: 1 } });
  };

  return (
    <article className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ borderColor: 'var(--border-light)' }} onClick={() => onCardClick?.(meal)}>
      <div className="relative aspect-4/3 overflow-hidden bg-orange-100">
        <img src={meal.image || `https://placehold.co/800x600/ea580c/ffffff?text=${encodeURIComponent(meal.name)}`} alt={meal.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(event) => { event.currentTarget.src = 'https://placehold.co/800x600/fed7aa/9a3412?text=Mumma%27s+Kitchen'; }} />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-orange-700 backdrop-blur">{mealTypeLabels[typeKey] || "Today's special"}</span>
        {!available && <span className="absolute inset-x-3 bottom-3 rounded-lg bg-stone-950/75 px-3 py-2 text-center text-xs font-bold text-white">Currently unavailable</span>}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3"><h3 className="font-display text-xl leading-tight text-stone-900">{meal.name}</h3><div className="flex shrink-0 items-center gap-1 text-sm font-bold text-stone-700"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{meal.averageRating || '4.5'}</div></div>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-stone-500">{meal.description || 'A comforting home-style dish prepared fresh in our kitchen.'}</p>
        {availableExtras.length > 0 && <p className="mt-3 text-xs font-semibold text-orange-700"><Plus className="mr-1 inline h-3 w-3" />{availableExtras.length} optional extra{availableExtras.length > 1 ? 's' : ''}</p>}
        <div className="mt-4 flex items-center justify-between border-t pt-4" style={{ borderColor: 'var(--border-light)' }}><span className="text-xl font-bold text-stone-900">₹{meal.price}</span>{showAddToCart && <button type="button" disabled={!available} onClick={handleOrderNow} className="rounded-xl bg-orange-600 px-3.5 py-2 text-sm font-bold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-stone-300">{available ? 'Order' : 'Sold out'}</button>}</div>
      </div>
    </article>
  );
});

MealCard.displayName = 'MealCard';
MealCard.propTypes = { meal: PropTypes.object.isRequired, showAddToCart: PropTypes.bool, onCardClick: PropTypes.func };

export default MealCard;
