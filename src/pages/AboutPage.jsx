import { ArrowRight, Award, Clock, Heart, Utensils, Users, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmYWJmMTQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6TTEyIDE0YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6">
              <span className="px-5 py-2 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full text-amber-300 text-sm font-semibold tracking-wider">
                WELCOME TO MAMA'S KITCHEN
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                Authentic Home Cooking,
              </span>
              <br />
              <span className="text-white">Delivered Fresh</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              Experience the warmth of home-cooked meals prepared with traditional recipes and fresh ingredients. 
              We bring the authentic taste of Mama's kitchen directly to your doorstep in Nashik.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                to="/home"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-lg font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transform hover:scale-105 transition-all duration-200 shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50"
              >
                Explore Our Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Intro Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold tracking-wider">
                  OUR STORY
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
                Made With Love, <span className="text-amber-600">Served With Care</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                At Mama's Kitchen, we believe food is more than just sustenance—it's a celebration of culture, 
                tradition, and love. Every meal we prepare carries the essence of home-cooked goodness, 
                crafted using time-honored recipes passed down through generations.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Whether you're craving comfort food or exploring new flavors, we ensure every dish is 
                prepared with premium ingredients and delivered fresh to bring warmth to your table.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-amber-100 rounded-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop"
                alt="Delicious home-cooked meal"
                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold tracking-wider">
                WHY CHOOSE US
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
              What Makes Us Special
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We're committed to delivering exceptional quality, authentic taste, and memorable dining experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: ChefHat,
                title: "Expert Chefs",
                description: "Experienced home chefs who bring authentic flavors and traditional cooking techniques to every dish"
              },
              {
                icon: Heart,
                title: "Made with Love",
                description: "Every meal is prepared with care, using recipes that have been perfected over generations"
              },
              {
                icon: Award,
                title: "Premium Quality",
                description: "We source only the freshest, highest-quality ingredients to ensure exceptional taste"
              },
              {
                icon: Clock,
                title: "Fresh & Timely",
                description: "Meals prepared fresh daily and delivered on time, ensuring maximum freshness and flavor"
              },
              {
                icon: Users,
                title: "Community Focused",
                description: "Supporting local caterers and bringing communities together through great food"
              },
              {
                icon: Utensils,
                title: "Diverse Menu",
                description: "A wide variety of cuisines and dishes to satisfy every palate and preference"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 group hover:border-amber-200">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/30">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold tracking-wider">
                SIMPLE PROCESS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Getting delicious home-cooked meals is as simple as 1-2-3
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Explore Menu",
                description: "Browse through our diverse selection of authentic home-cooked meals and select your favorites"
              },
              {
                step: "02",
                title: "Choose Delivery",
                description: "Select your preferred delivery option—home delivery, pickup, or dine-in at the caterer"
              },
              {
                step: "03",
                title: "Place Order",
                description: "Complete your order with secure payment and track it in real-time"
              },
              {
                step: "04",
                title: "Enjoy Meal",
                description: "Receive your freshly prepared meal and savor the authentic taste of home cooking"
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto group-hover:scale-110 transition-all duration-300 shadow-xl shadow-amber-500/30">
                    {step.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-amber-400 to-transparent"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmYWJmMTQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6TTEyIDE0YzAtMy4zMTQgMi42ODYtNiA2LTZzNiAyLjY4NiA2IDYtMi42ODYgNi02IDYtNi0yLjY4Ni02LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
              Ready to Experience
            </span>
            <br />
            <span className="text-white">Authentic Home Cooking?</span>
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust Mama's Kitchen for delicious, 
            home-cooked meals delivered fresh to their doorstep.
          </p>
          <Link
            to="/home"
            className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-lg font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transform hover:scale-105 transition-all duration-200 shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50"
          >
            Order Your First Meal
            <ArrowRight className="ml-3 h-6 w-6" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
