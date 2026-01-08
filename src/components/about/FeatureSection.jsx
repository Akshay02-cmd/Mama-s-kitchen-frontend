import FeatureCard from "./FeatureCard";

const FEATURES = [
  {
    icon: "🏠",
    title: "Home-Style Cooking",
    description:
      "Meals prepared with traditional recipes, just like homemade food.",
  },
  {
    icon: "✨",
    title: "Fresh & Hygienic",
    description:
      "Prepared daily using fresh ingredients with strict hygiene standards.",
  },
  {
    icon: "💰",
    title: "Affordable Pricing",
    description:
      "Quality meals at student-friendly and family-friendly prices.",
  },
];

const FeatureSection = () => {
  return (
    <section className="w-full bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-24 relative">
        
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-5 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
            Our Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Why Choose Mama's Kitchen?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover what makes our home-cooked meals special and why families trust us
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeatureSection;
