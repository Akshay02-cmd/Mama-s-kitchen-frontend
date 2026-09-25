import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

/**
 * useTheme Hook
 * Provides access to theme context
 * 
 * @returns {Object} Theme context with theme and toggleTheme
 * @throws {Error} If used outside ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
