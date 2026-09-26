import { useEffect, useState } from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

/**
 * Notification Component
 * Single notification item with slide-down animation
 */
const Notification = ({ id, message, type = 'info', onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  // Trigger slide-down animation on mount
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(id);
    }, 300); // Match animation duration
  };

  // Notification styles based on type
  const styles = {
    success: {
      bg: '#10B981',
      border: '#059669',
      icon: CheckCircle,
    },
    error: {
      bg: '#EF4444',
      border: '#DC2626',
      icon: XCircle,
    },
    warning: {
      bg: '#F59E0B',
      border: '#D97706',
      icon: AlertTriangle,
    },
    info: {
      bg: '#3B82F6',
      border: '#2563EB',
      icon: Info,
    },
  };

  const config = styles[type] || styles.info;
  const Icon = config.icon;

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg shadow-lg mb-3 transition-all duration-300 ease-out ${
        isLeaving 
          ? 'opacity-0 -translate-y-4' 
          : isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-4'
      }`}
      style={{
        backgroundColor: config.bg,
        borderLeft: `4px solid ${config.border}`,
        minWidth: '320px',
        maxWidth: '480px',
      }}
    >
      {/* Icon */}
      <Icon className="w-5 h-5 shrink-0" style={{ color: '#FFFFFF' }} />

      {/* Message */}
      <p className="flex-1 text-sm font-medium" style={{ color: '#FFFFFF' }}>
        {message}
      </p>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="p-1 rounded hover:bg-white/20 transition-colors shrink-0"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" style={{ color: '#FFFFFF' }} />
      </button>
    </div>
  );
};

export default Notification;
