import apiClient from './api/apiClient.js';
import { API_ENDPOINTS } from './api/constants.js';

/**
 * Mess Service
 * 
 * Handles all mess/catering service-related API calls
 */

/**
 * Get all messes
 * @returns {Promise<Object>} List of all messes
 */
export const getAllMesses = async () => {
  const response = await apiClient.get(API_ENDPOINTS.MESS.BASE);
  return response.data;
};

/**
 * Get a single mess by ID
 * @param {string} messId - Mess ID
 * @returns {Promise<Object>} Mess data
 */
export const getMessById = async (messId) => {
  const response = await apiClient.get(API_ENDPOINTS.MESS.BY_ID(messId));
  return response.data;
};

/**
 * Create a new mess (Owner only)
 * @param {Object} messData - Mess data
 * @param {string} messData.messName - Name of the mess
 * @param {string} messData.area - Area/location
 * @param {string} messData.phone - Contact phone number
 * @param {string} messData.address - Full address
 * @param {string} messData.description - Description of the mess
 * @returns {Promise<Object>} Created mess data
 */
export const createMess = async (messData) => {
  const response = await apiClient.post(API_ENDPOINTS.MESS.BASE, messData);
  return response.data;
};

/**
 * Update a mess (Owner only)
 * @param {string} messId - Mess ID
 * @param {Object} messData - Updated mess data
 * @param {string} [messData.messName] - Name of the mess
 * @param {string} [messData.area] - Area/location
 * @param {string} [messData.phone] - Contact phone number
 * @param {string} [messData.address] - Full address
 * @param {string} [messData.description] - Description of the mess
 * @param {boolean} [messData.is_Active] - Active status
 * @returns {Promise<Object>} Updated mess data
 */
export const updateMess = async (messId, messData) => {
  const response = await apiClient.put(API_ENDPOINTS.MESS.BY_ID(messId), messData);
  return response.data;
};

/**
 * Delete a mess (Owner only)
 * @param {string} messId - Mess ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteMess = async (messId) => {
  const response = await apiClient.delete(API_ENDPOINTS.MESS.BY_ID(messId));
  return response.data;
};

const messService = {
  getAllMesses,
  getMessById,
  createMess,
  updateMess,
  deleteMess,
};

export default messService;
