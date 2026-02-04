import axios from 'axios';

/**
 * Base API Client Configuration
 * 
 * This file sets up the axios instance with:
 * - Base URL from environment variables
 * - Request interceptors for authentication
 * - Response interceptors for error handling
 * - Default headers and configuration
 */

// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  withCredentials: true, // Include cookies in requests (for JWT cookie-based auth)
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * Adds authentication token to requests if available
 */
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage if using bearer token auth
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    // Handle request error
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles common response scenarios and errors
 */
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    }

    // Return data directly (axios wraps it in a data property)
    return response;
  },
  (error) => {
    // Handle response errors
    const errorResponse = error.response;

    // Log error in development
    if (import.meta.env.DEV) {
      console.error('[API Error]', {
        url: error.config?.url,
        method: error.config?.method,
        status: errorResponse?.status,
        data: errorResponse?.data,
      });
    }

    // Handle specific error cases
    if (errorResponse) {
      const { status, data } = errorResponse;

      // 401 Unauthorized - Clear token and redirect to login
      if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }

      // 403 Forbidden - User doesn't have permission
      if (status === 403) {
        // Could show a toast notification here
        console.warn('Access forbidden');
      }

      // 404 Not Found
      if (status === 404) {
        console.warn('Resource not found');
      }

      // 500 Server Error
      if (status >= 500) {
        console.error('Server error occurred');
      }

      // Return error with consistent structure
      return Promise.reject({
        status,
        message: data?.message || error.message || 'An error occurred',
        errors: data?.errors || [],
        data: data,
      });
    }

    // Network error or no response
    if (error.request) {
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your internet connection.',
        errors: [],
      });
    }

    // Request setup error
    return Promise.reject({
      status: 0,
      message: error.message || 'An unexpected error occurred',
      errors: [],
    });
  }
);

export default apiClient;
