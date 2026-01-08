const AboutIntro = () => {
  return (
    <section className="w-full bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        
        {/* Decorative element */}
        <div className="inline-block mb-4 px-5 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
          Our Story
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 leading-tight">
          What is Mama's Kitchen?
        </h2>
        
        <div className="w-20 h-1 bg-orange-500 mx-auto mb-8 rounded-full"></div>

        <p className="text-gray-700 text-xl max-w-4xl mx-auto leading-relaxed mb-8">
          Mama's Kitchen is a home-food platform created to bring nutritious,
          hygienic, and affordable meals to students, professionals, and families.
        </p>
        
        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed italic">
          We believe food should feel like home — warm, comforting, and honest.
        </p>
        
        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
          <div className="p-4">
            <div className="text-4xl font-bold text-orange-600 mb-2">100+</div>
            <div className="text-gray-600 text-sm">Happy Customers</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
            <div className="text-gray-600 text-sm">Menu Items</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-orange-600 mb-2">5★</div>
            <div className="text-gray-600 text-sm">Average Rating</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600 text-sm">Support</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutIntro;
