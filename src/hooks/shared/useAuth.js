import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

/**
 * useAuth Hook
 * Provides access to authentication context
 * 
 * @returns {Object} Auth context with user, login, logout, etc.
 * @throws {Error} If used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
