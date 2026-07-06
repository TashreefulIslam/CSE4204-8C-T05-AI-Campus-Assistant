import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-[#2563EB] via-blue-600 to-indigo-700 relative overflow-hidden">

      {/* Background Blur */}

      <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">

        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">

          Ready to Transform

          <br />

          Your Campus Experience?

        </h2>

        <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">

          Join thousands of students and educators using AI Campus Assistant
          to simplify learning, improve productivity, and achieve academic success.

        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link
            to="/register"
            className="bg-white text-[#2563EB] font-bold px-7 py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Get Started Free
          </Link>

          <Link
            to="/login"
            className="flex items-center gap-2 border border-white/40 text-white px-7 py-3 rounded-xl hover:bg-white/10 transition-all duration-300"
          >
            Sign In
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>

    </section>
  );
};

export default CTA;