/**
 * API Constants
 * 
 * Centralized constants for API endpoints, status codes, and other configurations
 */

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },

  // Profile
  PROFILE: {
    CUSTOMER: '/profile/customer',
    OWNER: '/profile/owner',
  },

  // Mess
  MESS: {
    BASE: '/mess',
    BY_ID: (id) => `/mess/${id}`,
    MEALS: (id) => `/mess/${id}/meals`,
    ORDERS: (id) => `/mess/${id}/orders`,
    STATS: (id) => `/mess/${id}/stats`,
  },

  // Meals/Menu
  MEALS: {
    BASE: '/menu',
    BY_ID: (id) => `/menu/${id}`,
  },

  // Uploads
  UPLOADS: {
    IMAGE: '/uploads/image',
  },

  // Owner
  OWNER: {
    DASHBOARD_STATS: '/owner/dashboard/stats',
    MESSES: '/owner/messes',
  },

  // Orders
  ORDERS: {
    BASE: '/orders',
    BY_ID: (id) => `/orders/${id}`,
    USER_ORDERS: '/orders/userorders',
    BY_STATUS: (status) => `/orders/status/${status}`,
    DATE_RANGE: '/orders/date-range',
    TOTAL_SALES: '/orders/total-sales',
  },

  // Reviews
  REVIEWS: {
    BASE: '/reviews',
    BY_ID: (id) => `/reviews/${id}`,
  },

  // Contact
  CONTACT: {
    BASE: '/contacts',
    BY_ID: (id) => `/contacts/${id}`,
    GROUP_BY_USER: '/contacts/groupbyuser',
  },

  // Users
  USERS: {
    BASE: '/users',
    CUSTOMERS: '/users/customers',
    OWNERS: '/users/owners',
  },
};

// Order Status
export const ORDER_STATUS = {
  PLACED: 'PLACED',
  PREPARING: 'PREPARING',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
};

// Payment Methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'CREDIT_CARD',
  DEBIT_CARD: 'DEBIT_CARD',
  UPI: 'UPI',
  COD: 'COD',
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
};

// Meal Types
export const MEAL_TYPES = {
  BREAKFAST: 'breakfast',
  LUNCH: 'lunch',
  DINNER: 'dinner',
  SNACK: 'snack',
};

// User Roles
export const USER_ROLES = {
  CUSTOMER: 'CUSTOMER',
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
