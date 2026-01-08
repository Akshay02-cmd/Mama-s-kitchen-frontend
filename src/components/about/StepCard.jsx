const StepCard = ({ step, title, description, icon }) => {
  return (
    <div className="group relative bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">

      {/* Step number with gradient background */}
      <div className="relative inline-block mb-6">
        <div className="absolute inset-0 bg-linear-to-br from-orange-400 to-red-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
        <div className="relative w-20 h-20 bg-linear-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-3xl font-extrabold shadow-lg group-hover:scale-110 transition-transform">
          {step}
        </div>
      </div>
      
      {/* Icon */}
      {icon && (
        <div className="text-4xl mb-4">
          {icon}
        </div>
      )}

      <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-orange-600 transition-colors">
        {title}
      </h3>

      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
      
      {/* Arrow indicator */}
      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-orange-400 text-3xl hidden md:block group-hover:translate-x-1 transition-transform">
        →
      </div>

    </div>
  );
};

export default StepCard;
