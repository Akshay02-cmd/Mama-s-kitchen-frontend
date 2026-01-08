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
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`block w-full ${Icon ? 'pl-10' : 'pl-3'} ${
            RightIcon ? 'pr-10' : 'pr-3'
          } py-3 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition ${className}`}
          placeholder={placeholder}
          required={required}
        />
        {RightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <RightIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
