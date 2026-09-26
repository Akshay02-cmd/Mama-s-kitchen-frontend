import { useState, useEffect, useCallback } from 'react';
import { getCustomerProfile, updateCustomerProfile } from '../../services/profile.service';
import { useAuth } from '../shared/useAuth';

/**
 * useProfile Hook
 * Manages customer profile data
 * 
 * @returns {Object} Profile data, loading state, and update function
 */
export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Fetch profile
  const fetchProfile = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getCustomerProfile();
      setProfile(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch profile');
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Update profile
  const updateProfile = useCallback(async (updates) => {
    try {
      setUpdating(true);
      setError(null);
      const updatedProfile = await updateCustomerProfile(updates);
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      setError(err.message || 'Failed to update profile');
      console.error('Error updating profile:', err);
      throw err;
    } finally {
      setUpdating(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    loading,
    error,
    updating,
    updateProfile,
    refetch: fetchProfile
  };
};
