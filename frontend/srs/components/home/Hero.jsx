import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

import HeroImage from "./HeroImage";

const Hero = () => {
  return (
    <section className="pt-16 min-h-screen flex items-center relative overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-amber-50/20"></div>

      <div className="absolute top-20 right-10 w-80 h-80 bg-[#2563EB]/8 rounded-full blur-3xl"></div>

      <div className="absolute bottom-10 left-0 w-64 h-64 bg-[#F59E0B]/8 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12 items-center relative">

        {/* Left Side */}

        <div>

          <div className="inline-flex items-center gap-2 bg-blue-100 text-[#2563EB] text-xs font-bold px-3 py-1.5 rounded-full mb-6">

            <Zap size={12} />

            AI-Powered University Platform

          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-[#1F2937] leading-tight mb-5">

            Your AI-Powered

            <br />

            <span className="text-[#2563EB]">
              Campus Companion
            </span>

          </h1>

          <p className="text-lg text-[#6B7280] mb-8 leading-relaxed max-w-lg">

            Manage academics, plan studies, generate quizzes, and get instant AI assistance — all in one intelligent platform.

          </p>

          <div className="flex flex-wrap gap-3">

            <Link
              to="/register"
              className="flex items-center gap-2 bg-[#2563EB] text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
            >
              Get Started

              <ArrowRight size={16} />

            </Link>

            <Link
              to="/login"
              className="flex items-center gap-2 border border-gray-200 bg-white px-6 py-3 rounded-xl font-semibold hover:border-[#2563EB] hover:text-[#2563EB] transition"
            >
              Learn More
            </Link>

          </div>

          {/* Students */}

          <div className="mt-10 flex items-center gap-4">

            <div className="flex -space-x-2">

              {[
                ["bg-blue-400", "A"],
                ["bg-emerald-400", "B"],
                ["bg-amber-400", "C"],
                ["bg-purple-400", "D"],
              ].map(([color, letter]) => (
                <div
                  key={letter}
                  className={`w-8 h-8 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                >
                  {letter}
                </div>
              ))}

            </div>

            <p className="text-sm text-gray-500">
              <span className="font-bold text-[#1F2937]">
                10,000+
              </span>{" "}
              students already enrolled
            </p>

          </div>

        </div>

        {/* Right Side */}

        <HeroImage />

      </div>

    </section>
  );
};

export default Hero;