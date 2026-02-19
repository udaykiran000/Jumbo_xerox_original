import React from "react";
import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiPhone,
  FiMail,
  FiMapPin,
  FiEye,
  FiCheckCircle,
  FiTruck,
  FiRefreshCw,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-[#0f172a] text-gray-100 overflow-hidden rounded-t-[50px] md:rounded-t-[100px]">
      {/* 1. FEATURES SECTION (From Home.jsx) */}
      <section className="py-20 border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center px-4">
          <div className="flex flex-col items-center group">
            <div className="bg-blue-600 p-8 rounded-[35px] mb-6 shadow-2xl group-hover:scale-110 transition duration-500">
              <FiCheckCircle size={40} />
            </div>
            <p className="font-black uppercase text-xs tracking-[0.3em]">
              Premium Quality
            </p>
          </div>
          <div className="flex flex-col items-center group">
            <div className="bg-emerald-500 p-8 rounded-[35px] mb-6 shadow-2xl group-hover:scale-110 transition duration-500">
              <FiTruck size={40} />
            </div>
            <p className="font-black uppercase text-xs tracking-[0.3em]">
              Free Delivery
            </p>
          </div>
          <div className="flex flex-col items-center group">
            <div className="bg-orange-500 p-8 rounded-[35px] mb-6 shadow-2xl group-hover:scale-110 transition duration-500">
              <FiRefreshCw size={40} />
            </div>
            <p className="font-black uppercase text-xs tracking-[0.3em]">
              30 Days Return
            </p>
          </div>
        </div>
      </section>

      {/* Background Animated Glows */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] animate-float"></div>
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px] animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Brand Info */}
          <div className="space-y-6">
            <h3 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent uppercase tracking-tighter">
              Jumbo Xerox
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed text-justify">
              Guntur's premier digital print destination. Whether you are a
              student or a professional, we deliver quality prints right to your
              doorstep.
            </p>
            <div className="flex gap-4">
              {[FiFacebook, FiTwitter, FiInstagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-gray-800/50 flex items-center justify-center hover:bg-blue-600 transition-all border border-gray-700 shadow-xl"
                >
                  <Icon size={20} />
                </a>
              ))}
              <a
                href="https://wa.me/919441081125"
                className="w-12 h-12 rounded-2xl bg-gray-800/50 flex items-center justify-center hover:bg-green-600 transition-all border border-gray-700 shadow-xl"
              >
                <FaWhatsapp size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8 border-l-4 border-blue-500 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              {[
                { name: "Home", path: "/" },
                { name: "Quick Prints", path: "/quick-print" },
                { name: "Business Cards", path: "/business-card" },
                { name: "Plan Printing", path: "/plan-printing" },
                { name: "Track Order", path: "/dashboard" },
              ].map((l) => (
                <li key={l.name}>
                  <Link
                    to={l.path}
                    className="hover:text-blue-400 transition-all hover:pl-2"
                  >
                    -- {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Info */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8 border-l-4 border-emerald-500 pl-3">
              Support
            </h4>
            <ul className="space-y-5 text-sm text-gray-400">
              <li className="flex items-center gap-4 group">
                <FiPhone
                  className="text-blue-400 group-hover:scale-125 transition-transform"
                  size={18}
                />{" "}
                +91 9441081125
              </li>
              <li className="flex items-center gap-4 group">
                <FiMail
                  className="text-emerald-400 group-hover:scale-125 transition-transform"
                  size={18}
                />{" "}
                info@jumboxerox.com
              </li>
              <li className="flex items-start gap-4 group">
                <FiMapPin className="text-orange-400 mt-1" size={18} />{" "}
                <span>
                  9th Line, Arundulpet,
                  <br />
                  Guntur, AP - 522001
                </span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8 border-l-4 border-purple-500 pl-3">
              Legal
            </h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              {[
                "About Us",
                "Privacy Policy",
                "Refund Policy",
                "Terms & Conditions",
              ].map((l) => (
                <li key={l}>
                  <Link
                    to="#"
                    className="hover:text-purple-400 transition-all hover:pl-2"
                  >
                    -- {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
            © 2026 New Cyber Shoppee Jumbo Xerox. All Rights Reserved.
          </p>

          <div className="flex items-center gap-3 px-6 py-3 bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl animate-pulse-glow">
            <FiEye className="text-blue-400" size={20} />
            <span className="text-gray-400 text-xs font-black uppercase">
              Visitors:
            </span>
            <strong className="text-blue-400 text-lg font-black shimmer-text">
              664
            </strong>
          </div>

          <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">
            Designed by WebnApp Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
