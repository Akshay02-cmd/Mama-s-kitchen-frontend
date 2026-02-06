import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageHeader from '../../components/shared/PageHeader';
import Card from '../../components/shared/Card';
import OrderSummary from '../../components/customer/OrderSummary';
import OrderItem from '../../components/customer/OrderItem';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { meal, quantity = 1 } = location.state || {};

  const [formData, setFormData] = useState({
    deliveryAddress: 'Hostel Block A, Room 201, Delhi University',
    phone: '+91 9876543210',
    specialInstructions: ''
  });

  // Mock cart items if coming from meal detail page
  const cartItems = meal ? [{
    mealId: meal,
    quantity
  }] : [
    {
      mealId: {
        _id: 'm1',
        name: 'Chicken Biryani',
        price: 150,
        messId: { name: 'Delhi Mess' }
      },
      quantity: 2
    },
    {
      mealId: {
        _id: 'm2',
        name: 'Dal Tadka',
        price: 80,
        messId: { name: 'Delhi Mess' }
      },
      quantity: 1
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.mealId.price * item.quantity), 0);
  const deliveryFee = 0; // Free delivery
  const total = subtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock order creation
    alert('Order placed successfully!');
    navigate('/orders');
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
                    <label className="block mb-2 font-medium" style={{ color: 'var(--gray-900)' }}>
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleChange}
                      rows="3"
                      placeholder="e.g., Extra spicy, No onions, etc."
                      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                      style={{ 
                        borderColor: 'var(--gray-500)',
                        color: 'var(--gray-900)'
                      }}
                    />
                  </div>
                </div>
              </Card>

              {/* Order Items */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
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

              {/* Payment Method */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label 
                    className="flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer"
                    style={{ borderColor: 'var(--primary-500)', backgroundColor: 'var(--primary-50)' }}
                  >
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cod" 
                      defaultChecked
                      className="w-5 h-5"
                      style={{ accentColor: 'var(--primary-500)' }}
                    />
                    <div>
                      <p className="font-semibold" style={{ color: 'var(--gray-900)' }}>
                        Cash on Delivery
                      </p>
                      <p className="text-sm" style={{ color: 'var(--gray-700)' }}>
                        Pay when you receive your order
                      </p>
                    </div>
                  </label>
                </div>
              </Card>
            </div>

            {/* Sidebar - Order Summary */}
            <div>
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                  Order Summary
                </h2>
                
                <div className="mb-4">
                  <OrderSummary subtotal={subtotal} />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-bold text-lg"
                  style={{ backgroundColor: 'var(--primary-500)', color: 'var(--white)' }}
                >
                  Place Order
                </button>

                <p className="text-xs text-center mt-4" style={{ color: 'var(--gray-500)' }}>
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
