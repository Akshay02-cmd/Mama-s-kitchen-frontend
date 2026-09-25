const OrderSummary = ({ subtotal, deliveryFee = 0 }) => {
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
        Order Summary
      </h2>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span style={{ color: 'var(--gray-700)' }}>Subtotal</span>
          <span className="font-semibold" style={{ color: 'var(--gray-900)' }}>
            ₹{subtotal}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: 'var(--gray-700)' }}>Delivery Fee</span>
          <span className="font-semibold" style={{ color: deliveryFee === 0 ? 'var(--success)' : 'var(--gray-900)' }}>
            {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
          </span>
        </div>
        <div 
          className="flex justify-between pt-3"
          style={{ borderTop: '2px solid var(--gray-100)' }}
        >
          <span className="text-lg font-bold" style={{ color: 'var(--gray-900)' }}>
            Total
          </span>
          <span className="text-2xl font-bold" style={{ color: 'var(--primary-500)' }}>
            ₹{total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
