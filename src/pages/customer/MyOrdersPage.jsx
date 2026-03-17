import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OrderCard from '../../components/customer/OrderCard';
import Sidebar from '../../components/shared/Sidebar.jsx';
import orderService from '../../services/order.service';

const statusConfig = {
  PLACED: { color: 'var(--info)', label: 'Placed', bgColor: '#E6F4FF' },
  PENDING: { color: 'var(--warning)', label: 'Pending', bgColor: '#FFF9E6' },
  PREPARING: { color: 'var(--info)', label: 'Preparing', bgColor: '#E6F4FF' },
  DELIVERED: { color: 'var(--success)', label: 'Delivered', bgColor: '#E6F9F0' },
  CANCELLED: { color: 'var(--error)', label: 'Cancelled', bgColor: '#FFE6E6' }
};

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await orderService.getUserOrders();
        setOrders(response.orders || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return filterStatus === 'all' 
      ? orders 
      : orders.filter(order => order.status === filterStatus);
  }, [orders, filterStatus]);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <Sidebar />
      <main className="flex-1 p-4 pt-20 md:ml-64 md:p-8 md:pt-8">
        <h1 
          className="mb-6 text-2xl font-bold sm:text-3xl"
          style={{ color: '#111827' }}
        >
          My Orders
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5' }}>
            <p style={{ color: '#DC2626' }}>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#3B82F6' }}></div>
          </div>
        )}

        {/* Filter Tabs */}
        {!loading && (
          <div className="mb-8 flex gap-3 overflow-x-auto">
            {['all', 'PLACED', 'PENDING', 'PREPARING', 'DELIVERED', 'CANCELLED'].map(status => (
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
        )}

        {/* Orders List */}
        {!loading && filteredOrders.length === 0 ? (
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
        ) : !loading && (
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
