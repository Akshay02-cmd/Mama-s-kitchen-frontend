import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import OrderCard from '../../components/customer/OrderCard';
import Sidebar from '../../components/shared/Sidebar.jsx';

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
    <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <Sidebar />
      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <h1 
          className="text-3xl font-bold mb-6"
          style={{ color: '#111827' }}
        >
          My Orders
        </h1>

        {/* Filter Tabs */}
        <div className="mb-8 flex gap-3 overflow-x-auto">
          {['all', 'PENDING', 'PREPARING', 'DELIVERED', 'CANCELLED'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className="px-6 py-2 rounded-lg font-medium whitespace-nowrap transition-all"
              style={{
                backgroundColor: filterStatus === status 
                  ? '#3B82F6'
                  : '#FFFFFF',
                color: filterStatus === status 
                  ? '#FFFFFF' 
                  : '#6B7280',
                border: '1px solid #E5E7EB'
              }}
            >
              {status === 'all' ? 'All Orders' : statusConfig[status].label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 rounded-lg"
            style={{ 
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB'
            }}>
            <p className="text-xl mb-4" style={{ color: '#111827' }}>
              No orders found
            </p>
            <Link
              to="/home"
              className="inline-block px-6 py-3 rounded-lg font-medium transition-all"
              style={{ 
                backgroundColor: '#3B82F6',
                color: '#FFFFFF'
              }}
            >
              Browse Meals
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map(order => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyOrdersPage;
