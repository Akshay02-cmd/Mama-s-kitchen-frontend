const CallToAction = () => {
  return (
    <section className="relative w-full bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-24 text-center text-white">

        {/* Emoji decoration */}
        <div className="text-6xl mb-6 animate-bounce">
          🍳
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Taste Home?
        </h2>
        
        <div className="w-24 h-1 bg-yellow-300 mx-auto mb-8 rounded-full"></div>

        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Join Mama's Kitchen today and enjoy delicious, homemade meals
          prepared with love and care.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-orange-600 font-bold px-10 py-4 rounded-full hover:bg-gray-100 hover:scale-105 transform transition-all duration-300 shadow-2xl">
            🍽️ Explore Menu
          </button>

          <button className="border-2 border-white px-10 py-4 rounded-full hover:bg-white hover:text-orange-600 hover:scale-105 transform transition-all duration-300 backdrop-blur-sm font-semibold">
            Get Started →
          </button>
        </div>
        
        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>100% Fresh</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Hygienic</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Affordable</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            <span>Fast Delivery</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CallToAction;
