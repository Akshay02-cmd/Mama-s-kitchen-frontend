const ProfileStats = ({ stats }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
        Quick Stats
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span style={{ color: 'var(--gray-700)' }}>Total Orders</span>
          <span className="text-xl font-bold" style={{ color: 'var(--primary-500)' }}>
            {stats.totalOrders}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span style={{ color: 'var(--gray-700)' }}>Total Spent</span>
          <span className="text-xl font-bold" style={{ color: 'var(--primary-500)' }}>
            ₹{stats.totalSpent}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
