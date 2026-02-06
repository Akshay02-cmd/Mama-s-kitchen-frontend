import { useState, useCallback } from 'react';

/**
 * useMealForm Hook
 * Manages meal creation/update form state
 * 
 * @param {Object} initialValues - Initial form values
 * @returns {Object} Form state and handlers
 */
export const useMealForm = (initialValues = {}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    cuisine: '',
    dietaryType: 'non-veg',
    spiceLevel: 'medium',
    preparationTime: '',
    servingSize: '1',
    ingredients: '',
    allergens: '',
    isAvailable: true,
    ...initialValues
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialValues.image || null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  // Handle image upload
  const handleImageChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Validate form
  const validate = useCallback(() => {
    const newErrors = {};

    if (!formData.name?.trim()) newErrors.name = 'Meal name is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.category?.trim()) newErrors.category = 'Category is required';
    if (!formData.cuisine?.trim()) newErrors.cuisine = 'Cuisine is required';
    if (!formData.preparationTime || formData.preparationTime <= 0) {
      newErrors.preparationTime = 'Valid preparation time is required';
    }
    if (!imageFile && !imagePreview) newErrors.image = 'Meal image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, imageFile, imagePreview]);

  // Submit handler
  const handleSubmit = useCallback(async (onSubmit) => {
    if (!validate()) return;

    try {
      setLoading(true);
      const submitData = { ...formData, imageFile };
      await onSubmit(submitData);
    } finally {
      setLoading(false);
    }
  }, [formData, imageFile, validate]);

  // Reset form
  const reset = useCallback(() => {
    setFormData(initialValues);
    setImageFile(null);
    setImagePreview(initialValues.image || null);
    setErrors({});
  }, [initialValues]);

  return {
    formData,
    imageFile,
    imagePreview,
    errors,
    loading,
    handleChange,
    handleImageChange,
    handleSubmit,
    setFormData,
    setErrors,
    reset
  };
};
