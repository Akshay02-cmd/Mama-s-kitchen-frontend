import { useState, useEffect, useCallback } from 'react';
import * as orderService from '../../services/order.service';

/**
 * useOrders Hook
 * Manages customer orders data
 * 
 * @returns {Object} Orders data, loading state, and handlers
 */
export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, completed, cancelled

  // Fetch orders
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getUserOrders();
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status.toLowerCase() === filter.toLowerCase();
  });

  // Get order by ID
  const getOrderById = useCallback((orderId) => {
    return orders.find(order => order.id === orderId);
  }, [orders]);

  // Cancel order
  const cancelOrder = useCallback(async (orderId) => {
    setError('Customer-side order cancellation is not supported in the current API flow.');
    return orderId;
  }, [fetchOrders]);

  // Initial fetch
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders: filteredOrders,
    allOrders: orders,
    loading,
    error,
    filter,
    setFilter,
    getOrderById,
    cancelOrder,
    refetch: fetchOrders
  };
};
