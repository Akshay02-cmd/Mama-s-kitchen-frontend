import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/shared';
import * as profileService from '../../services/profile.service';
import { uploadImage } from '../../services/upload.service';
import Breadcrumb from '../../components/shared/Breadcrumb';
import Card from '../../components/shared/Card';
import { ImagePlus, X } from 'lucide-react';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateProfileStatus } = useAuth();
  const requiresCompletion = location.state?.requiresCompletion || false;
  
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
  });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [isNewProfile, setIsNewProfile] = useState(false);

  // Fetch existing profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        let response;
        
        if (user.role === 'CUSTOMER') {
          response = await profileService.getCustomerProfile();
        } else if (user.role === 'OWNER') {
          response = await profileService.getOwnerProfile();
        }

        if (response?.profile) {
          setFormData({
            phone: response.profile.phone || '',
            address: response.profile.address || '',
          });
          setProfileImagePreview(response.profile.profileImage || '');
          setIsNewProfile(false);
        }
      } catch (err) {
        // Profile doesn't exist, this is a new profile
        console.log('No existing profile, creating new one');
        setIsNewProfile(true);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate phone number (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = formData.phone.replace(/[\s\-\+]/g, '').slice(-10);
    
    if (!phoneRegex.test(cleanPhone)) {
      setError('Please enter a valid Indian mobile number (10 digits starting with 6-9)');
      return;
    }

    if (formData.address.length < 10 || formData.address.length > 300) {
      setError('Address must be between 10 and 300 characters');
      return;
    }

    try {
      setSaving(true);
      setError('');

      let profileImage = profileImagePreview;
      if (profileImageFile) {
        const uploadResponse = await uploadImage(profileImageFile, 'mummas-kitchen/profiles');
        profileImage = uploadResponse?.image?.url || profileImage;
      }

      const profileData = {
        phone: cleanPhone,
        address: formData.address,
        ...(profileImage ? { profileImage } : {}),
      };

      if (user.role === 'CUSTOMER') {
        if (isNewProfile) {
          await profileService.createCustomerProfile(profileData);
        } else {
          await profileService.updateCustomerProfile(profileData);
        }
      } else if (user.role === 'OWNER') {
        if (isNewProfile) {
          await profileService.createOwnerProfile(profileData);
        } else {
          await profileService.updateOwnerProfile(profileData);
        }
      }

      // Update profile completion status
      updateProfileStatus(true);

      if (profileImage) {
        localStorage.setItem('profileImage', profileImage);
      }
      
      // Navigate based on whether this was required
      if (requiresCompletion && location.state?.from) {
        navigate(location.state.from.pathname, { replace: true });
      } else {
        navigate('/profile');
      }
    } catch (err) {
      console.error('Profile update error:', err);
      
      // Show detailed validation errors from backend
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        setError(err.response.data.errors.join('. '));
      } else {
        setError(err.response?.data?.message || 'Failed to save profile. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--gray-100)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--primary-500)' }}></div>
          <p style={{ color: 'var(--gray-700)' }}>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gray-100)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb backTo="/profile" backText="← Back to Profile" />

        <Card className="p-8">
          {requiresCompletion && (
            <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--warning-100)', borderLeft: '4px solid var(--warning-500)' }}>
              <p style={{ color: 'var(--warning-700)' }} className="font-medium">
                ⚠️ Please complete your profile to continue
              </p>
            </div>
          )}

          <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--gray-900)' }}>
            {isNewProfile ? 'Complete Your Profile' : 'Edit Profile'}
          </h1>

          {error && (
            <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--error-100)' }}>
              <p style={{ color: 'var(--error-700)' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Profile Information */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>
                {user.role === 'CUSTOMER' ? 'Customer' : 'Business'} Information
              </h2>

              <div className="mb-5">
                <label className="block mb-2 font-medium" style={{ color: 'var(--gray-900)' }}>
                  Profile Image
                </label>
                {profileImagePreview ? (
                  <div className="relative w-28 h-28">
                    <img
                      src={profileImagePreview}
                      alt="Profile preview"
                      className="w-28 h-28 rounded-full object-cover border"
                      style={{ borderColor: 'var(--gray-500)' }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setProfileImagePreview('');
                        setProfileImageFile(null);
                      }}
                      className="absolute -top-2 -right-2 p-1 rounded-full"
                      style={{ backgroundColor: '#111827', color: '#FFFFFF' }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label
                    className="flex w-full items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer"
                    style={{ borderColor: 'var(--gray-500)', color: 'var(--gray-700)' }}
                  >
                    <ImagePlus size={18} />
                    Upload profile image
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium" style={{ color: 'var(--gray-900)' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="9876543210"
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: 'var(--gray-500)',
                      color: 'var(--gray-900)'
                    }}
                  />
                  <p className="mt-1 text-sm" style={{ color: 'var(--gray-600)' }}>
                    10-digit Indian mobile number
                  </p>
                </div>

                <div>
                  <label className="block mb-2 font-medium" style={{ color: 'var(--gray-900)' }}>
                    {user.role === 'CUSTOMER' ? 'Delivery Address' : 'Business Address'} *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="Enter your complete address (minimum 10 characters)"
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: 'var(--gray-500)',
                      color: 'var(--gray-900)'
                    }}
                  />
                  <p className="mt-1 text-sm" style={{ color: 'var(--gray-600)' }}>
                    {formData.address.length}/300 characters
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-3 rounded-lg font-semibold disabled:opacity-50"
                style={{ 
                  backgroundColor: 'var(--primary-500)', 
                  color: 'var(--white)' 
                }}
              >
                {saving ? 'Saving...' : (isNewProfile ? 'Create Profile' : 'Save Changes')}
              </button>
              {!requiresCompletion && (
                <Link
                  to="/profile"
                  className="flex-1 py-3 rounded-lg font-semibold text-center"
                  style={{
                    backgroundColor: 'var(--white)',
                    color: 'var(--gray-700)',
                    border: '2px solid var(--gray-500)'
                  }}
                >
                  Cancel
                </Link>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditProfilePage;
