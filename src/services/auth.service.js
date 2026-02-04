import apiClient from './api/apiClient.js';
import { API_ENDPOINTS } from './api/constants.js';

/**
 * Authentication Service
 * 
 * Handles all authentication-related API calls:
 * - User registration
 * - User login
 * - User logout
 */

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.name - User's full name
 * @param {string} userData.email - User's email address
 * @param {string} userData.password - User's password
 * @param {string} userData.role - User role (CUSTOMER or OWNER)
 * @returns {Promise<Object>} User data and token
 */
export const register = async (userData) => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  return response.data;
};

/**
 * Login user
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User's email address
 * @param {string} credentials.password - User's password
 * @param {string} credentials.role - User role (CUSTOMER or OWNER)
 * @returns {Promise<Object>} User data and token
 */
export const login = async (credentials) => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  
  // Store token if provided in response (for bearer token auth)
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  
  // Store user data if provided
  if (response.data.user) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

/**
 * Logout user
 * @returns {Promise<Object>} Logout confirmation
 */
export const logout = async () => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  
  // Clear local storage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  return response.data;
};

/**
 * Get stored user data from localStorage
 * @returns {Object|null} User data or null
 */
export const getStoredUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Get stored token from localStorage
 * @returns {string|null} Token or null
 */
export const getStoredToken = () => {
  return localStorage.getItem('token');
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if token exists
 */
export const isAuthenticated = () => {
  return !!getStoredToken();
};

/**
 * Clear authentication data
 */
export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
  getStoredUser,
  getStoredToken,
  isAuthenticated,
  clearAuth,
};

export default authService;
