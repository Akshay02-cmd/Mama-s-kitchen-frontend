const StatusBadge = ({ status, statusConfig }) => {
  const config = statusConfig[status];
  
  if (!config) return null;

  return (
    <span 
      className="px-4 py-2 rounded-full font-semibold"
      style={{ 
        backgroundColor: config.color,
        color: 'var(--white)'
      }}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
