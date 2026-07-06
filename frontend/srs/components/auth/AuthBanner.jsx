import { CheckCircle2, Star } from "lucide-react";

const features = [
  "Personalized AI study assistance 24/7",
  "Smart quiz generation for any subject",
  "Intelligent deadline and study tracking",
  "Real-time performance analytics",
  "Collaborative learning tools",
];

const AuthBanner = () => {
  return (
    <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] items-center justify-center relative overflow-hidden">

      {/* Background Blur Circles */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-md px-10 text-white">

        <h2 className="text-4xl font-bold leading-tight mb-6">
          Start your AI-powered journey
        </h2>

        <p className="text-blue-100 mb-8">
          Join thousands of students and teachers using AI Campus Assistant
          to simplify academic life.
        </p>

        <div className="space-y-4 mb-10">

          {features.map((item) => (

            <div
              key={item}
              className="flex items-center gap-3"
            >

              <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center">

                <CheckCircle2
                  size={16}
                  className="text-green-400"
                />

              </div>

              <span className="text-blue-100">
                {item}
              </span>

            </div>

          ))}

        </div>

        {/* Rating Card */}

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center">

              <Star
                size={18}
                className="fill-white text-white"
              />

            </div>

            <div>

              <h3 className="font-semibold">
                4.9 / 5 Rating
              </h3>

              <p className="text-xs text-blue-200">
                Based on 3,200+ verified users
              </p>

            </div>

          </div>

          <p className="text-sm italic text-blue-100">
            "The best academic platform I've ever used. The AI assistant has
            completely changed how I study."
          </p>

        </div>

      </div>

    </div>
  );
};

export default AuthBanner;
