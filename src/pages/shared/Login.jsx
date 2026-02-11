import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthLayout from "../../components/shared/AuthLayout";
import FormInput from "../../components/shared/FormInput";
import Button from "../../components/shared/Button";
import SocialLoginButton from "../../components/shared/SocialLoginButton";
import Divider from "../../components/shared/Divider";
import { useAuth, useNotification } from "../../hooks/shared";
import * as profileService from "../../services/profile.service";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "CUSTOMER",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Get the page user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || "/";

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await login(formData);
      if (response.success) {
        showSuccess('Login successful! Welcome back.');
        
        // Check if profile is complete
        try {
          let profileResponse;
          if (response.user?.role === 'CUSTOMER') {
            profileResponse = await profileService.getCustomerProfile();
          } else if (response.user?.role === 'OWNER') {
            profileResponse = await profileService.getOwnerProfile();
          }
          
          // Profile exists, check if complete
          const profile = profileResponse?.profile;
          console.log('Profile check after login:', { 
            role: response.user?.role,
            profile: profile,
            isProfileCompleted: profile?.isProfileCompleted 
          });
          
          const isComplete = profile?.isProfileCompleted === true;
          
          if (!isComplete) {
            // Profile incomplete - redirect to complete it
            console.log('Profile incomplete, redirecting to complete profile');
            if (response.user?.role === 'OWNER') {
              navigate('/owner/complete-profile', { replace: true });
            } else {
              navigate('/profile/edit', { replace: true, state: { requiresCompletion: true } });
            }
          } else {
            // Profile complete - redirect normally
            console.log('Profile complete, redirecting to dashboard');
            if (response.user?.role === 'OWNER') {
              navigate('/owner/dashboard', { replace: true });
            } else {
              const redirectPath = from === "/login" ? "/" : from;
              navigate(redirectPath, { replace: true });
            }
          }
        } catch (profileError) {
          console.log('Profile check error:', profileError.response?.status, profileError.response?.data);
          
          // Check if it's a 404 (profile doesn't exist) or other error
          if (profileError.response?.status === 404) {
            // Profile doesn't exist - redirect to create it
            console.log('Profile not found, redirecting to create profile');
            if (response.user?.role === 'OWNER') {
              navigate('/owner/complete-profile', { replace: true });
            } else {
              navigate('/profile/edit', { replace: true, state: { requiresCompletion: true } });
            }
          } else {
            // Other errors (like 401) shouldn't happen after login, but redirect to dashboard anyway
            console.log('Error checking profile, redirecting to dashboard');
            if (response.user?.role === 'OWNER') {
              navigate('/owner/dashboard', { replace: true });
            } else {
              const redirectPath = from === "/login" ? "/" : from;
              navigate(redirectPath, { replace: true });
            }
          }
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "Login failed. Please check your credentials.";
      
      // More specific error messages
      if (error.status === 401) {
        errorMessage = error.message || "Invalid email, password, or account type. Please check and try again.";
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      showError(errorMessage);
      setErrors({
        submit: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Log in to access your Mama's Kitchen account"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          label="Email Address"
          placeholder="you@example.com"
          error={errors.email}
          icon={Mail}
          required
        />

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Account Type
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            aria-label="Select your account type"
          >
            <option value="CUSTOMER">Customer</option>
            <option value="OWNER">Mess Owner</option>
          </select>
        </div>

        <FormInput
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          label="Password"
          placeholder="Enter your password"
          error={errors.password}
          icon={Lock}
          rightIcon={showPassword ? EyeOff : Eye}
          onRightIconClick={() => setShowPassword(!showPassword)}
          required
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-orange-600 hover:text-orange-500"
          >
            Forgot password?
          </Link>
        </div>

        {errors.submit && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        <Button type="submit" isLoading={isLoading}>
          Log In
        </Button>
      </form>

      <div className="mt-6">
        <Divider text="Or continue with" />

        <div className="mt-6 grid grid-cols-2 gap-3">
          <SocialLoginButton provider="google" />
          <SocialLoginButton provider="github" />
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-orange-600 hover:text-orange-500"
        >
          Sign up for free
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
