import StepCard from "./StepCard";

const STEPS = [
  {
    step: "01",
    icon: "📱",
    title: "Browse the Menu",
    description:
      "Explore freshly prepared home-style meals available for the day.",
  },
  {
    step: "02",
    icon: "🛒",
    title: "Place Your Order",
    description:
      "Select your favorite dishes and place the order in just a few clicks.",
  },
  {
    step: "03",
    icon: "🍽️",
    title: "Enjoy Your Meal",
    description:
      "Get your food delivered hot and fresh, just like home.",
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full bg-linear-to-b from-gray-50 to-white relative">
      {/* Dotted background pattern */}
      <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
      
      <div className="max-w-7xl mx-auto px-6 py-24 relative">

        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-5 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Getting your favorite home-cooked meals is as easy as 1-2-3
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-1 bg-linear-to-r from-orange-200 via-orange-400 to-orange-200 -z-10"></div>
          
          {STEPS.map((step, index) => (
            <StepCard
              key={index}
              step={step.step}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
