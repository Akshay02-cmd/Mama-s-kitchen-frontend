import { createContext, useState, useEffect } from 'react';
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
  const [checkingProfile, setCheckingProfile] = useState(true);

  // Check profile completion status when user is authenticated
  useEffect(() => {
    const checkProfileStatus = async () => {
      if (!user) {
        setProfileComplete(false);
        setCheckingProfile(false);
        return;
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
        } else {
          setProfileComplete(false);
        }
      } catch (error) {
        // Profile doesn't exist yet or API error
        // Don't logout user, just mark profile as incomplete
        console.log('Profile check failed:', error.message || 'Profile not found');
        setProfileComplete(false);
        
        // If the error is an authentication error (token invalid), clear user state
        const isAuthError = error.message?.toLowerCase().includes('token') || 
                           error.message?.toLowerCase().includes('authentication');
        if (isAuthError) {
          setUser(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } finally {
        setCheckingProfile(false);
      }
    };

    checkProfileStatus();
  }, [user]);

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
    } catch (error) {
      // Even if API call fails, clear local state
      setUser(null);
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
    register,
    login,
    logout,
    updateProfileStatus,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
