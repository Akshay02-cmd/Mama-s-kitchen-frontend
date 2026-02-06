const PersonalInfo = ({ profile }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--gray-900)' }}>
        Personal Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--gray-700)' }}>
            Full Name
          </label>
          <p className="text-lg font-semibold" style={{ color: 'var(--gray-900)' }}>
            {profile?.userId?.name || 'N/A'}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--gray-700)' }}>
            Email
          </label>
          <p className="text-lg font-semibold" style={{ color: 'var(--gray-900)' }}>
            {profile?.userId?.email || 'N/A'}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--gray-700)' }}>
            Phone
          </label>
          <p className="text-lg font-semibold" style={{ color: 'var(--gray-900)' }}>
            {profile?.userId?.phone || profile?.phone || 'N/A'}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--gray-700)' }}>
            Dietary Preference
          </label>
          <p className="text-lg font-semibold" style={{ color: 'var(--gray-900)' }}>
            {profile?.preferences?.dietaryType || 'Not specified'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
