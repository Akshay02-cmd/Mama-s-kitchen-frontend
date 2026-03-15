import apiClient from './api/apiClient.js';
import { API_ENDPOINTS } from './api/constants.js';

/**
 * Meal Service
 * 
 * Handles all meal/menu-related API calls
 */

/**
 * Get all meals
 * @returns {Promise<Object>} List of all meals
 */
export const getAllMeals = async () => {
  const response = await apiClient.get(API_ENDPOINTS.MEALS.BASE);
  return response.data;
};

/**
 * Get a single meal by ID
 * @param {string} mealId - Meal ID
 * @returns {Promise<Object>} Meal data
 */
export const getMealById = async (mealId) => {
  const response = await apiClient.get(API_ENDPOINTS.MEALS.BY_ID(mealId));
  return response.data;
};

/**
 * Create a new meal (Owner only)
 * Note: Backend route uses POST /menu/:mealid which is unusual.
 * If you have a mealId to use, include it in mealData.mealid
 * @param {Object} mealData - Meal data
 * @param {string} mealData.name - Name of the meal
 * @param {string} mealData.mealType - Type of meal (breakfast, lunch, dinner, snack)
 * @param {boolean} mealData.is_Veg - Whether the meal is vegetarian
 * @param {string} mealData.description - Description of the meal
 * @param {number} mealData.price - Price of the meal
 * @param {boolean} mealData.is_Available - Availability status
 * @param {string} [mealData.mealid] - Meal ID (if required by backend route)
 * @returns {Promise<Object>} Created meal data
 */
export const createMeal = async (mealData) => {
  // Backend: POST /menu/:mealid  (mealid param is unused by controller — use a placeholder)
  const response = await apiClient.post(API_ENDPOINTS.MEALS.BY_ID('create'), mealData);
  return response.data;
};

/**
 * Update a meal (Owner only)
 * @param {string} mealId - Meal ID
 * @param {Object} mealData - Updated meal data
 * @param {string} [mealData.name] - Name of the meal
 * @param {string} [mealData.mealType] - Type of meal
 * @param {boolean} [mealData.is_Veg] - Whether the meal is vegetarian
 * @param {string} [mealData.description] - Description of the meal
 * @param {number} [mealData.price] - Price of the meal
 * @param {boolean} [mealData.is_Available] - Availability status
 * @returns {Promise<Object>} Updated meal data
 */
export const updateMeal = async (mealId, mealData) => {
  const response = await apiClient.put(API_ENDPOINTS.MEALS.BY_ID(mealId), mealData);
  return response.data;
};

/**
 * Delete a meal (Owner only)
 * @param {string} mealId - Meal ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteMeal = async (mealId) => {
  const response = await apiClient.delete(API_ENDPOINTS.MEALS.BY_ID(mealId));
  return response.data;
};

/**
 * Get meals by mess ID
 * Note: This might need to be implemented as a separate endpoint or filter
 * @param {string} messId - Mess ID
 * @returns {Promise<Object>} List of meals for the mess
 */
export const getMealsByMessId = async (messId) => {
  // This endpoint might need to be added to the backend
  // For now, we'll filter on the frontend or use a query parameter
  const response = await apiClient.get(`${API_ENDPOINTS.MEALS.BASE}?messId=${messId}`);
  return response.data;
};

/**
 * Get meals by type
 * @param {string} mealType - Type of meal (breakfast, lunch, dinner, snack)
 * @returns {Promise<Object>} List of meals filtered by type
 */
export const getMealsByType = async (mealType) => {
  const response = await apiClient.get(`${API_ENDPOINTS.MEALS.BASE}?mealType=${mealType}`);
  return response.data;
};

/**
 * Get available meals only
 * @returns {Promise<Object>} List of available meals
 */
export const getAvailableMeals = async () => {
  const response = await apiClient.get(`${API_ENDPOINTS.MEALS.BASE}?is_Available=true`);
  return response.data;
};

const mealService = {
  getAllMeals,
  getMealById,
  createMeal,
  updateMeal,
  deleteMeal,
  getMealsByMessId,
  getMealsByType,
  getAvailableMeals,
};

export default mealService;
