import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <main className="flex-1">
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-amber-50 to-orange-100 overflow-hidden h-fit">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
              alt="Delicious food spread"
              className="w-full h-full object-cover opacity-10"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-48">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Fresh Meals
                <span className="text-amber-600"> Delivered</span>
                <br />
                To Your Door
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Experience the convenience of restaurant-quality meals prepared
                by local caterers and delivered fresh to your location anywhere
                in<span className="font-bold text-amber-600"> Nashik</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  className="inline-flex items-center px-8 py-4 bg-amber-500 text-white text-lg font-semibold rounded-lg hover:bg-amber-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  href="/meals"
                >
                  Explore Meals
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a
                  className="inline-flex items-center px-8 py-4 bg-white text-amber-600 text-lg font-semibold rounded-lg border-2 border-amber-200 hover:bg-amber-50 transition-all duration-200"
                  href="/contact"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Getting delicious meals delivered is simple with our streamlined
                process
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto group-hover:bg-amber-600 transition-colors duration-200">
                    01
                  </div>
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -translate-x-8"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Explore Caterers &amp; Meals
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Browse a curated list of home-based and local caterers. View
                  their menus, ratings, and available meal options.
                </p>
              </div>
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto group-hover:bg-amber-600 transition-colors duration-200">
                    02
                  </div>
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -translate-x-8"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Select Your Meal &amp; Access Mode
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Choose your meal and decide how you want it — delivered to
                  your home, picked up by you, or dine-in (if the caterer
                  supports it).
                </p>
              </div>
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto group-hover:bg-amber-600 transition-colors duration-200">
                    03
                  </div>
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -translate-x-8"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Place Your Order &amp; Pay
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Add items to your cart, select your preferred time slot, and
                  pay online or opt for Cash on Delivery.
                </p>
              </div>
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto group-hover:bg-amber-600 transition-colors duration-200">
                    04
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Enjoy Your Meal Your Way
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Relax at home, stop by and pick up, or dine in — your meal,
                  your choice. Don&apos;t forget to leave a review!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Services We Offer
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From daily meals to special events, we&apos;ve got all your
                catering needs covered
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-clock h-6 w-6 text-white"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Daily Tiffin Services
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Fresh home-style meals delivered daily to your doorstep
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-users h-6 w-6 text-white"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Corporate Catering
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Professional catering solutions for your business events
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="bg-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-stethoscope h-6 w-6 text-white"
                  >
                    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
                    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
                    <circle cx="20" cy="10" r="2"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Hospital Tiffin Support
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Nutritious, easy-to-digest meals delivered to patients
                  admitted in hospitals.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="bg-red-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chef-hat h-6 w-6 text-white"
                  >
                    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path>
                    <line x1="6" x2="18" y1="17" y2="17"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Custom-Made Tiffins
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Personalized meals tailored to your taste, dietary, or portion
                  requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our Customers Say
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Don&apos;t just take our word for it - hear from our satisfied
                customers
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-star h-5 w-5 text-yellow-400 fill-current"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  &quot;CaterHub has transformed my daily lunch routine. The
                  food is always fresh and delicious!&quot;
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                    alt="Sarah Johnson"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Sarah Johnson
                    </h4>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-star h-5 w-5 text-yellow-400 fill-current"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  &quot;Perfect for our office catering needs. Professional
                  service and amazing food quality.&quot;
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                    alt="Michael Chen"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Michael Chen
                    </h4>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-star h-5 w-5 text-yellow-400 fill-current"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  &quot;The diet meals helped me achieve my health goals without
                  compromising on taste.&quot;
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                    alt="Emily Rodriguez"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Emily Rodriguez
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-linear-to-r from-amber-500 to-orange-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Food Journey?
            </h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust CaterHub for their
              daily meals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                className="inline-flex items-center px-8 py-4 bg-white text-amber-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
                href="/meals"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-check-circle mr-2 h-5 w-5"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <path d="m9 11 3 3L22 4"></path>
                </svg>
                Join Now
              </a>
              <a
                className="inline-flex items-center px-8 py-4 bg-transparent text-white text-lg font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-amber-600 transition-all duration-200"
                href="/contact"
              >
                Become a Caterer
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
