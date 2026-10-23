import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

import Logo from "./Logo";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        <Logo />

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-[#2563EB] transition">
            Home
          </a>

          <a href="#" className="text-sm font-medium text-gray-600 hover:text-[#2563EB] transition">
            Features
          </a>

          <a href="#" className="text-sm font-medium text-gray-600 hover:text-[#2563EB] transition">
            About
          </a>

          <a href="#" className="text-sm font-medium text-gray-600 hover:text-[#2563EB] transition">
            Contact
          </a>
        </div>

        {/* Desktop Buttons */}

        <div className="hidden md:flex items-center gap-2">

          <Link
            to="/login"
            className="text-sm font-semibold text-[#2563EB] px-4 py-2 rounded-xl hover:bg-blue-50 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="text-sm font-bold text-white bg-[#2563EB] px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow-md shadow-blue-500/25"
          >
            Register
          </Link>

        </div>

        {/* Mobile Button */}

        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>

      {/* Mobile Menu */}

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3">

          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">About</a>
          <a href="#">Contact</a>

          <div className="flex gap-2 pt-2 border-t">

            <Link
              to="/login"
              className="flex-1 text-center border border-blue-200 rounded-xl py-2 text-[#2563EB]"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="flex-1 text-center rounded-xl py-2 bg-[#2563EB] text-white"
            >
              Register
            </Link>

          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;