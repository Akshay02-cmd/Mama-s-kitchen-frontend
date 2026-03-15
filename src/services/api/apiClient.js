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
      if (import.meta.env.DEV) {
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url} - Token: ${token.substring(0, 20)}...`);
      }
    } else {
      if (import.meta.env.DEV) {
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url} - No token`);
      }
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

    // Log error in development (except for expected 404s on profile endpoints)
    if (import.meta.env.DEV) {
      const url = error.config?.url || '';
      const status = errorResponse?.status;
      
      // Don't log expected errors
      const isExpectedError = (
        (status === 404 && url.includes('/profile/')) || // Profile not found is expected
        (status === 401 && !url.includes('/auth/')) // 401 on non-auth endpoints might be profile checks
      );
      
      if (!isExpectedError) {
        console.error('[API Error]', {
          url: error.config?.url,
          method: error.config?.method,
          status: errorResponse?.status,
          data: errorResponse?.data,
        });
      }
    }

    // Handle specific error cases
    if (errorResponse) {
      const { status, data } = errorResponse;

      // 401 Unauthorized - Token expired or invalid
      if (status === 401) {
        const url = error.config?.url || '';
        const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/register');
        const isProfileEndpoint = url.includes('/profile/');
        
        // Don't clear auth on profile endpoints during initial checks
        // Profile might not exist yet (404 expected, but sometimes 401 occurs)
        if (!isProfileEndpoint) {
          // Clear authentication data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          
          // Don't redirect during login/register - let those pages handle it
          if (!isAuthEndpoint && window.location.pathname !== '/login') {
            // Redirect to login page for all other 401 errors
            window.location.href = '/login';
          }
        } else {
          // For profile endpoints, let the calling code handle 401
          // Don't automatically logout - could be profile doesn't exist yet
          console.log('[API] 401 on profile endpoint - not clearing auth');
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
