const StatusBadge = ({ status, statusConfig, color, textColor, label }) => {
  // Support both statusConfig pattern and direct props
  const config = statusConfig ? statusConfig[status] : null;
  
  const finalColor = color || config?.color || 'var(--gray-500)';
  const finalTextColor = textColor || config?.textColor || 'var(--white)';
  const finalLabel = label || config?.label || status;

  return (
    <span 
      className="px-4 py-2 rounded-full font-semibold"
      style={{ 
        backgroundColor: finalColor,
        color: finalTextColor
      }}
    >
      {finalLabel}
    </span>
  );
};

export default StatusBadge;
