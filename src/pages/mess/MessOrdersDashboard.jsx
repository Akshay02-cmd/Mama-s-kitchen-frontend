import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useAuth } from '../../hooks/shared';
import MessSidebar from '../../components/shared/MessSidebar';

const MessOrdersDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('new');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch orders from API based on mess
    // For now, using mock data
    setTimeout(() => {
      setOrders([
        {
          _id: '1',
          orderNumber: 'ORD-1001',
          customer: { name: 'John Doe', phone: '9876543210' },
          items: [
            { meal: { name: 'Dal Tadka', price: 80 }, quantity: 2 },
            { meal: { name: 'Roti (4 pcs)', price: 40 }, quantity: 1 },
          ],
          totalAmount: 200,
          status: 'pending',
          orderTime: new Date(Date.now() - 10 * 60000),
        },
        {
          _id: '2',
          orderNumber: 'ORD-1002',
          customer: { name: 'Jane Smith', phone: '9123456789' },
          items: [
            { meal: { name: 'Paneer Butter Masala', price: 120 }, quantity: 1 },
            { meal: { name: 'Jeera Rice', price: 60 }, quantity: 1 },
          ],
          totalAmount: 180,
          status: 'preparing',
          orderTime: new Date(Date.now() - 30 * 60000),
        },
        {
          _id: '3',
          orderNumber: 'ORD-1003',
          customer: { name: 'Mike Johnson', phone: '9988776655' },
          items: [
            { meal: { name: 'Chicken Biryani', price: 150 }, quantity: 2 },
          ],
          totalAmount: 300,
          status: 'delivered',
          orderTime: new Date(Date.now() - 120 * 60000),
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'new') return order.status === 'pending';
    if (activeTab === 'preparing') return order.status === 'preparing';
    if (activeTab === 'delivered') return order.status === 'delivered';
    return true;
  });

  const handleStatusUpdate = (orderId, newStatus) => {
    // TODO: API call to update order status
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const formatTime = (date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return { bg: '#FEF3C7', text: '#92400E', border: '#FCD34D' };
      case 'preparing':
        return { bg: '#DBEAFE', text: '#1E40AF', border: '#93C5FD' };
      case 'delivered':
        return { bg: '#D1FAE5', text: '#065F46', border: '#6EE7B7' };
      default:
        return { bg: '#F3F4F6', text: '#374151', border: '#D1D5DB' };
    }
  };

  const OrderCard = ({ order }) => {
    const statusColor = getStatusColor(order.status);

    return (
      <div
        className="p-6 rounded-xl shadow-sm hover:shadow-md transition-all mb-4"
        style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
        {/* Order Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg mb-1" style={{ color: '#111827' }}>
              {order.orderNumber}
            </h3>
            <p className="text-sm mb-1" style={{ color: '#6B7280' }}>
              {order.customer.name} • {order.customer.phone}
            </p>
            <p className="text-xs" style={{ color: '#9CA3AF' }}>
              <Clock className="w-3 h-3 inline mr-1" />
              {formatTime(order.orderTime)}
            </p>
          </div>
          <span
            className="px-3 py-1 rounded-full text-xs font-medium capitalize"
            style={{
              backgroundColor: statusColor.bg,
              color: statusColor.text,
              border: `1px solid ${statusColor.border}`,
            }}>
            {order.status}
          </span>
        </div>

        {/* Order Items */}
        <div className="border-t border-b py-3 mb-4" style={{ borderColor: '#E5E7EB' }}>
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between py-1">
              <span style={{ color: '#6B7280' }}>
                {item.quantity}x {item.meal.name}
              </span>
              <span className="font-medium" style={{ color: '#111827' }}>
                ₹{item.meal.price * item.quantity}
              </span>
            </div>
          ))}
          <div className="flex justify-between pt-2 mt-2 border-t" style={{ borderColor: '#E5E7EB' }}>
            <span className="font-bold" style={{ color: '#111827' }}>Total</span>
            <span className="font-bold text-lg" style={{ color: '#8B5CF6' }}>
              ₹{order.totalAmount}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {order.status === 'pending' && (
            <button
              onClick={() => handleStatusUpdate(order._id, 'preparing')}
              className="flex-1 py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: '#8B5CF6', color: '#FFFFFF' }}>
              <CheckCircle className="w-4 h-4" />
              Accept Order
            </button>
          )}
          {order.status === 'preparing' && (
            <button
              onClick={() => handleStatusUpdate(order._id, 'delivered')}
              className="flex-1 py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: '#10B981', color: '#FFFFFF' }}>
              <CheckCircle className="w-4 h-4" />
              Mark Delivered
            </button>
          )}
          <button
            onClick={() => navigate(`/mess/orders/${order._id}`)}
            className="py-2 px-4 rounded-lg font-medium transition-all flex items-center gap-2"
            style={{ backgroundColor: '#F3F4F6', color: '#6B7280', border: '1px solid #E5E7EB' }}>
            <Eye className="w-4 h-4" />
            View
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        <MessSidebar />
        <div className="flex-1 md:ml-64 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#8B5CF6' }}></div>
            <p style={{ color: '#6B7280' }}>Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <MessSidebar />
      <div className="flex-1 md:ml-64 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#111827' }}>
            Orders Dashboard
          </h1>
          <p style={{ color: '#6B7280' }}>
            Manage and track all your orders in real-time
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ color: '#6B7280' }}>New Orders</span>
              <Package className="w-5 h-5" style={{ color: '#F59E0B' }} />
            </div>
            <p className="text-3xl font-bold" style={{ color: '#111827' }}>
              {orders.filter((o) => o.status === 'pending').length}
            </p>
          </div>
          <div className="p-6 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ color: '#6B7280' }}>Preparing</span>
              <Clock className="w-5 h-5" style={{ color: '#3B82F6' }} />
            </div>
            <p className="text-3xl font-bold" style={{ color: '#111827' }}>
              {orders.filter((o) => o.status === 'preparing').length}
            </p>
          </div>
          <div className="p-6 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ color: '#6B7280' }}>Delivered Today</span>
              <CheckCircle className="w-5 h-5" style={{ color: '#10B981' }} />
            </div>
            <p className="text-3xl font-bold" style={{ color: '#111827' }}>
              {orders.filter((o) => o.status === 'delivered').length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b" style={{ borderColor: '#E5E7EB' }}>
          {[
            { key: 'new', label: 'New Orders', count: orders.filter((o) => o.status === 'pending').length },
            { key: 'preparing', label: 'Preparing', count: orders.filter((o) => o.status === 'preparing').length },
            { key: 'delivered', label: 'Delivered', count: orders.filter((o) => o.status === 'delivered').length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="px-6 py-3 font-medium transition-all relative"
              style={{
                color: activeTab === tab.key ? '#8B5CF6' : '#6B7280',
                borderBottom: activeTab === tab.key ? '2px solid #8B5CF6' : '2px solid transparent',
              }}>
              {tab.label}
              {tab.count > 0 && (
                <span
                  className="ml-2 px-2 py-0.5 rounded-full text-xs"
                  style={{
                    backgroundColor: activeTab === tab.key ? '#8B5CF6' : '#E5E7EB',
                    color: activeTab === tab.key ? '#FFFFFF' : '#6B7280',
                  }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-xl" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
            <Package className="w-16 h-16 mx-auto mb-4" style={{ color: '#9CA3AF' }} />
            <h3 className="text-xl font-bold mb-2" style={{ color: '#111827' }}>
              No {activeTab} orders
            </h3>
            <p style={{ color: '#6B7280' }}>
              {activeTab === 'new' && 'New orders will appear here'}
              {activeTab === 'preparing' && 'Orders being prepared will show here'}
              {activeTab === 'delivered' && 'Delivered orders will be listed here'}
            </p>
          </div>
        ) : (
          <div>
            {filteredOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default MessOrdersDashboard;
