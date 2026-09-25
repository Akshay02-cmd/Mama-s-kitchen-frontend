import { useContext } from 'react';
import { NotificationContext } from '../../context/NotificationContext';

/**
 * useNotification Hook
 * 
 * Access notification context to show/hide toast notifications
 * 
 * @returns {Object} Notification context
 * @returns {Array} notifications - Array of active notifications
 * @returns {Function} showNotification - Show a notification (message, type, duration)
 * @returns {Function} hideNotification - Hide a notification by id
 * @returns {Function} showSuccess - Show success notification
 * @returns {Function} showError - Show error notification
 * @returns {Function} showWarning - Show warning notification
 * @returns {Function} showInfo - Show info notification
 * 
 * @example
 * const { showSuccess, showError } = useNotification();
 * 
 * // Show success notification
 * showSuccess('Profile updated successfully!');
 * 
 * // Show error notification with custom duration
 * showError('Failed to save changes', 8000);
 * 
 * // Show custom notification
 * showNotification('Processing...', 'info', 3000);
 */
const useNotification = () => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  
  return context;
};

export default useNotification;
