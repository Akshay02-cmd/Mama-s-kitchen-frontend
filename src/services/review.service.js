import apiClient from './api/apiClient.js';
import { API_ENDPOINTS } from './api/constants.js';

/**
 * Review Service
 * 
 * Handles all review-related API calls
 */

/**
 * Get all reviews
 * @returns {Promise<Object>} List of all reviews
 */
export const getAllReviews = async () => {
  const response = await apiClient.get(API_ENDPOINTS.REVIEWS.BASE);
  return response.data;
};

/**
 * Get a single review by ID
 * @param {string} reviewId - Review ID
 * @returns {Promise<Object>} Review data
 */
export const getReviewById = async (reviewId) => {
  const response = await apiClient.get(API_ENDPOINTS.REVIEWS.BY_ID(reviewId));
  return response.data;
};

/**
 * Create a new review (Customer only)
 * @param {Object} reviewData - Review data
 * @param {string} reviewData.messId - Mess ID being reviewed
 * @param {string} reviewData.mealId - Meal ID being reviewed (optional)
 * @param {number} reviewData.rating - Rating (1-5)
 * @param {string} reviewData.comment - Review comment
 * @returns {Promise<Object>} Created review data
 */
export const createReview = async (reviewData) => {
  const response = await apiClient.post(API_ENDPOINTS.REVIEWS.BASE, reviewData);
  return response.data;
};

/**
 * Update a review (Customer only)
 * @param {string} reviewId - Review ID
 * @param {Object} reviewData - Updated review data
 * @param {number} [reviewData.rating] - Updated rating
 * @param {string} [reviewData.comment] - Updated comment
 * @returns {Promise<Object>} Updated review data
 */
export const updateReview = async (reviewId, reviewData) => {
  const response = await apiClient.put(API_ENDPOINTS.REVIEWS.BY_ID(reviewId), reviewData);
  return response.data;
};

/**
 * Delete a review (Customer only)
 * @param {string} reviewId - Review ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteReview = async (reviewId) => {
  const response = await apiClient.delete(API_ENDPOINTS.REVIEWS.BY_ID(reviewId));
  return response.data;
};

/**
 * Get reviews for a specific mess
 * @param {string} messId - Mess ID
 * @returns {Promise<Object>} List of reviews for the mess
 */
export const getReviewsByMessId = async (messId) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.REVIEWS.BASE, {
      params: { mess: messId },
    });
    return response.data;
  } catch (error) {
    if (error?.status === 404) {
      return { success: true, reviews: [] };
    }
    throw error;
  }
};

/**
 * Get reviews for a specific meal
 * @param {string} mealId - Meal ID
 * @returns {Promise<Object>} List of reviews for the meal
 */
export const getReviewsByMealId = async (mealId) => {
  const response = await apiClient.get(API_ENDPOINTS.REVIEWS.BASE, {
    params: { meal: mealId },
  });
  return response.data;
};

const reviewService = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getReviewsByMessId,
  getReviewsByMealId,
};

export default reviewService;
