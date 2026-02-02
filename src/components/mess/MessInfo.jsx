const MessInfo = ({ mess }) => {
  const infoItems = [
    { icon: '📍', label: 'Address', value: mess.address },
    { icon: '📞', label: 'Phone', value: mess.phone },
    { icon: '🕐', label: 'Hours', value: mess.openingHours }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {infoItems.map((item, index) => (
        <div key={index} className="flex items-start gap-3">
          <span className="text-2xl">{item.icon}</span>
          <div>
            <p className="font-semibold" style={{ color: 'var(--gray-900)' }}>
              {item.label}
            </p>
            <p style={{ color: 'var(--gray-700)' }}>{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessInfo;
