import apiClient from './api/apiClient.js';
import { API_ENDPOINTS } from './api/constants.js';

/**
 * User Service
 * 
 * Handles all user-related API calls (Admin functions)
 */

/**
 * Get all users (Admin only)
 * @returns {Promise<Object>} List of all users
 */
export const getAllUsers = async () => {
  const response = await apiClient.get(API_ENDPOINTS.USERS.BASE);
  return response.data;
};

/**
 * Get all customers (Admin only)
 * @returns {Promise<Object>} List of all customers
 */
export const getAllCustomers = async () => {
  const response = await apiClient.get(API_ENDPOINTS.USERS.CUSTOMERS);
  return response.data;
};

/**
 * Get all owners (Admin only)
 * @returns {Promise<Object>} List of all owners
 */
export const getAllOwners = async () => {
  const response = await apiClient.get(API_ENDPOINTS.USERS.OWNERS);
  return response.data;
};

const userService = {
  getAllUsers,
  getAllCustomers,
  getAllOwners,
};

export default userService;
