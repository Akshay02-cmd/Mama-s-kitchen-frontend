const statusConfig = {
  PLACED: { color: 'var(--info)', label: 'Placed' },
  PENDING: { color: 'var(--warning)', label: 'Pending' },
  PREPARING: { color: 'var(--info)', label: 'Preparing' },
  OUT_FOR_DELIVERY: { color: 'var(--info)', label: 'Out for Delivery' },
  DELIVERED: { color: 'var(--success)', label: 'Delivered' },
  CANCELLED: { color: 'var(--error)', label: 'Cancelled' }
};

const OrderTimeline = ({ statusHistory }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--gray-900)' }}>
        Order Timeline
      </h2>
      <div className="relative">
        {statusHistory.map((event, index) => (
          <div key={index} className="flex gap-4 pb-6 relative">
            {/* Timeline Line */}
            {index !== statusHistory.length - 1 && (
              <div 
                className="absolute left-3 top-8 w-0.5 h-full"
                style={{ backgroundColor: 'var(--gray-100)' }}
              />
            )}
            
            {/* Timeline Dot */}
            <div 
              className="w-6 h-6 rounded-full shrink-0 z-10"
              style={{ 
                backgroundColor: statusConfig[event.status]?.color || 'var(--gray-500)',
                border: '3px solid white',
                boxShadow: '0 0 0 1px var(--gray-100)'
              }}
            />
            
            {/* Timeline Content */}
            <div className="flex-1">
              <p className="font-semibold mb-1" style={{ color: 'var(--gray-900)' }}>
                {statusConfig[event.status]?.label || event.status}
              </p>
              <p className="text-sm mb-1" style={{ color: 'var(--gray-700)' }}>
                {event.message}
              </p>
              <p className="text-xs" style={{ color: 'var(--gray-500)' }}>
                {new Date(event.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTimeline;
