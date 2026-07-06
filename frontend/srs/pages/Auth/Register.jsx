import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

import RegisterForm from "../../components/auth/RegisterForm";
import AuthBanner from "../../components/auth/AuthBanner";

const Register = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">

      {/* Left Side */}
      <div className="flex-1 flex justify-center items-center px-6 py-10">

        <div className="w-full max-w-md">

          {/* Logo */}

          <Link
            to="/"
            className="inline-flex items-center gap-3 mb-10"
          >
            <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center">
              <Brain size={20} className="text-white" />
            </div>

            <div>
              <h2 className="font-bold text-gray-800 leading-none">
                AI Campus
              </h2>

              <p className="text-[#2563EB] font-semibold">
                Assistant
              </p>
            </div>

          </Link>

          <RegisterForm />

        </div>

      </div>

      {/* Right Side */}

      <AuthBanner />

    </div>
  );
};

export default Register;
