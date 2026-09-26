import { useState, useCallback } from 'react';

/**
 * useMessForm Hook
 * Manages mess creation/update form state
 * 
 * @param {Object} initialValues - Initial form values
 * @returns {Object} Form state and handlers
 */
export const useMessForm = (initialValues = {}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    openingHours: '',
    closingHours: '',
    cuisineTypes: [],
    capacity: '',
    ...initialValues
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  // Handle cuisine selection
  const toggleCuisine = useCallback((cuisine) => {
    setFormData(prev => ({
      ...prev,
      cuisineTypes: prev.cuisineTypes.includes(cuisine)
        ? prev.cuisineTypes.filter(c => c !== cuisine)
        : [...prev.cuisineTypes, cuisine]
    }));
  }, []);

  // Validate form
  const validate = useCallback(() => {
    const newErrors = {};

    if (!formData.name?.trim()) newErrors.name = 'Mess name is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';
    if (!formData.address?.trim()) newErrors.address = 'Address is required';
    if (!formData.city?.trim()) newErrors.city = 'City is required';
    if (!formData.state?.trim()) newErrors.state = 'State is required';
    if (!formData.pincode?.trim()) newErrors.pincode = 'Pincode is required';
    if (!formData.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    if (!formData.openingHours) newErrors.openingHours = 'Opening hours are required';
    if (!formData.closingHours) newErrors.closingHours = 'Closing hours are required';
    if (formData.cuisineTypes.length === 0) newErrors.cuisineTypes = 'Select at least one cuisine';
    if (!formData.capacity || formData.capacity < 1) newErrors.capacity = 'Valid capacity is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Submit handler
  const handleSubmit = useCallback(async (onSubmit) => {
    if (!validate()) return;

    try {
      setLoading(true);
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  }, [formData, validate]);

  // Reset form
  const reset = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    formData,
    errors,
    loading,
    handleChange,
    toggleCuisine,
    handleSubmit,
    setFormData,
    setErrors,
    reset
  };
};
