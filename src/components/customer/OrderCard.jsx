import { Link } from 'react-router-dom';
import { memo } from 'react';

const statusConfig = {
  PENDING: { color: 'var(--warning)', label: 'Pending', bgColor: '#FFF9E6' },
  PREPARING: { color: 'var(--info)', label: 'Preparing', bgColor: '#E6F4FF' },
  DELIVERED: { color: 'var(--success)', label: 'Delivered', bgColor: '#E6F9F0' },
  CANCELLED: { color: 'var(--error)', label: 'Cancelled', bgColor: '#FFE6E6' }
};

const OrderCard = memo(({ order }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Order Header */}
      <div 
        className="p-4 flex items-center justify-between"
        style={{ backgroundColor: statusConfig[order.status].bgColor }}
      >
        <div>
          <p className="text-sm" style={{ color: 'var(--gray-700)' }}>
            Order ID: <span className="font-mono font-semibold">{order._id}</span>
          </p>
          <p className="text-sm" style={{ color: 'var(--gray-700)' }}>
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <span 
          className="px-4 py-2 rounded-full font-semibold"
          style={{ 
            backgroundColor: statusConfig[order.status].color,
            color: 'var(--white)'
          }}
        >
          {statusConfig[order.status].label}
        </span>
      </div>

      {/* Order Details */}
      <div className="p-6">
        {/* Meals */}
        <div className="mb-4">
          <h3 className="font-bold mb-3" style={{ color: 'var(--gray-900)' }}>Items</h3>
          <div className="space-y-2">
            {order.meals.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <span style={{ color: 'var(--gray-900)' }}>{item.mealId.name}</span>
                  <span className="ml-2" style={{ color: 'var(--gray-500)' }}>
                    x{item.quantity}
                  </span>
                </div>
                <span className="font-semibold" style={{ color: 'var(--gray-900)' }}>
                  ₹{item.mealId.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="mb-4 pb-4 border-b" style={{ borderColor: 'var(--gray-100)' }}>
          <h4 className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
            Delivery Address
          </h4>
          <p style={{ color: 'var(--gray-700)' }}>{order.deliveryAddress}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold" style={{ color: 'var(--primary-500)' }}>
              ₹{order.totalAmount}
            </span>
            <span className="text-sm ml-2" style={{ color: 'var(--gray-700)' }}>
              Total Amount
            </span>
          </div>
          <Link
            to={`/orders/${order._id}`}
            className="px-6 py-2 rounded-lg font-semibold"
            style={{
              backgroundColor: 'var(--white)',
              color: 'var(--primary-500)',
              border: '2px solid var(--primary-500)'
            }}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
});

OrderCard.displayName = 'OrderCard';

export default OrderCard;
