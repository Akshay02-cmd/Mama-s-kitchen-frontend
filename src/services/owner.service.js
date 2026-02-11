import apiClient from './api/apiClient.js';
import { API_ENDPOINTS } from './api/constants.js';

/**
 * Owner Service
 * 
 * Handles all owner dashboard and analytics API calls
 */

/**
 * Get owner dashboard statistics
 * @returns {Promise<Object>} Dashboard statistics
 */
export const getOwnerDashboardStats = async () => {
  const response = await apiClient.get(API_ENDPOINTS.OWNER.DASHBOARD_STATS);
  return response.data;
};

/**
 * Get all messes owned by the logged-in owner
 * @returns {Promise<Object>} List of messes with statistics
 */
export const getOwnerMesses = async () => {
  const response = await apiClient.get(API_ENDPOINTS.OWNER.MESSES);
  return response.data;
};

/**
 * Get meals for a specific mess
 * @param {string} messId - Mess ID
 * @returns {Promise<Object>} List of meals
 */
export const getMessMeals = async (messId) => {
  const response = await apiClient.get(API_ENDPOINTS.MESS.MEALS(messId));
  return response.data;
};

/**
 * Get orders for a specific mess
 * @param {string} messId - Mess ID
 * @param {string} [status] - Optional filter by status
 * @returns {Promise<Object>} List of orders
 */
export const getMessOrders = async (messId, status = null) => {
  const url = API_ENDPOINTS.MESS.ORDERS(messId);
  const params = status ? { status } : {};
  const response = await apiClient.get(url, { params });
  return response.data;
};

/**
 * Get statistics for a specific mess
 * @param {string} messId - Mess ID
 * @returns {Promise<Object>} Mess statistics
 */
export const getMessStats = async (messId) => {
  const response = await apiClient.get(API_ENDPOINTS.MESS.STATS(messId));
  return response.data;
};

const ownerService = {
  getOwnerDashboardStats,
  getOwnerMesses,
  getMessMeals,
  getMessOrders,
  getMessStats,
};

export default ownerService;
