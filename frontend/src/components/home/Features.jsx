import features from "../../data/features";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="text-center max-w-3xl mx-auto">

          <span className="text-[#2563EB] font-bold uppercase tracking-wider">
            Features
          </span>

          <h2 className="mt-3 text-4xl font-bold text-[#1F2937]">
            AI-Powered Features
            <br />
            for Modern Education
          </h2>

          <p className="mt-5 text-lg text-gray-500">
            Everything students and teachers need in one intelligent campus
            platform.
          </p>

        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
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

export default Features;