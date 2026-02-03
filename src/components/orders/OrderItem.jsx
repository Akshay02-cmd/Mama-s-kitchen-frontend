const OrderItem = ({ item, index, isLast }) => {
  return (
    <div 
      className="flex gap-4 pb-4"
      style={{ borderBottom: !isLast ? '1px solid var(--gray-100)' : 'none' }}
    >
      <img
        src={item.mealId.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop'}
        alt={item.mealId.name}
        className="w-20 h-20 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h3 className="font-bold mb-1" style={{ color: 'var(--gray-900)' }}>
          {item.mealId.name}
        </h3>
        <p className="text-sm mb-2" style={{ color: 'var(--gray-700)' }}>
          by {item.mealId.messId.name}
        </p>
        <div className="flex items-center gap-4">
          <span style={{ color: 'var(--gray-700)' }}>
            Quantity: <span className="font-semibold">{item.quantity}</span>
          </span>
          <span className="font-bold" style={{ color: 'var(--primary-500)' }}>
            ₹{item.mealId.price} each
          </span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold" style={{ color: 'var(--primary-500)' }}>
          ₹{item.mealId.price * item.quantity}
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
