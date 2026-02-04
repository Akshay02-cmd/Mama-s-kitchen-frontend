import apiClient from './api/apiClient.js';
import { API_ENDPOINTS } from './api/constants.js';

/**
 * Order Service
 * 
 * Handles all order-related API calls
 */

/**
 * Create a new order (Customer only)
 * @param {Object} orderData - Order data
 * @param {Array<Object>} orderData.items - Array of order items
 * @param {string} orderData.items[].mealId - Meal ID
 * @param {number} orderData.items[].quantity - Quantity
 * @param {number} orderData.items[].price - Price per item
 * @param {string} orderData.deliveryAddress - Delivery address
 * @param {string} orderData.deliveryPhone - Delivery phone number
 * @param {string} orderData.status - Order status (default: PLACED)
 * @param {string} orderData.paymentMethod - Payment method (CREDIT_CARD, DEBIT_CARD, UPI, COD)
 * @param {string} orderData.paymentStatus - Payment status (default: PENDING)
 * @param {string} [orderData.paymentId] - Payment transaction ID
 * @param {string} [orderData.notes] - Additional notes
 * @param {Date|string} [orderData.deliverytime] - Delivery time
 * @returns {Promise<Object>} Created order data
 */
export const createOrder = async (orderData) => {
  const response = await apiClient.post(API_ENDPOINTS.ORDERS.BASE, orderData);
  return response.data;
};

/**
 * Get all orders (Admin/Owner only)
 * @returns {Promise<Object>} List of all orders
 */
export const getAllOrders = async () => {
  const response = await apiClient.get(API_ENDPOINTS.ORDERS.BASE);
  return response.data;
};

/**
 * Get a single order by ID
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} Order data
 */
export const getOrderById = async (orderId) => {
  const response = await apiClient.get(API_ENDPOINTS.ORDERS.BY_ID(orderId));
  return response.data;
};

/**
 * Get orders for the current user (Customer)
 * @returns {Promise<Object>} List of user's orders
 */
export const getUserOrders = async () => {
  const response = await apiClient.get(API_ENDPOINTS.ORDERS.USER_ORDERS);
  return response.data;
};

/**
 * Update order status (Owner only)
 * @param {string} orderId - Order ID
 * @param {Object} updateData - Update data
 * @param {string} updateData.status - New order status (PLACED, PREPARING, DELIVERED, CANCELLED)
 * @returns {Promise<Object>} Updated order data
 */
export const updateOrderStatus = async (orderId, updateData) => {
  const response = await apiClient.put(API_ENDPOINTS.ORDERS.BY_ID(orderId), updateData);
  return response.data;
};

/**
 * Delete an order (Owner only)
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteOrder = async (orderId) => {
  const response = await apiClient.delete(API_ENDPOINTS.ORDERS.BY_ID(orderId));
  return response.data;
};

/**
 * Clear all orders for the current user (Customer)
 * @returns {Promise<Object>} Deletion confirmation
 */
export const clearUserOrders = async () => {
  const response = await apiClient.delete(API_ENDPOINTS.ORDERS.USER_ORDERS);
  return response.data;
};

/**
 * Get orders by status (Owner only)
 * @param {string} status - Order status
 * @returns {Promise<Object>} List of orders with the specified status
 */
export const getOrdersByStatus = async (status) => {
  const response = await apiClient.get(API_ENDPOINTS.ORDERS.BY_STATUS(status));
  return response.data;
};

/**
 * Get orders within a date range (Owner only)
 * @param {Object} dateRange - Date range
 * @param {string|Date} dateRange.startDate - Start date
 * @param {string|Date} dateRange.endDate - End date
 * @returns {Promise<Object>} List of orders within the date range
 */
export const getOrdersWithinDateRange = async (dateRange) => {
  const response = await apiClient.get(API_ENDPOINTS.ORDERS.DATE_RANGE, {
    params: dateRange,
  });
  return response.data;
};

/**
 * Get total sales (Owner only)
 * @returns {Promise<Object>} Total sales amount
 */
export const getTotalSales = async () => {
  const response = await apiClient.get(API_ENDPOINTS.ORDERS.TOTAL_SALES);
  return response.data;
};

const orderService = {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
  clearUserOrders,
  getOrdersByStatus,
  getOrdersWithinDateRange,
  getTotalSales,
};

export default orderService;
