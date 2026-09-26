import { Link } from 'react-router-dom';

const QuickActions = () => {
  const actions = [
    {
      to: '/orders',
      icon: '📦',
      label: 'View Orders'
    },
    {
      to: '/meals',
      icon: '🍽️',
      label: 'Browse Meals'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.to}
            className="p-4 rounded-lg border-2 hover:shadow-md transition-shadow text-center"
            style={{ borderColor: 'var(--primary-500)' }}
          >
            <span className="text-2xl mb-2 block">{action.icon}</span>
            <span className="font-semibold" style={{ color: 'var(--gray-900)' }}>
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
