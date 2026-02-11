import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/shared/Breadcrumb';
import Card from '../../components/shared/Card';
import OrderItem from '../../components/customer/OrderItem';
import OrderTimeline from '../../components/customer/OrderTimeline';
import OrderSummary from '../../components/customer/OrderSummary';
import orderService from '../../services/order.service';

const statusConfig = {
  PLACED: { color: '#F59E0B', label: 'Placed' },
  PENDING: { color: '#F59E0B', label: 'Pending' },
  PREPARING: { color: '#3B82F6', label: 'Preparing' },
  OUT_FOR_DELIVERY: { color: '#3B82F6', label: 'Out for Delivery' },
  DELIVERED: { color: '#10B981', label: 'Delivered' },
  CANCELLED: { color: '#EF4444', label: 'Cancelled' }
};

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await orderService.getOrderById(id);
        setOrder(response.order);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#3B82F6' }}></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F9FAFB' }}>
        <Card className="p-8 text-center">
          <p className="text-xl mb-4" style={{ color: '#EF4444' }}>{error || 'Order not found'}</p>
          <a href="/orders" className="text-blue-600 hover:underline">← Back to Orders</a>
        </Card>
      </div>
    );
  }

  const orderStatus = order.status || 'PLACED';
  const statusStyle = statusConfig[orderStatus] || statusConfig.PLACED;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb backTo="/orders" backText="← Back to Orders" />

        {/* Order Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#111827' }}>
                Order Details
              </h1>
              <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
                Order ID: <span className="font-mono font-semibold">{order._id}</span>
              </p>
            </div>
            <span 
              className="px-6 py-3 rounded-full font-bold text-lg"
              style={{ 
                backgroundColor: statusStyle.color,
                color: '#FFFFFF'
              }}
            >
              {statusStyle.label}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
            <div>
              <p className="text-sm font-medium" style={{ color: '#6B7280' }}>Order Placed</p>
              <p className="font-semibold" style={{ color: '#111827' }}>
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            {order.deliveredAt && (
              <div>
                <p className="text-sm font-medium" style={{ color: '#6B7280' }}>Delivered At</p>
                <p className="font-semibold" style={{ color: '#111827' }}>
                  {new Date(order.deliveredAt).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#111827' }}>
                Order Items
              </h2>
              <div className="space-y-4">
                {order.orderItems && order.orderItems.map((item, index) => (
                  <OrderItem 
                    key={index} 
                    item={{
                      mealId: item.mealId,
                      quantity: item.quantity,
                      price: item.price
                    }} 
                    index={index} 
                    isLast={index === order.orderItems.length - 1} 
                  />
                ))}
              </div>
            </Card>

            {/* Order Timeline */}
            {order.statusHistory && (
              <OrderTimeline statusHistory={order.statusHistory} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div>
              <OrderSummary subtotal={order.totalAmount} />
            </div>

            {/* Delivery Address */}
            <Card className="p-6">
              <h3 className="font-bold mb-3" style={{ color: '#111827' }}>
                Delivery Address
              </h3>
              <p style={{ color: '#6B7280' }}>
                {order.deliveryAddress}
              </p>
              {order.deliveryPhone && (
                <p className="mt-2" style={{ color: '#6B7280' }}>
                  Phone: {order.deliveryPhone}
                </p>
              )}
            </Card>

            {/* Special Instructions */}
            {order.notes && (
              <Card className="p-6">
                <h3 className="font-bold mb-3" style={{ color: '#111827' }}>
                  Special Instructions
                </h3>
                <p style={{ color: '#6B7280' }}>
                  {order.notes}
                </p>
              </Card>
            )}

            {/* Actions */}
            <div className="space-y-3">
              {order.status === 'DELIVERED' && (
                <button
                  className="w-full py-3 rounded-lg font-semibold"
                  style={{ backgroundColor: '#3B82F6', color: '#FFFFFF' }}
                >
                  Reorder
                </button>
              )}
              <button
                className="w-full py-3 rounded-lg font-semibold"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#3B82F6',
                  border: '2px solid #3B82F6'
                }}
              >
                Need Help?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
