/**
 * Error Handler Utility
 * 
 * Provides consistent error handling and formatting across the application
 */

/**
 * Formats API error response for display
 * @param {Object} error - Error object from API
 * @returns {Object} Formatted error with message and details
 */
export const formatError = (error) => {
  // If error is already formatted
  if (error.message && error.status) {
    return {
      message: error.message,
      status: error.status,
      errors: error.errors || [],
    };
  }

  // If error has response (axios error)
  if (error.response) {
    const { status, data } = error.response;
    return {
      message: data?.message || 'An error occurred',
      status: status,
      errors: data?.errors || [],
      data: data,
    };
  }

  // Network error
  if (error.request) {
    return {
      message: 'Network error. Please check your internet connection.',
      status: 0,
      errors: [],
    };
  }

  // Generic error
  return {
    message: error.message || 'An unexpected error occurred',
    status: 0,
    errors: [],
  };
};

/**
 * Gets user-friendly error message
 * @param {Object} error - Error object
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error) => {
  const formatted = formatError(error);
  
  // If there are validation errors, return the first one
  if (formatted.errors && formatted.errors.length > 0) {
    return formatted.errors[0].message || formatted.errors[0];
  }
  
  return formatted.message;
};

/**
 * Checks if error is a specific HTTP status
 * @param {Object} error - Error object
 * @param {number} status - HTTP status code
 * @returns {boolean}
 */
export const isErrorStatus = (error, status) => {
  const formatted = formatError(error);
  return formatted.status === status;
};

/**
 * Checks if error is a validation error (400)
 * @param {Object} error - Error object
 * @returns {boolean}
 */
export const isValidationError = (error) => {
  return isErrorStatus(error, 400);
};

/**
 * Checks if error is an authentication error (401)
 * @param {Object} error - Error object
 * @returns {boolean}
 */
export const isAuthError = (error) => {
  return isErrorStatus(error, 401);
};

/**
 * Checks if error is a forbidden error (403)
 * @param {Object} error - Error object
 * @returns {boolean}
 */
export const isForbiddenError = (error) => {
  return isErrorStatus(error, 403);
};

/**
 * Checks if error is a not found error (404)
 * @param {Object} error - Error object
 * @returns {boolean}
 */
export const isNotFoundError = (error) => {
  return isErrorStatus(error, 404);
};
