import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MessSidebar from '../../components/shared/MessSidebar';
import Card from '../../components/shared/Card';
import orderService from '../../services/order.service';
import { useNotification } from '../../hooks/shared';

const statusActions = {
  PLACED: 'PREPARING',
  PENDING: 'PREPARING',
  PREPARING: 'DELIVERED',
};

const MessOrderDetailPage = () => {
  const navigate = useNavigate();
  const { messId, orderId } = useParams();
  const { showSuccess, showError } = useNotification();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await orderService.getOrderById(orderId);
        setOrder(response.order);
      } catch (err) {
        console.error('Error fetching owner order detail:', err);
        setError('Failed to load order details.');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const handleStatusUpdate = async () => {
    const nextStatus = statusActions[order?.status];
    if (!nextStatus) return;

    try {
      setUpdating(true);
      const response = await orderService.updateOrderStatus(order._id, { status: nextStatus });
      setOrder(response.order);
      showSuccess(`Order marked as ${nextStatus}.`);
    } catch (err) {
      console.error('Error updating owner order detail:', err);
      showError(err?.message || 'Failed to update order status.');
    } finally {
      setUpdating(false);
    }
  };

  const backPath = messId ? `/mess/${messId}/orders` : '/mess/orders';

  if (loading) {
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        <MessSidebar />
        <div className="flex-1 flex items-center justify-center p-4 pt-20 md:ml-64 md:p-8 md:pt-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#8B5CF6' }}></div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        <MessSidebar />
        <div className="flex-1 flex items-center justify-center p-4 pt-20 md:ml-64 md:p-8 md:pt-8">
          <Card className="p-8 text-center max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#111827' }}>
              {error || 'Order not found'}
            </h2>
            <button
              onClick={() => navigate(backPath)}
              className="px-5 py-3 rounded-lg font-semibold"
              style={{ backgroundColor: '#8B5CF6', color: '#FFFFFF' }}
            >
              Back to Orders
            </button>
          </Card>
        </div>
      </div>
    );
  }

  const nextStatus = statusActions[order.status];

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <MessSidebar />
      <div className="flex-1 p-4 pt-20 md:ml-64 md:p-8 md:pt-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <button
                onClick={() => navigate(backPath)}
                className="mb-3 text-sm font-medium"
                style={{ color: '#6B7280' }}
              >
                ← Back to Orders
              </button>
              <h1 className="text-2xl font-bold sm:text-3xl" style={{ color: '#111827' }}>
                Order #{order._id.slice(-6)}
              </h1>
              <p style={{ color: '#6B7280' }}>
                Created {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            {nextStatus && (
              <button
                onClick={handleStatusUpdate}
                disabled={updating}
                className="w-full rounded-lg px-5 py-3 font-semibold disabled:opacity-50 sm:w-auto"
                style={{ backgroundColor: '#8B5CF6', color: '#FFFFFF' }}
              >
                {updating ? 'Updating...' : `Mark ${nextStatus}`}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4" style={{ color: '#111827' }}>
                  Customer and Delivery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#6B7280' }}>Customer</p>
                    <p style={{ color: '#111827' }}>{order.userId?.name || 'Unknown'}</p>
                    <p style={{ color: '#6B7280' }}>{order.userId?.email || 'No email'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#6B7280' }}>Delivery Phone</p>
                    <p style={{ color: '#111827' }}>{order.deliveryPhone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium" style={{ color: '#6B7280' }}>Delivery Address</p>
                    <p style={{ color: '#111827' }}>{order.deliveryAddress}</p>
                  </div>
                  {order.notes && (
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium" style={{ color: '#6B7280' }}>Notes</p>
                      <p style={{ color: '#111827' }}>{order.notes}</p>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4" style={{ color: '#111827' }}>
                  Items
                </h2>
                <div className="space-y-4">
                  {order.orderItems.map((item, index) => (
                    <div key={`${item.mealId?._id || index}-${index}`} className="pb-4 border-b last:border-b-0" style={{ borderColor: '#E5E7EB' }}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold" style={{ color: '#111827' }}>
                            {item.mealId?.name || 'Unknown Meal'}
                          </h3>
                          <p style={{ color: '#6B7280' }}>Quantity: {item.quantity}</p>
                          {(item.selectedExtras || []).length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm font-medium" style={{ color: '#6B7280' }}>Selected Extras</p>
                              <ul className="mt-1 space-y-1">
                                {item.selectedExtras.map((extra, extraIndex) => (
                                  <li key={`${extra.name}-${extraIndex}`} className="text-sm" style={{ color: '#374151' }}>
                                    + {extra.name} (₹{extra.price})
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <p className="font-semibold" style={{ color: '#111827' }}>
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4" style={{ color: '#111827' }}>
                  Summary
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span style={{ color: '#6B7280' }}>Status</span>
                    <span className="font-semibold" style={{ color: '#111827' }}>{order.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#6B7280' }}>Payment Method</span>
                    <span className="font-semibold" style={{ color: '#111827' }}>{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#6B7280' }}>Payment Status</span>
                    <span className="font-semibold" style={{ color: '#111827' }}>{order.paymentStatus}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t" style={{ borderColor: '#E5E7EB' }}>
                    <span className="font-bold" style={{ color: '#111827' }}>Total</span>
                    <span className="font-bold" style={{ color: '#111827' }}>₹{order.totalAmount}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessOrderDetailPage;