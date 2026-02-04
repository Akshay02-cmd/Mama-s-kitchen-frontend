const Button = ({
  type = "button",
  onClick,
  disabled = false,
  isLoading = false,
  children,
  variant = "primary",
  className = "",
  fullWidth = true,
}) => {
  const baseClasses = "font-bold py-4 px-6 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95";
  
  const variants = {
    primary: "text-white shadow-xl hover:shadow-2xl",
    secondary: "border-2 border-gray-300 bg-white hover:bg-gray-50 shadow-md hover:shadow-lg",
    outline: "border-3 text-white hover:bg-primary-50 shadow-md hover:shadow-lg",
  };

  const getStyle = () => {
    if (variant === 'primary') {
      return {
        background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%)',
        color: 'var(--white)'
      };
    } else if (variant === 'secondary') {
      return {
        borderColor: 'var(--gray-300)',
        color: 'var(--gray-700)'
      };
    } else {
      return {
        borderColor: 'var(--primary-600)',
        color: 'var(--primary-600)'
      };
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variants[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      style={getStyle()}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
