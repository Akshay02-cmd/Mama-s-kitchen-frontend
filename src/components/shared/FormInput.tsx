const FormInput = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  label,
  error,
  icon: Icon,
  rightIcon: RightIcon,
  onRightIconClick,
  required = false,
  className = "",
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-bold uppercase tracking-wider mb-3"
          style={{ color: 'var(--gray-700)' }}
        >
          {label}
          {required && <span className="ml-1" style={{ color: 'var(--error)' }}>*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon className="h-5 w-5" style={{ color: 'var(--gray-400)' }} />
          </div>
        )}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`block w-full ${Icon ? 'pl-12' : 'pl-4'} ${
            RightIcon ? 'pr-12' : 'pr-4'
          } py-4 border-2 rounded-xl transition-all duration-300 ${
            error ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-primary-500'
          } focus:ring-4 focus:ring-primary-500/20 focus:outline-none ${className}`}
          style={{
            color: 'var(--gray-900)',
            backgroundColor: 'var(--white)'
          }}
          placeholder={placeholder}
          required={required}
        />
        {RightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            <RightIcon className="h-5 w-5 transition-colors" style={{ color: 'var(--gray-400)' }} />
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-sm font-medium" style={{ color: 'var(--error)' }}>{error}</p>}
    </div>
  );
};

export default FormInput;
