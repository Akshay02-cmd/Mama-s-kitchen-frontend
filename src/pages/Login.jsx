import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import FormInput from "../components/auth/FormInput";
import Button from "../components/auth/Button";
import SocialLoginButton from "../components/auth/SocialLoginButton";
import Divider from "../components/auth/Divider";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "CUSTOMER",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

    // Simulate API call
    setTimeout(() => {
      console.log("Login data:", formData);
      setIsLoading(false);
      // navigate("/"); // Uncomment to redirect after login
    }, 1500);
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
