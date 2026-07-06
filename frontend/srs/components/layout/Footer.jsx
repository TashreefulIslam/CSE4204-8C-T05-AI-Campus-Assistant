import { Brain, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-[#0F172A] text-gray-300 pt-20 pb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo & Description */}

          <div>

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center">
                <Brain size={20} className="text-white" />
              </div>

              <div>

                <h3 className="font-bold text-white">
                  AI Campus
                </h3>

                <p className="text-[#2563EB] font-semibold">
                  Assistant
                </p>

              </div>

            </div>

            <p className="mt-5 text-sm leading-7 text-gray-400">

              AI Campus Assistant helps students,
              teachers, and administrators manage
              academic life through one intelligent platform.

            </p>

            <div className="mt-6">
              <p className="text-sm text-gray-400">Empowering education through intelligent technology.</p>
            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h4 className="text-white font-bold mb-5">
              Quick Links
            </h4>

            <div className="space-y-3">

              <Link to="/" className="block hover:text-white transition">
                Home
              </Link>

              <a href="#features" className="block hover:text-white transition">
                Features
              </a>

              <Link to="/login" className="block hover:text-white transition">
                Login
              </Link>

              <Link to="/register" className="block hover:text-white transition">
                Register
              </Link>

            </div>

          </div>

          {/* Resources */}

          <div>

            <h4 className="text-white font-bold mb-5">
              Resources
            </h4>

            <div className="space-y-3">

              <a href="#" className="block hover:text-white transition">
                Documentation
              </a>

              <a href="#" className="block hover:text-white transition">
                AI Features
              </a>

              <a href="#" className="block hover:text-white transition">
                Privacy Policy
              </a>

              <a href="#" className="block hover:text-white transition">
                Terms & Conditions
              </a>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h4 className="text-white font-bold mb-5">
              Contact
            </h4>

            <div className="space-y-4 text-sm">

              <div className="flex items-center gap-3">

                <Mail size={18} />

                <span>support@aicampus.edu</span>

              </div>

              <div className="flex items-center gap-3">

                <Phone size={18} />

                <span>+880 1234-567890</span>

              </div>

              <div className="flex items-start gap-3">

                <MapPin size={18} className="mt-1" />

                <span>
                  Khulna, Bangladesh
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-14 pt-8 border-t border-slate-700 text-center text-sm text-gray-500">

          © {new Date().getFullYear()} AI Campus Assistant.
          All Rights Reserved.

        </div>

      </div>
    </footer>
  );
};

export default Footer;