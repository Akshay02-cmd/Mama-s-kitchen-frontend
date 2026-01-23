import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import FormInput from "../components/auth/FormInput";
import Button from "../components/auth/Button";
import SocialLoginButton from "../components/auth/SocialLoginButton";
import Divider from "../components/auth/Divider";

const Signup = () => {
  //   const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "CUSTOMER",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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

    // Prepare data for API (exclude confirmPassword)
    const apiData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    // Simulate API call
    setTimeout(() => {
      console.log("Signup data:", apiData);
      setIsLoading(false);
      // navigate("/login"); // Uncomment to redirect after signup
    }, 1500);
  };

  return (
    <AuthLayout
      title="Join Mama's Kitchen"
      subtitle="Create your account and start enjoying homemade meals"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          label="Full Name"
          placeholder="John Doe"
          error={errors.name}
          icon={User}
          required
        />

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
            I am a
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
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
          placeholder="Create a strong password"
          error={errors.password}
          icon={Lock}
          rightIcon={showPassword ? EyeOff : Eye}
          onRightIconClick={() => setShowPassword(!showPassword)}
          required
        />

        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          placeholder="Confirm your password"
          error={errors.confirmPassword}
          icon={Lock}
          rightIcon={showConfirmPassword ? EyeOff : Eye}
          onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
          required
        />

        <div>
          <div className="flex items-start">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded mt-1"
            />
            <label
              htmlFor="agreeToTerms"
              className="ml-2 block text-sm text-gray-700"
            >
              I agree to the{" "}
              <Link
                to="/terms"
                className="text-orange-600 hover:text-orange-500"
              >
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-orange-600 hover:text-orange-500"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms}</p>
          )}
        </div>

        <Button type="submit" isLoading={isLoading}>
          Create Account
        </Button>
      </form>

      <div className="mt-6">
        <Divider text="Or sign up with" />

        <div className="mt-6 grid grid-cols-2 gap-3">
          <SocialLoginButton provider="google" />
          <SocialLoginButton provider="github" />
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-orange-600 hover:text-orange-500"
        >
          Log in here
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;
