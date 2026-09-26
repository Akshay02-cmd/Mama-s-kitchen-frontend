import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../shared/useAuth';

/**
 * useMessOrders Hook
 * Manages mess orders and order operations
 * 
 * @returns {Object} Orders data, filters, and handlers
 */
export const useMessOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('new'); // new, preparing, delivered

  // Fetch orders
  const fetchOrders = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with actual API call
      // const data = await getMessOrders();
      
      // Mock data for now
      setOrders([
        {
          id: '1001',
          customerName: 'John Doe',
          items: [{ name: 'Dal Tadka', quantity: 2, price: 80 }],
          total: 160,
          status: 'new',
          orderTime: new Date().toISOString(),
          deliveryAddress: '123 Main St'
        },
        {
          id: '1002',
          customerName: 'Jane Smith',
          items: [{ name: 'Paneer Butter Masala', quantity: 1, price: 120 }],
          total: 120,
          status: 'preparing',
          orderTime: new Date(Date.now() - 1800000).toISOString(),
          deliveryAddress: '456 Oak Ave'
        }
      ]);
    } catch (err) {
      setError(err.message || 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Filter orders by status
  const filteredOrders = orders.filter(order => {
    const statusMap = {
      new: ['new', 'pending'],
      preparing: ['preparing', 'accepted'],
      delivered: ['delivered', 'completed']
    };
    return statusMap[activeTab]?.includes(order.status.toLowerCase());
  });

  // Accept order
  const acceptOrder = useCallback(async (orderId) => {
    // TODO: API call to accept order
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: 'preparing' } : order
      )
    );
  }, []);

  // Mark as delivered
  const markAsDelivered = useCallback(async (orderId) => {
    // TODO: API call to mark as delivered
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: 'delivered' } : order
      )
    );
  }, []);

  // Get order counts by status
  const orderCounts = {
    new: orders.filter(o => ['new', 'pending'].includes(o.status.toLowerCase())).length,
    preparing: orders.filter(o => ['preparing', 'accepted'].includes(o.status.toLowerCase())).length,
    delivered: orders.filter(o => ['delivered', 'completed'].includes(o.status.toLowerCase())).length
  };

  // Initial fetch
  useEffect(() => {
    fetchOrders();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  return {
    orders: filteredOrders,
    allOrders: orders,
    loading,
    error,
    activeTab,
    setActiveTab,
    orderCounts,
    acceptOrder,
    markAsDelivered,
    refetch: fetchOrders
  };
};
