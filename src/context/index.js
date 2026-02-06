/**
 * Context Index
 * Centralized export for all context providers
 * 
 * These contexts are shared across all user roles (customer, owner, mess)
 * Import them like this:
 * import { AuthProvider, AuthContext, ThemeProvider, ThemeContext } from './context';
 */

export { AuthProvider, AuthContext } from './AuthContext.jsx';
export { ThemeProvider, ThemeContext } from './ThemeContext.jsx';
export { NotificationProvider, NotificationContext } from './NotificationContext.jsx';
