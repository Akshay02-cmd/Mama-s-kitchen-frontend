const HeroSection = () => {
  return (
    <section className="relative w-full bg-linear-to-br from-orange-500 via-orange-600 to-red-600 text-white overflow-hidden">
      {/* Animated background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-36 text-center">
        {/* Animated badge */}
        <div className="inline-block mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium animate-fade-in">
          🍳 Fresh • Homemade • Delicious
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in-up">
          Mama's Kitchen
        </h1>
        
        <div className="w-24 h-1 bg-yellow-300 mx-auto mb-8 rounded-full"></div>

        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          Home-style food made with love, delivered fresh to your doorstep.
          Experience the taste of homemade meals, just like mama makes.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <button className="bg-white text-orange-600 font-semibold px-10 py-4 rounded-full hover:bg-gray-100 hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl">
            🍽️ Explore Menu
          </button>

          <button className="border-2 border-white px-10 py-4 rounded-full hover:bg-white hover:text-orange-600 hover:scale-105 transform transition-all duration-300 backdrop-blur-sm">
            Learn More →
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
