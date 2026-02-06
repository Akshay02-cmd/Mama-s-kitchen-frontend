import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, DollarSign, ImagePlus, Save, X } from 'lucide-react';
// import { useAuth } from '../../hooks/shared';
import MessSidebar from '../../components/shared/MessSidebar';

const CreateMealPage = () => {
  // const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'lunch',
    dietaryType: 'veg',
    spiceLevel: 'medium',
    isAvailable: true,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Meal name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // TODO: Upload to Cloudinary
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      // TODO: Upload image to Cloudinary first, then create meal with image URL
      console.log('Creating meal:', formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Redirect back to mess dashboard
      navigate('/mess/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create meal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <MessSidebar />
      <div className="flex-1 md:ml-64 p-8">
        <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#111827' }}>
            Create New Meal
          </h1>
          <p style={{ color: '#6B7280' }}>
            Add a new meal to your menu
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-xl p-8 shadow-lg" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: '#111827' }}>
                Meal Image
              </label>
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 p-2 rounded-full"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#FFFFFF' }}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <label
                  className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-all"
                  style={{ borderColor: '#D1D5DB' }}>
                  <ImagePlus className="w-12 h-12 mb-3" style={{ color: '#9CA3AF' }} />
                  <p className="text-sm mb-1" style={{ color: '#6B7280' }}>
                    Click to upload meal image
                  </p>
                  <p className="text-xs" style={{ color: '#9CA3AF' }}>
                    PNG, JPG up to 10MB
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            {/* Meal Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                Meal Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UtensilsCrossed className="w-5 h-5" style={{ color: '#9CA3AF' }} />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Dal Tadka"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: errors.name ? '#EF4444' : '#E5E7EB', color: '#111827' }}
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
                placeholder="Describe the meal, ingredients, and taste"
                rows="4"
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all resize-none"
                style={{ borderColor: errors.description ? '#EF4444' : '#E5E7EB', color: '#111827' }}
              />
              {errors.description && <p className="mt-1 text-sm" style={{ color: '#EF4444' }}>{errors.description}</p>}
            </div>

            {/* Price and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Price (₹) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="w-5 h-5" style={{ color: '#9CA3AF' }} />
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="99"
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                    style={{ borderColor: errors.price ? '#EF4444' : '#E5E7EB', color: '#111827' }}
                  />
                </div>
                {errors.price && <p className="mt-1 text-sm" style={{ color: '#EF4444' }}>{errors.price}</p>}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#E5E7EB', color: '#111827' }}>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
            </div>

            {/* Dietary Type and Spice Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="dietaryType" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Dietary Type *
                </label>
                <select
                  id="dietaryType"
                  name="dietaryType"
                  value={formData.dietaryType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#E5E7EB', color: '#111827' }}>
                  <option value="veg">Vegetarian</option>
                  <option value="non-veg">Non-Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="eggetarian">Eggetarian</option>
                </select>
              </div>

              <div>
                <label htmlFor="spiceLevel" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Spice Level
                </label>
                <select
                  id="spiceLevel"
                  name="spiceLevel"
                  value={formData.spiceLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                  style={{ borderColor: '#E5E7EB', color: '#111827' }}>
                  <option value="mild">Mild</option>
                  <option value="medium">Medium</option>
                  <option value="hot">Hot</option>
                  <option value="extra-hot">Extra Hot</option>
                </select>
              </div>
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
              <div>
                <label htmlFor="isAvailable" className="font-medium" style={{ color: '#111827' }}>
                  Available for Orders
                </label>
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  Customers can order this meal
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="isAvailable"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
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
                onClick={() => navigate('/mess/dashboard')}
                className="flex-1 py-3 px-4 rounded-lg font-medium transition-all"
                style={{ backgroundColor: '#F3F4F6', color: '#6B7280', border: '1px solid #E5E7EB' }}>
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
                    Create Meal
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

export default CreateMealPage;
