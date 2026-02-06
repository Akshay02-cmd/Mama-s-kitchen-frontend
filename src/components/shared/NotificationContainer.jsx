import { useNotification } from '../../hooks/shared';
import Notification from './Notification';

/**
 * NotificationContainer Component
 * Container that displays all active notifications
 * Positioned at the top-right of the screen
 */
const NotificationContainer = () => {
  const { notifications, hideNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div
      className="fixed top-24 right-4 z-50 pointer-events-none"
      style={{ maxWidth: '90vw' }}
    >
      <div className="pointer-events-auto">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            id={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={hideNotification}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationContainer;
