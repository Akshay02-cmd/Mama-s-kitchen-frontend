import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Phone, MapPin, Save, ImagePlus, X } from 'lucide-react';
import { useAuth } from '../../hooks/shared';
import * as profileService from '../../services/profile.service';
import { uploadImage } from '../../services/upload.service';

const OwnerProfileCompletePage = () => {
  const { user, updateProfileStatus } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
  });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState('');
  const [errors, setErrors] = useState({});
  const [profileExists, setProfileExists] = useState(false); // Track if profile already exists

  useEffect(() => {
    // If user is not OWNER, redirect
    if (user && user.role !== 'OWNER') {
      navigate('/');
      return;
    }

    // Check if profile already exists
    const checkProfile = async () => {
      try {
        const response = await profileService.getOwnerProfile();
        if (response.profile) {
          // Profile exists
          if (response.profile.isProfileCompleted) {
            // Profile already complete, redirect to dashboard
            navigate('/owner/dashboard');
          } else {
            // Profile exists but incomplete - load it for updating
            setProfileExists(true);
            setFormData({
              phone: response.profile.phone || '',
              address: response.profile.address || '',
            });
            setProfileImagePreview(response.profile.profileImage || '');
          }
        }
      } catch (err) {
        // Check error type
        if (err.response?.status === 401) {
          // Token expired, redirect to login
          navigate('/login');
        } else if (err.response?.status === 404) {
          // Profile doesn't exist yet, which is fine - stay on this page
          console.log('No existing profile found');
          setProfileExists(false);
        } else {
          // Other errors, redirect to login to be safe
          navigate('/login');
        }
      }
    };

    checkProfile();
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors = {};

    // Clean phone number for validation
    const cleanPhone = formData.phone.replace(/[\s\-\+\(\)]/g, '').slice(-10);

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = 'Invalid phone number (10 digits starting with 6-9)';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Business address is required';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Address must be at least 10 characters';
    } else if (formData.address.trim().length > 300) {
      newErrors.address = 'Address must not exceed 300 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
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

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      let profileImage = profileImagePreview;
      if (profileImageFile) {
        const uploadResponse = await uploadImage(profileImageFile, 'mummas-kitchen/profiles');
        profileImage = uploadResponse?.image?.url || profileImage;
      }

      // Clean phone number (remove spaces, dashes, etc., and get last 10 digits)
      const cleanPhone = formData.phone.replace(/[\s\-\+\(\)]/g, '').slice(-10);
      
      const profileData = {
        phone: cleanPhone,
        address: formData.address.trim(),
        ...(profileImage ? { profileImage } : {}),
      };

      // Use UPDATE if profile exists, CREATE if it doesn't
      if (profileExists) {
        await profileService.updateOwnerProfile(profileData);
      } else {
        await profileService.createOwnerProfile(profileData);
      }
      
      // Update profile completion status
      updateProfileStatus(true);

      if (profileImage) {
        localStorage.setItem('profileImage', profileImage);
      }
      
      // Redirect to owner dashboard
      navigate('/owner/dashboard');
    } catch (err) {
      console.error('Profile save error:', err.response?.data);
      
      // Show detailed validation errors from backend
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        setError(err.response.data.errors.join('. '));
      } else {
        setError(err.response?.data?.message || 'Failed to save profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#8B5CF6' }}>
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#111827' }}>
            Complete Your Owner Profile
          </h1>
          <p style={{ color: '#6B7280' }}>
            Please provide your business information to get started
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-xl p-8 shadow-lg"
          style={{ 
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB'
          }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                Profile Image
              </label>

              {profileImagePreview ? (
                <div className="relative w-28 h-28">
                  <img
                    src={profileImagePreview}
                    alt="Profile preview"
                    className="w-28 h-28 rounded-full object-cover border"
                    style={{ borderColor: '#E5E7EB' }}
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
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer"
                  style={{ borderColor: '#E5E7EB', color: '#6B7280' }}
                >
                  <ImagePlus className="w-5 h-5" />
                  Upload profile image
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                Phone Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="w-5 h-5" style={{ color: '#9CA3AF' }} />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                  style={{
                    borderColor: errors.phone ? '#EF4444' : '#E5E7EB',
                    color: '#111827'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#8B5CF6'}
                  onBlur={(e) => e.target.style.borderColor = errors.phone ? '#EF4444' : '#E5E7EB'}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm" style={{ color: '#EF4444' }}>{errors.phone}</p>
              )}
            </div>

            {/* Business Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                Business Address *
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MapPin className="w-5 h-5" style={{ color: '#9CA3AF' }} />
                </div>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete business address"
                  rows="4"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all resize-none"
                  style={{
                    borderColor: errors.address ? '#EF4444' : '#E5E7EB',
                    color: '#111827'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#8B5CF6'}
                  onBlur={(e) => e.target.style.borderColor = errors.address ? '#EF4444' : '#E5E7EB'}
                />
              </div>
              {errors.address && (
                <p className="mt-1 text-sm" style={{ color: '#EF4444' }}>{errors.address}</p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5' }}>
                <p className="text-sm" style={{ color: '#DC2626' }}>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
              style={{
                backgroundColor: loading ? '#9CA3AF' : '#8B5CF6',
                color: '#FFFFFF',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Saving Profile...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Complete Profile
                </>
              )}
            </button>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
          <p className="text-sm" style={{ color: '#1E40AF' }}>
            <strong>Note:</strong> This information will be used for your business profile and can be updated later from your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfileCompletePage;
