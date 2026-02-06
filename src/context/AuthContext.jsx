import { createContext, useState } from 'react';
import * as authService from '../services/auth.service';
import * as profileService from '../services/profile.service';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize state from localStorage
    return authService.getStoredUser();
  });
  const [loading, setLoading] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(false);

  // Function to check profile completion - called only when needed (e.g., before checkout)
  const checkProfileCompletion = async () => {
    if (!user) {
      setProfileComplete(false);
      return false;
    }

    try {
      setCheckingProfile(true);
      let profile;
      
      // Fetch profile based on user role
      if (user.role === 'CUSTOMER') {
        const response = await profileService.getCustomerProfile();
        profile = response.profile;
      } else if (user.role === 'OWNER') {
        const response = await profileService.getOwnerProfile();
        profile = response.profile;
      }

      // Check if profile has required fields
      if (profile) {
        const hasRequiredFields = profile.phone && profile.address;
        setProfileComplete(hasRequiredFields);
        return hasRequiredFields;
      } else {
        setProfileComplete(false);
        return false;
      }
    } catch (error) {
      // Profile doesn't exist yet - user needs to complete it
      console.log('Profile not found - needs completion');
      setProfileComplete(false);
      return false;
    } finally {
      setCheckingProfile(false);
    }
  };

  const register = async (userData) => {
    const response = await authService.register(userData);
    if (response.success && response.user) {
      setUser(response.user);
    }
    return response;
  };

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    if (response.success && response.user) {
      setUser(response.user);
    }
    return response;
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setProfileComplete(false);
    } catch (error) {
      // Even if API call fails, clear local state
      setUser(null);
      setProfileComplete(false);
      throw error;
    }
  };

  const updateProfileStatus = (isComplete) => {
    setProfileComplete(isComplete);
  };

  const value = {
    user,
    loading: loading || checkingProfile,
    profileComplete,
    checkProfileCompletion,
    register,
    login,
    logout,
    updateProfileStatus,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
