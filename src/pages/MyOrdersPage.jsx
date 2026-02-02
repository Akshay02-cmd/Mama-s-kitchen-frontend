import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import OrderCard from '../components/orders/OrderCard';

// Mock orders data
const mockOrders = [
  {
    _id: 'ord1',
    meals: [
      {
        mealId: { _id: 'm1', name: 'Chicken Biryani', price: 150 },
        quantity: 2
      },
      {
        mealId: { _id: 'm2', name: 'Dal Tadka', price: 80 },
        quantity: 1
      }
    ],
    totalAmount: 380,
    status: 'DELIVERED',
    deliveryAddress: 'Hostel Block A, Room 201, Delhi University',
    createdAt: '2026-01-28T18:30:00Z',
    deliveredAt: '2026-01-28T19:45:00Z'
  },
  {
    _id: 'ord2',
    meals: [
      {
        mealId: { _id: 'm3', name: 'Paneer Butter Masala', price: 120 },
        quantity: 1
      }
    ],
    totalAmount: 120,
    status: 'PREPARING',
    deliveryAddress: 'Hostel Block A, Room 201, Delhi University',
    createdAt: '2026-02-02T12:15:00Z',
    estimatedDeliveryTime: '2026-02-02T13:30:00Z'
  },
  {
    _id: 'ord3',
    meals: [
      {
        mealId: { _id: 'm4', name: 'Fish Curry', price: 180 },
        quantity: 1
      },
      {
        mealId: { _id: 'm5', name: 'Veg Pulao', price: 90 },
        quantity: 2
      }
    ],
    totalAmount: 360,
    status: 'PENDING',
    deliveryAddress: 'Hostel Block A, Room 201, Delhi University',
    createdAt: '2026-02-02T11:00:00Z'
  },
  {
    _id: 'ord4',
    meals: [
      {
        mealId: { _id: 'm1', name: 'Chicken Biryani', price: 150 },
        quantity: 1
      }
    ],
    totalAmount: 150,
    status: 'CANCELLED',
    deliveryAddress: 'Hostel Block A, Room 201, Delhi University',
    createdAt: '2026-01-25T14:20:00Z',
    cancelledAt: '2026-01-25T14:35:00Z'
  }
];

const statusConfig = {
  PENDING: { color: 'var(--warning)', label: 'Pending', bgColor: '#FFF9E6' },
  PREPARING: { color: 'var(--info)', label: 'Preparing', bgColor: '#E6F4FF' },
  DELIVERED: { color: 'var(--success)', label: 'Delivered', bgColor: '#E6F9F0' },
  CANCELLED: { color: 'var(--error)', label: 'Cancelled', bgColor: '#FFE6E6' }
};

const MyOrdersPage = () => {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = useMemo(() => {
    return filterStatus === 'all' 
      ? mockOrders 
      : mockOrders.filter(order => order.status === filterStatus);
  }, [filterStatus]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gray-100)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader 
          title="My Orders" 
          subtitle="Track and manage your orders" 
        />

        {/* Filter Tabs */}
        <div className="mb-6 bg-white rounded-lg shadow p-2 flex gap-2 overflow-x-auto">
          {['all', 'PENDING', 'PREPARING', 'DELIVERED', 'CANCELLED'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className="px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors"
              style={{
                backgroundColor: filterStatus === status ? 'var(--primary-500)' : 'transparent',
                color: filterStatus === status ? 'var(--white)' : 'var(--gray-700)'
              }}
            >
              {status === 'all' ? 'All Orders' : statusConfig[status].label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-xl mb-4" style={{ color: 'var(--gray-700)' }}>
              No orders found
            </p>
            <Link
              to="/meals"
              className="inline-block px-6 py-3 rounded-lg font-semibold"
              style={{ backgroundColor: 'var(--primary-500)', color: 'var(--white)' }}
            >
              Browse Meals
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
