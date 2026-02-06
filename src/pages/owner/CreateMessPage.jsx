import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, MapPin, Clock, Phone, Mail, UtensilsCrossed, Save } from 'lucide-react';
import { useAuth } from '../../hooks/shared';
import Sidebar from '../../components/shared/Sidebar';

const CreateMessPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    openingTime: '',
    closingTime: '',
    cuisineType: [],
    seatingCapacity: '',
  });
  const [errors, setErrors] = useState({});

  const cuisineOptions = [
    'North Indian',
    'South Indian',
    'Chinese',
    'Continental',
    'Punjabi',
    'Bengali',
    'Gujarati',
    'Street Food',
    'Fast Food',
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Mess name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    if (!formData.openingTime) {
      newErrors.openingTime = 'Opening time is required';
    }

    if (!formData.closingTime) {
      newErrors.closingTime = 'Closing time is required';
    }

    if (formData.cuisineType.length === 0) {
      newErrors.cuisineType = 'Select at least one cuisine type';
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
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleCuisineToggle = (cuisine) => {
    setFormData((prev) => ({
      ...prev,
      cuisineType: prev.cuisineType.includes(cuisine)
        ? prev.cuisineType.filter((c) => c !== cuisine)
        : [...prev.cuisineType, cuisine],
    }));
    setErrors((prev) => ({
      ...prev,
      cuisineType: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      // TODO: API call to create mess
      console.log('Creating mess:', formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Redirect to dashboard after success
      navigate('/owner/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create mess. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <Sidebar />
      
      <div className="flex-1 md:ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#111827' }}>
              Create New Mess
            </h1>
            <p style={{ color: '#6B7280' }}>
              Fill in the details to register your mess on the platform
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-xl p-8 shadow-lg"
            style={{ 
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB'
            }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Mess Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Mess Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Store className="w-5 h-5" style={{ color: '#9CA3AF' }} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Sunrise Mess"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                    style={{
                      borderColor: errors.name ? '#EF4444' : '#E5E7EB',
                      color: '#111827'
                    }}
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm" style={{ color: '#EF4444' }}>{errors.name}</p>}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your mess and what makes it special"
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all resize-none"
                  style={{
                    borderColor: errors.description ? '#EF4444' : '#E5E7EB',
                    color: '#111827'
                  }}
                />
                {errors.description && <p className="mt-1 text-sm" style={{ color: '#EF4444' }}>{errors.description}</p>}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Full Address *
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
                    placeholder="Complete address with area, city, and pincode"
                    rows="3"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all resize-none"
                    style={{
                      borderColor: errors.address ? '#EF4444' : '#E5E7EB',
                      color: '#111827'
                    }}
                  />
                </div>
                {errors.address && <p className="mt-1 text-sm" style={{ color: '#EF4444' }}>{errors.address}</p>}
              </div>

              {/* Phone and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                    Contact Phone *
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
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm" style={{ color: '#EF4444' }}>{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                    Contact Email *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5" style={{ color: '#9CA3AF' }} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="mess@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                      style={{
                        borderColor: errors.email ? '#EF4444' : '#E5E7EB',
                        color: '#111827'
                      }}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm" style={{ color: '#EF4444' }}>{errors.email}</p>}
                </div>
              </div>

              {/* Opening and Closing Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="openingTime" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                    Opening Time *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="w-5 h-5" style={{ color: '#9CA3AF' }} />
                    </div>
                    <input
                      type="time"
                      id="openingTime"
                      name="openingTime"
                      value={formData.openingTime}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                      style={{
                        borderColor: errors.openingTime ? '#EF4444' : '#E5E7EB',
                        color: '#111827'
                      }}
                    />
                  </div>
                  {errors.openingTime && <p className="mt-1 text-sm" style={{ color: '#EF4444' }}>{errors.openingTime}</p>}
                </div>

                <div>
                  <label htmlFor="closingTime" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                    Closing Time *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="w-5 h-5" style={{ color: '#9CA3AF' }} />
                    </div>
                    <input
                      type="time"
                      id="closingTime"
                      name="closingTime"
                      value={formData.closingTime}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                      style={{
                        borderColor: errors.closingTime ? '#EF4444' : '#E5E7EB',
                        color: '#111827'
                      }}
                    />
                  </div>
                  {errors.closingTime && <p className="mt-1 text-sm" style={{ color: '#EF4444' }}>{errors.closingTime}</p>}
                </div>
              </div>

              {/* Cuisine Type */}
              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: '#111827' }}>
                  Cuisine Types * <span className="text-sm font-normal" style={{ color: '#6B7280' }}>(Select all that apply)</span>
                </label>
                <div className="flex items-center gap-2 mb-3">
                  <UtensilsCrossed className="w-5 h-5" style={{ color: '#8B5CF6' }} />
                  <span className="text-sm" style={{ color: '#6B7280' }}>
                    {formData.cuisineType.length} selected
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {cuisineOptions.map((cuisine) => (
                    <button
                      key={cuisine}
                      type="button"
                      onClick={() => handleCuisineToggle(cuisine)}
                      className="px-4 py-3 rounded-lg border-2 font-medium transition-all text-sm"
                      style={{
                        borderColor: formData.cuisineType.includes(cuisine) ? '#8B5CF6' : '#E5E7EB',
                        backgroundColor: formData.cuisineType.includes(cuisine) ? '#F3F4F6' : '#FFFFFF',
                        color: formData.cuisineType.includes(cuisine) ? '#8B5CF6' : '#6B7280'
                      }}>
                      {cuisine}
                    </button>
                  ))}
                </div>
                {errors.cuisineType && <p className="mt-2 text-sm" style={{ color: '#EF4444' }}>{errors.cuisineType}</p>}
              </div>

              {/* Seating Capacity */}
              <div>
                <label htmlFor="seatingCapacity" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Seating Capacity <span className="text-sm font-normal" style={{ color: '#6B7280' }}>(Optional)</span>
                </label>
                <input
                  type="number"
                  id="seatingCapacity"
                  name="seatingCapacity"
                  value={formData.seatingCapacity}
                  onChange={handleChange}
                  placeholder="e.g., 50"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                  style={{
                    borderColor: '#E5E7EB',
                    color: '#111827'
                  }}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5' }}>
                  <p className="text-sm" style={{ color: '#DC2626' }}>{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/owner/dashboard')}
                  className="flex-1 py-3 px-4 rounded-lg font-medium transition-all"
                  style={{
                    backgroundColor: '#F3F4F6',
                    color: '#6B7280',
                    border: '1px solid #E5E7EB'
                  }}>
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: loading ? '#9CA3AF' : '#8B5CF6',
                    color: '#FFFFFF',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}>
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Create Mess
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMessPage;
