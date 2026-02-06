const StatusBadge = ({ status, statusConfig, color, textColor, label }) => {
  // Support both statusConfig pattern and direct props
  const config = statusConfig ? statusConfig[status] : null;
  
  const finalColor = color || config?.color || 'var(--gray-500)';
  const finalTextColor = textColor || config?.textColor || 'var(--white)';
  const finalLabel = label || config?.label || status;

  return (
    <span 
      className="px-5 py-2 rounded-full font-bold text-sm uppercase tracking-wider shadow-md"
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
