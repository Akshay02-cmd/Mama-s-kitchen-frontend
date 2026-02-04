import apiClient from './api/apiClient.js';
import { API_ENDPOINTS } from './api/constants.js';

/**
 * Profile Service
 * 
 * Handles all profile-related API calls for both customers and owners
 */

// ==================== Customer Profile ====================

/**
 * Get customer profile
 * @returns {Promise<Object>} Customer profile data
 */
export const getCustomerProfile = async () => {
  const response = await apiClient.get(API_ENDPOINTS.PROFILE.CUSTOMER);
  return response.data;
};

/**
 * Create customer profile
 * @param {Object} profileData - Customer profile data
 * @param {string} profileData.phone - Phone number
 * @param {string} profileData.address - Delivery address
 * @returns {Promise<Object>} Created customer profile
 */
export const createCustomerProfile = async (profileData) => {
  const response = await apiClient.post(API_ENDPOINTS.PROFILE.CUSTOMER, profileData);
  return response.data;
};

/**
 * Update customer profile
 * @param {Object} profileData - Updated customer profile data
 * @param {string} [profileData.phone] - Phone number
 * @param {string} [profileData.address] - Delivery address
 * @returns {Promise<Object>} Updated customer profile
 */
export const updateCustomerProfile = async (profileData) => {
  const response = await apiClient.put(API_ENDPOINTS.PROFILE.CUSTOMER, profileData);
  return response.data;
};

// ==================== Owner Profile ====================

/**
 * Get owner profile
 * @returns {Promise<Object>} Owner profile data
 */
export const getOwnerProfile = async () => {
  const response = await apiClient.get(API_ENDPOINTS.PROFILE.OWNER);
  return response.data;
};

/**
 * Create owner profile
 * @param {Object} profileData - Owner profile data
 * @param {string} profileData.phone - Phone number
 * @param {string} profileData.address - Business address
 * @returns {Promise<Object>} Created owner profile
 */
export const createOwnerProfile = async (profileData) => {
  const response = await apiClient.post(API_ENDPOINTS.PROFILE.OWNER, profileData);
  return response.data;
};

/**
 * Update owner profile
 * @param {Object} profileData - Updated owner profile data
 * @param {string} [profileData.phone] - Phone number
 * @param {string} [profileData.address] - Business address
 * @returns {Promise<Object>} Updated owner profile
 */
export const updateOwnerProfile = async (profileData) => {
  const response = await apiClient.put(API_ENDPOINTS.PROFILE.OWNER, profileData);
  return response.data;
};

const profileService = {
  // Customer
  getCustomerProfile,
  createCustomerProfile,
  updateCustomerProfile,
  // Owner
  getOwnerProfile,
  createOwnerProfile,
  updateOwnerProfile,
};

export default profileService;
