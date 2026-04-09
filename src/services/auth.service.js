import apiClient from './api/apiClient.js';
import { API_ENDPOINTS } from './api/constants.js';

export const register = async (userData) => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);

  // Mirror login behavior so newly registered users are immediately authenticated.
  if (response.data?.token) {
    localStorage.setItem('token', response.data.token);
  }

  if (response.data?.user) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }

  return response.data;
};

export const login = async (credentials) => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  
  if (import.meta.env.DEV) {
    console.log('[AuthService] Login response:', { 
      success: response.data?.success,
      hasToken: !!response.data?.token,
      hasUser: !!response.data?.user
    });
  }
  
  // Store token if provided in response (for bearer token auth)
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    if (import.meta.env.DEV) {
      console.log('[AuthService] Token stored in localStorage');
    }
  }
  
  // Store user data if provided
  if (response.data.user) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
    if (import.meta.env.DEV) {
      console.log('[AuthService] User stored in localStorage');
    }
  }
  
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  
  // Clear local storage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('profileImage');
  
  return response.data;
};

export const getStoredUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error parsing user data:', error);
    }
    return null;
  }
};

export const getStoredToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!getStoredToken();
};

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('profileImage');
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
