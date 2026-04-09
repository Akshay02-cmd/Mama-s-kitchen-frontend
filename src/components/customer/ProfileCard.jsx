import { Link } from 'react-router-dom';

const ProfileCard = ({ profile }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      {profile.profileImage ? (
        <img
          src={profile.profileImage}
          alt={profile.userId.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />
      ) : (
        <div 
          className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold"
          style={{ backgroundColor: 'var(--primary-500)' }}
        >
          {profile.userId.name.substring(0, 1)}
        </div>
      )}
      <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--gray-900)' }}>
        {profile.userId.name}
      </h2>
      <p className="text-sm mb-4" style={{ color: 'var(--gray-700)' }}>
        {profile.userId.email}
      </p>
      <Link
        to="/profile/edit"
        className="inline-block px-6 py-2 rounded-lg font-semibold"
        style={{ 
          backgroundColor: 'var(--primary-500)', 
          color: 'var(--white)' 
        }}
      >
        Edit Profile
      </Link>
    </div>
  );
};

export default ProfileCard;
