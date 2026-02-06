import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthLayout from "../../components/shared/AuthLayout";
import FormInput from "../../components/shared/FormInput";
import Button from "../../components/shared/Button";
import SocialLoginButton from "../../components/shared/SocialLoginButton";
import Divider from "../../components/shared/Divider";
import { useAuth } from "../../hooks/shared";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
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
        // Role-based redirection
        if (response.user?.role === 'OWNER') {
          // Check if owner profile is complete
          // For now, always redirect to complete profile page (it will redirect to dashboard if already complete)
          navigate('/owner/complete-profile', { replace: true });
        } else {
          // CUSTOMER - redirect to the page they were trying to access, or home
          const redirectPath = from === "/login" ? "/" : from;
          navigate(redirectPath, { replace: true });
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        submit: error.response?.data?.message || "Login failed. Please check your credentials.",
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
