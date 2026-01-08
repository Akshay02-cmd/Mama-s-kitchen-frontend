import HeroSection from "../components/about/HeroSection";
import AboutIntro from "../components/about/AboutIntro";
import FeatureSection from "../components/about/FeatureSection";
import HowItWorks from "../components/about/HowItWokrs";
import CallToAction from "../components/about/CallToAction";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <AboutIntro />
      <FeatureSection />
      <HowItWorks />
      <CallToAction />
    </main>
  );
};

export default AboutPage;
