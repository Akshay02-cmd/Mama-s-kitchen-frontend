import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/shared/Breadcrumb';
import Card from '../../components/shared/Card';
import OrderItem from '../../components/customer/OrderItem';
import OrderTimeline from '../../components/customer/OrderTimeline';
import OrderSummary from '../../components/customer/OrderSummary';

// Mock order detail
const mockOrder = {
  _id: 'ord1',
  meals: [
    {
      mealId: { 
        _id: 'm1', 
        name: 'Chicken Biryani', 
        price: 150,
        messId: { name: 'Delhi Mess', _id: 'mess1' }
      },
      quantity: 2
    },
    {
      mealId: { 
        _id: 'm2', 
        name: 'Dal Tadka', 
        price: 80,
        messId: { name: 'Delhi Mess', _id: 'mess1' }
      },
      quantity: 1
    }
  ],
  totalAmount: 380,
  status: 'DELIVERED',
  deliveryAddress: 'Hostel Block A, Room 201, Delhi University',
  specialInstructions: 'Please deliver before 8 PM. Extra spicy biryani.',
  createdAt: '2026-01-28T18:30:00Z',
  deliveredAt: '2026-01-28T19:45:00Z',
  statusHistory: [
    { status: 'PENDING', timestamp: '2026-01-28T18:30:00Z', message: 'Order placed successfully' },
    { status: 'PREPARING', timestamp: '2026-01-28T18:45:00Z', message: 'Kitchen has started preparing your order' },
    { status: 'OUT_FOR_DELIVERY', timestamp: '2026-01-28T19:20:00Z', message: 'Order is out for delivery' },
    { status: 'DELIVERED', timestamp: '2026-01-28T19:45:00Z', message: 'Order delivered successfully' }
  ]
};

const statusConfig = {
  PENDING: { color: 'var(--warning)', label: 'Pending' },
  PREPARING: { color: 'var(--info)', label: 'Preparing' },
  OUT_FOR_DELIVERY: { color: 'var(--info)', label: 'Out for Delivery' },
  DELIVERED: { color: 'var(--success)', label: 'Delivered' },
  CANCELLED: { color: 'var(--error)', label: 'Cancelled' }
};

const OrderDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gray-100)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb backTo="/orders" backText="← Back to Orders" />

        {/* Order Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--gray-900)' }}>
                Order Details
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--gray-700)' }}>
                Order ID: <span className="font-mono font-semibold">{mockOrder._id}</span>
              </p>
            </div>
            <span 
              className="px-6 py-3 rounded-full font-bold text-lg"
              style={{ 
                backgroundColor: statusConfig[mockOrder.status].color,
                color: 'var(--white)'
              }}
            >
              {statusConfig[mockOrder.status].label}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t" style={{ borderColor: 'var(--gray-100)' }}>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--gray-700)' }}>Order Placed</p>
              <p className="font-semibold" style={{ color: 'var(--gray-900)' }}>
                {new Date(mockOrder.createdAt).toLocaleString()}
              </p>
            </div>
            {mockOrder.deliveredAt && (
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--gray-700)' }}>Delivered At</p>
                <p className="font-semibold" style={{ color: 'var(--gray-900)' }}>
                  {new Date(mockOrder.deliveredAt).toLocaleString()}
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
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                Order Items
              </h2>
              <div className="space-y-4">
                {mockOrder.meals.map((item, index) => (
                  <OrderItem 
                    key={index} 
                    item={item} 
                    index={index} 
                    isLast={index === mockOrder.meals.length - 1} 
                  />
                ))}
              </div>
            </Card>

            {/* Order Timeline */}
            <OrderTimeline statusHistory={mockOrder.statusHistory} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div>
              <OrderSummary subtotal={mockOrder.totalAmount} />
            </div>

            {/* Delivery Address */}
            <Card className="p-6">
              <h3 className="font-bold mb-3" style={{ color: 'var(--gray-900)' }}>
                Delivery Address
              </h3>
              <p style={{ color: 'var(--gray-700)' }}>
                {mockOrder.deliveryAddress}
              </p>
            </Card>

            {/* Special Instructions */}
            {mockOrder.specialInstructions && (
              <Card className="p-6">
                <h3 className="font-bold mb-3" style={{ color: 'var(--gray-900)' }}>
                  Special Instructions
                </h3>
                <p style={{ color: 'var(--gray-700)' }}>
                  {mockOrder.specialInstructions}
                </p>
              </Card>
            )}

            {/* Actions */}
            <div className="space-y-3">
              {mockOrder.status === 'DELIVERED' && (
                <button
                  className="w-full py-3 rounded-lg font-semibold"
                  style={{ backgroundColor: 'var(--primary-500)', color: 'var(--white)' }}
                >
                  Reorder
                </button>
              )}
              <button
                className="w-full py-3 rounded-lg font-semibold"
                style={{
                  backgroundColor: 'var(--white)',
                  color: 'var(--primary-500)',
                  border: '2px solid var(--primary-500)'
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
