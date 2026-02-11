import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageHeader from '../../components/shared/PageHeader';
import Card from '../../components/shared/Card';
import OrderSummary from '../../components/customer/OrderSummary';
import OrderItem from '../../components/customer/OrderItem';
import orderService from '../../services/order.service';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { meal, quantity = 1 } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    deliveryAddress: '',
    phone: '',
    paymentMethod: 'COD',
    notes: ''
  });

  // Prepare cart items - must have valid meal data
  const cartItems = meal ? [{
    mealId: meal,
    quantity
  }] : [];

  // If no cart items, redirect back
  if (!cartItems || cartItems.length === 0) {
    navigate('/messes');
    return null;
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.mealId.price * item.quantity), 0);
  const deliveryFee = 0; // Free delivery
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Prepare order data
      const orderData = {
        items: cartItems.map(item => ({
          mealId: item.mealId._id,
          quantity: item.quantity,
          price: item.mealId.price
        })),
        deliveryAddress: formData.deliveryAddress,
        deliveryPhone: formData.phone,
        paymentMethod: formData.paymentMethod,
        paymentStatus: 'PENDING',
        notes: formData.notes,
        status: 'PLACED'
      };

      // Create order via API
      await orderService.createOrder(orderData);
      
      // Success - navigate to orders page
      navigate('/orders', { 
        state: { message: 'Order placed successfully!' }
      });
    } catch (err) {
      console.error('Error placing order:', err);
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gray-100)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader title="Checkout" />

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Information */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                  Delivery Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium" style={{ color: 'var(--gray-900)' }}>
                      Delivery Address *
                    </label>
                    <textarea
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={handleChange}
                      required
                      rows="3"
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                      style={{ 
                        borderColor: 'var(--gray-500)',
                        color: 'var(--gray-900)'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium" style={{ color: 'var(--gray-900)' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                      style={{ 
                        borderColor: 'var(--gray-500)',
                        color: 'var(--gray-900)'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium" style={{ color: '#111827' }}>
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows="3"
                      placeholder="e.g., Extra spicy, No onions, etc."
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                      style={{ 
                        borderColor: '#D1D5DB',
                        color: '#111827'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium" style={{ color: '#111827' }}>
                      Payment Method *
                    </label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                      style={{ 
                        borderColor: '#D1D5DB',
                        color: '#111827'
                      }}
                    >
                      <option value="COD">Cash on Delivery</option>
                      <option value="UPI">UPI</option>
                      <option value="CREDIT_CARD">Credit Card</option>
                      <option value="DEBIT_CARD">Debit Card</option>
                    </select>
                  </div>
                </div>
              </Card>

              {/* Error Message */}
              {error && (
                <Card className="p-4" style={{ backgroundColor: '#FEE2E2', borderColor: '#EF4444' }}>
                  <p style={{ color: '#991B1B' }}>{error}</p>
                </Card>
              )}

              {/* Order Items */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4" style={{ color: '#111827' }}>
                  Order Items
                </h2>
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <OrderItem 
                      key={index} 
                      item={item} 
                      index={index} 
                      isLast={index === cartItems.length - 1} 
                    />
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar - Order Summary */}
            <div>
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4" style={{ color: '#111827' }}>
                  Order Summary
                </h2>
                
                <div className="mb-4">
                  <OrderSummary subtotal={subtotal} />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#8B5CF6', color: '#FFFFFF' }}
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>

                <p className="text-xs text-center mt-4" style={{ color: '#6B7280' }}>
                  By placing this order, you agree to our Terms & Conditions
                </p>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
