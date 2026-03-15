import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, DollarSign, ImagePlus, Save, X, Plus, Trash2, Package } from 'lucide-react';
import MessSidebar from '../../components/shared/MessSidebar';
import { createMeal } from '../../services/meal.service';

const CreateMealPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    mealType: 'lunch',
    is_Veg: true,
    is_Available: true,
  });
  const [extras, setExtras] = useState([]);
  const [newExtra, setNewExtra] = useState({ name: '', price: '' });
  const [errors, setErrors] = useState({});

  // Extras helpers
  const addExtra = () => {
    if (!newExtra.name.trim()) return;
    if (!newExtra.price || Number(newExtra.price) < 0) return;
    setExtras((prev) => [
      ...prev,
      { name: newExtra.name.trim(), price: Number(newExtra.price), is_Available: true },
    ]);
    setNewExtra({ name: '', price: '' });
  };

  const removeExtra = (idx) => setExtras((prev) => prev.filter((_, i) => i !== idx));

  const toggleExtraAvailability = (idx) =>
    setExtras((prev) =>
      prev.map((e, i) => (i === idx ? { ...e, is_Available: !e.is_Available } : e))
    );

  // Form helpers
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Meal name is required';
    if (!formData.description.trim() || formData.description.trim().length < 10)
      newErrors.description = 'Description must be at least 10 characters';
    if (!formData.price) newErrors.price = 'Price is required';
    else if (Number(formData.price) <= 0) newErrors.price = 'Price must be greater than 0';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError(null);
    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        mealType: formData.mealType,
        is_Veg: formData.is_Veg === true || formData.is_Veg === 'true',
        is_Available: formData.is_Available,
        extras,
      };
      await createMeal(payload);
      navigate('/mess/dashboard');
    } catch (err) {
      setError(err.message || err.response?.data?.message || 'Failed to create meal. Please try again.');
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
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#111827' }}>Create New Meal</h1>
            <p style={{ color: '#6B7280' }}>Add a new meal with optional extras to your menu</p>
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
                    <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
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
                    className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-all"
                    style={{ borderColor: '#D1D5DB' }}>
                    <ImagePlus className="w-10 h-10 mb-2" style={{ color: '#9CA3AF' }} />
                    <p className="text-sm mb-1" style={{ color: '#6B7280' }}>Click to upload meal image</p>
                    <p className="text-xs" style={{ color: '#9CA3AF' }}>PNG, JPG up to 10MB</p>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
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
                    type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                    placeholder="e.g., Dal Tadka"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                    style={{ borderColor: errors.name ? '#EF4444' : '#E5E7EB', color: '#111827' }} />
                </div>
                {errors.name && <p className="mt-1 text-sm" style={{ color: '#EF4444' }}>{errors.name}</p>}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                  Description *
                </label>
                <textarea
                  id="description" name="description" value={formData.description} onChange={handleChange}
                  placeholder="Describe the meal, ingredients, and taste"
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all resize-none"
                  style={{ borderColor: errors.description ? '#EF4444' : '#E5E7EB', color: '#111827' }} />
                {errors.description && <p className="mt-1 text-sm" style={{ color: '#EF4444' }}>{errors.description}</p>}
              </div>

              {/* Price + Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                    Base Price (Rs) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="w-5 h-5" style={{ color: '#9CA3AF' }} />
                    </div>
                    <input
                      type="number" id="price" name="price" value={formData.price} onChange={handleChange}
                      placeholder="99" min="0" step="1"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                      style={{ borderColor: errors.price ? '#EF4444' : '#E5E7EB', color: '#111827' }} />
                  </div>
                  {errors.price && <p className="mt-1 text-sm" style={{ color: '#EF4444' }}>{errors.price}</p>}
                </div>

                <div>
                  <label htmlFor="mealType" className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                    Meal Type *
                  </label>
                  <select
                    id="mealType" name="mealType" value={formData.mealType} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                    style={{ borderColor: '#E5E7EB', color: '#111827' }}>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </select>
                </div>
              </div>

              {/* Veg / Availability */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#111827' }}>
                    Dietary Type *
                  </label>
                  <div className="flex gap-3">
                    {[{ val: true, label: 'Vegetarian' }, { val: false, label: 'Non-Veg' }].map(({ val, label }) => (
                      <button
                        key={String(val)} type="button"
                        onClick={() => setFormData((p) => ({ ...p, is_Veg: val }))}
                        className="flex-1 py-3 rounded-lg text-sm font-medium transition-all"
                        style={{
                          backgroundColor: formData.is_Veg === val ? (val ? '#DCFCE7' : '#FEE2E2') : '#F9FAFB',
                          color: formData.is_Veg === val ? (val ? '#15803D' : '#DC2626') : '#6B7280',
                          border: `1.5px solid ${formData.is_Veg === val ? (val ? '#86EFAC' : '#FCA5A5') : '#E5E7EB'}`,
                        }}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                  <div>
                    <p className="font-medium text-sm" style={{ color: '#111827' }}>Available for Orders</p>
                    <p className="text-xs" style={{ color: '#6B7280' }}>Customers can order this meal</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox" name="is_Available" checked={formData.is_Available}
                      onChange={handleChange} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>

              {/* Extras section */}
              <div
                className="rounded-xl p-5"
                style={{ backgroundColor: '#FFF7ED', border: '1px solid #FED7AA' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5" style={{ color: '#C2410C' }} />
                  <h3 className="font-semibold" style={{ color: '#C2410C' }}>Extras</h3>
                  <span className="text-xs ml-auto" style={{ color: '#9A3412' }}>
                    Papad, pickle, extras, etc.
                  </span>
                </div>

                {/* Existing extras list */}
                {extras.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {extras.map((extra, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between px-3 py-2.5 rounded-lg"
                        style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium" style={{ color: '#111827' }}>{extra.name}</span>
                          <span className="text-sm" style={{ color: '#6B7280' }}>Rs {extra.price}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleExtraAvailability(idx)}
                            className="px-2 py-0.5 rounded-full text-xs font-medium transition-all"
                            style={{
                              backgroundColor: extra.is_Available ? '#DCFCE7' : '#F3F4F6',
                              color: extra.is_Available ? '#15803D' : '#6B7280',
                            }}>
                            {extra.is_Available ? 'Available' : 'Hidden'}
                          </button>
                          <button
                            type="button" onClick={() => removeExtra(idx)}
                            className="p-1 rounded hover:bg-red-50 transition-all"
                            style={{ color: '#EF4444' }}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new extra */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newExtra.name}
                    onChange={(e) => setNewExtra((p) => ({ ...p, name: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addExtra())}
                    placeholder="Extra name (e.g., Papad)"
                    className="flex-1 px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: '#E5E7EB', color: '#111827', backgroundColor: '#FFFFFF' }} />
                  <input
                    type="number"
                    value={newExtra.price}
                    onChange={(e) => setNewExtra((p) => ({ ...p, price: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addExtra())}
                    placeholder="Rs Price"
                    min="0" step="1"
                    className="w-28 px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: '#E5E7EB', color: '#111827', backgroundColor: '#FFFFFF' }} />
                  <button
                    type="button" onClick={addExtra}
                    className="px-4 py-2.5 rounded-lg font-medium text-sm flex items-center gap-1 transition-all hover:opacity-90"
                    style={{ backgroundColor: '#C2410C', color: '#FFFFFF' }}>
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
                <p className="text-xs mt-2" style={{ color: '#9A3412' }}>
                  Press Enter or click Add to insert. Toggle availability per extra.
                </p>
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
                  type="button" onClick={() => navigate('/mess/dashboard')}
                  className="flex-1 py-3 px-4 rounded-lg font-medium transition-all"
                  style={{ backgroundColor: '#F3F4F6', color: '#6B7280', border: '1px solid #E5E7EB' }}>
                  Cancel
                </button>
                <button
                  type="submit" disabled={loading}
                  className="flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                  style={{ backgroundColor: loading ? '#9CA3AF' : '#8B5CF6', color: '#FFFFFF', cursor: loading ? 'not-allowed' : 'pointer' }}>
                  {loading ? (
                    <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>Creating...</>
                  ) : (
                    <><Save className="w-5 h-5" />Create Meal</>
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
