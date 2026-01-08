const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="group relative rounded-3xl border border-gray-200 p-8 text-center hover:shadow-2xl hover:border-orange-300 transition-all duration-300 bg-white hover:-translate-y-2">
      
      {/* Icon background */}
      <div className="w-16 h-16 mx-auto mb-6 bg-linear-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-3xl transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-orange-600 transition-colors">
        {title}
      </h3>

      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
      
      {/* Decorative gradient on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-orange-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>

    </div>
  );
};

export default FeatureCard;
