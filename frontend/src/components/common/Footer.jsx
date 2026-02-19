import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { motion } from "framer-motion";

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState(664);

  useEffect(() => {
    const fetchAndIncrementCount = async () => {
      try {
        const hasVisited = sessionStorage.getItem("visitLogged");
        
        let response;
        if (!hasVisited) {
           // Increment
           response = await api.post("/settings/visitor-count");
           sessionStorage.setItem("visitLogged", "true");
        } else {
           // Just Get
           response = await api.get("/settings/visitor-count");
        }
        
        if (response.data) {
            setVisitorCount(response.data.count);
        }
      } catch (error) {
        console.error("Failed to fetch visitor count", error);
      }
    };

    fetchAndIncrementCount();
  }, []);

  const footerVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <>
      <style>{`
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.2); }
            50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.5); }
        }
        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
        }
        .animate-float {
            animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
            animation: float 8s ease-in-out 4s infinite;
        }
        .animate-pulse-glow {
            animation: pulse-glow 3s ease-in-out infinite;
        }
        .shimmer-text {
            background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #3b82f6 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: shimmer 5s linear infinite;
        }
    `}</style>
      <motion.footer 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.3,
            }
          }
        }}
        className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-gray-100 overflow-hidden"
      >
        {/* Enhanced Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl animate-float-delayed"
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-50 animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Animated Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-8">
          {/* Top Section: Enhanced Features with Icons */}
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="grid grid-cols-3 gap-2 md:gap-8 mb-6 md:mb-20 pb-4 md:pb-16 border-b border-gray-700/50 relative"
          >
            {/* Decorative Line */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="flex flex-col items-center text-center group relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-12 h-12 md:w-24 md:h-24 mb-2 md:mb-6 z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-xl md:rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500 animate-pulse-glow"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-500 group-hover:scale-110">
                  <svg
                    className="w-6 h-6 md:w-12 md:h-12 text-white group-hover:scale-110 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-[10px] md:text-xl text-white mb-1 md:mb-3 group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                Premium Quality
              </h3>
              <p className="hidden md:block text-gray-400 text-sm leading-relaxed max-w-xs group-hover:text-gray-300 transition-colors">
                100% quality assured products with industry-leading standards
              </p>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="flex flex-col items-center text-center group relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-12 h-12 md:w-24 md:h-24 mb-2 md:mb-6 z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 rounded-xl md:rounded-2xl transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500 animate-pulse-glow"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-emerald-500/50 transition-all duration-500 group-hover:scale-110">
                  <svg
                    className="w-6 h-6 md:w-12 md:h-12 text-white group-hover:scale-110 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-[10px] md:text-xl text-white mb-1 md:mb-3 group-hover:text-emerald-400 transition-colors duration-300 leading-tight">
                Free Delivery
              </h3>
              <p className="hidden md:block text-gray-400 text-sm leading-relaxed max-w-xs group-hover:text-gray-300 transition-colors">
                Fast & free delivery across India on bulk orders
              </p>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="flex flex-col items-center text-center group relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-12 h-12 md:w-24 md:h-24 mb-2 md:mb-6 z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 rounded-xl md:rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500 animate-pulse-glow"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-amber-500/50 transition-all duration-500 group-hover:scale-110">
                  <svg
                    className="w-6 h-6 md:w-12 md:h-12 text-white group-hover:scale-110 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-[10px] md:text-xl text-white mb-1 md:mb-3 group-hover:text-amber-400 transition-colors duration-300 leading-tight">
                30 Days Return
              </h3>
              <p className="hidden md:block text-gray-400 text-sm leading-relaxed max-w-xs group-hover:text-gray-300 transition-colors">
                Easy & hassle-free returns with full refund guarantee
              </p>
            </motion.div>
          </motion.div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-16 text-center md:text-left">
            {/* About Column */}
            <div className="relative col-span-2 md:col-span-1">
              <h3 className="text-white font-bold text-xl mb-6 flex items-center justify-center md:justify-start gap-3 group">
                <span className="w-2 h-10 bg-gradient-to-b from-blue-500 via-indigo-500 to-orange-500 rounded-full group-hover:scale-y-125 transition-transform duration-300"></span>
                <span className="shimmer-text font-extrabold text-2xl">
                  Jumbo Xerox
                </span>
              </h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed relative">
                Whether you're a student, business owner, or professional, Jumbo
                Xerox brings fast, reliable, and hassle-free printing solutions
                right to your fingertips. Order online. Upload your files. Get
                doorstep delivery in Guntur. Printing Made Simple.
              </p>
              <div className="flex justify-center md:justify-start gap-3">
                <a
                  href="#"
                  className="group relative w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-600 hover:to-blue-700 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/50 hover:-translate-y-2 border border-gray-700 hover:border-blue-500"
                >
                  <svg
                    className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="group relative w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-400 hover:to-cyan-500 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-400/50 hover:-translate-y-2 border border-gray-700 hover:border-cyan-500"
                >
                  <svg
                    className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 002.856-3.51 9.95 9.95 0 01-2.824.856 4.958 4.958 0 00-8.618 4.53 14.07 14.07 0 01-10.211-5.251c-.666 1.156-.999 2.514-.999 3.956 0 1.724.573 3.332 1.732 4.653-1.73-.055-3.358-.546-4.778-1.148v.061c0 2.281.854 4.41 2.229 5.816a4.993 4.993 0 01-2.25.085c.695 2.18 2.537 3.793 4.768 3.858a9.968 9.968 0 01-6.175 2.139c-.398 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="group relative w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 hover:from-pink-600 hover:to-rose-600 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-pink-500/50 hover:-translate-y-2 border border-gray-700 hover:border-pink-500"
                >
                  <svg
                    className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3c2.49 0 2.789.006 3.773.058 2.986.131 4.032 1.16 4.164 4.164.052.984.058 1.283.058 3.773s-.006 2.789-.058 3.773c-.131 2.986-1.16 4.032-4.164 4.164-.984.052-1.283.058-3.773.058s-2.789-.006-3.773-.058c-2.986-.131-4.032-1.16-4.164-4.164-.052-.984-.058-1.283-.058-3.773s.006-2.789.058-3.773c.131-2.986 1.16-4.032 4.164-4.164.984-.052 1.283-.058 3.773-.058zm0 1.621c-2.222 0-4.379.903-5.889 2.413-1.51 1.51-2.413 3.667-2.413 5.889s.903 4.379 2.413 5.889c1.51 1.51 3.667 2.413 5.889 2.413s4.379-.903 5.889-2.413c1.51-1.51 2.413-3.667 2.413-5.889s-.903-4.379-2.413-5.889c-1.51-1.51-3.667-2.413-5.889-2.413zm0 8.75c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm6.064-8.768c-.386 0-.714-.32-.714-.714 0-.393.328-.714.714-.714.386 0 .714.321.714.714 0 .394-.328.714-.714.714z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/919441081125"
                  className="group relative w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 hover:from-green-500 hover:to-emerald-600 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/50 hover:-translate-y-2 border border-gray-700 hover:border-green-500"
                >
                  <svg
                    className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.24l-.354.21-.367-.012a9.9 9.9 0 00-1.473.122 9.868 9.868 0 003.916-4.64 9.874 9.874 0 012.228 3.081z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="relative">
              <h4 className="text-white font-bold text-lg mb-6 flex items-center justify-center md:justify-start gap-2">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  ></path>
                </svg>
                Quick Links
              </h4>
              <ul className="space-y-3 text-sm">
                {[
                  { name: "Home", path: "/" },
                  { name: "Quick Prints", path: "/quick-print" },
                  { name: "Business Cards", path: "/business-cards" },
                  { name: "Plan Printing", path: "/plan-printing" },
                  { name: "Track Order", path: "/dashboard" },
                ].map((l) => (
                  <li key={l.name}>
                    <Link
                      to={l.path}
                      className="text-gray-400 hover:text-blue-400 transition-all duration-300 flex items-center justify-center md:justify-start gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-blue-400 group-hover:w-4 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-2 transition-transform duration-300">
                        {l.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="relative">
              <h4 className="text-white font-bold text-lg mb-6 flex items-center justify-center md:justify-start gap-2">
                <svg
                  className="w-5 h-5 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
                Support
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center justify-center md:justify-start gap-3 group">
                  <div className="p-2 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg group-hover:from-blue-500/40 group-hover:to-indigo-500/40 transition-all duration-300">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <a
                    href="tel:+919441081125"
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 group-hover:translate-x-1"
                  >
                    +91 9441081125
                  </a>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3 group">
                  <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg group-hover:from-emerald-500/40 group-hover:to-teal-500/40 transition-all duration-300">
                    <svg
                      className="w-5 h-5 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <a
                    href="mailto:info@jumboxerox.com"
                    className="text-gray-400 hover:text-emerald-400 transition-all duration-300 group-hover:translate-x-1"
                  >
                    info@jumboxerox.com
                  </a>
                </li>
                <li className="flex items-start justify-center md:justify-start gap-3 group">
                  <div className="p-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg group-hover:from-amber-500/40 group-hover:to-orange-500/40 transition-all duration-300 mt-1">
                    <svg
                      className="w-5 h-5 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="text-gray-400 hover:text-amber-400 transition-all duration-300 group-hover:translate-x-1">
                    <p className="leading-relaxed">9th Line, Arundulpet,</p>
                    <p className="leading-relaxed">Guntur, Andhra Pradesh</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="relative">
              <h4 className="text-white font-bold text-lg mb-6 flex items-center justify-center md:justify-start gap-2">
                <svg
                  className="w-5 h-5 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
                Legal
              </h4>
              <ul className="space-y-3 text-sm">
                {[
                  { name: "About", path: "/about" },
                  { name: "FAQ", path: "/faq" },
                  { name: "Payment Terms", path: "/payment-terms" },
                  {
                    name: "Terms And Conditions",
                    path: "/terms-and-conditions",
                  },
                  { name: "Refund Policy", path: "/refund-policy" },
                ].map((l) => (
                  <li key={l.name}>
                    <Link
                      to={l.path}
                      className="text-gray-400 hover:text-purple-400 transition-all duration-300 flex items-center justify-center md:justify-start gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-purple-400 group-hover:w-4 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-2 transition-transform duration-300">
                        {l.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Enhanced Bottom Footer */}
          <div className="relative pt-8 border-t border-gray-700/50">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400 text-sm">
              <p className="flex items-center gap-2 flex-wrap justify-center">
                <span>&copy; 2026</span>
                <span className="shimmer-text font-bold text-base">
                  New Cyber Shoppee Jumbo Xerox
                </span>
                <span>. All Rights Reserved.</span>
              </p>
              <div className="flex gap-6 items-center flex-wrap justify-center">
                <Link
                  to="/refund-policy"
                  className="hover:text-blue-400 transition-colors relative group px-2 py-1"
                >
                  Refund Policy
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <span className="text-gray-600">•</span>
                <Link
                  to="/terms-and-conditions"
                  className="hover:text-blue-400 transition-colors relative group px-2 py-1"
                >
                  Terms & Conditions
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <span className="text-gray-600">•</span>
                <Link
                  to="/payment-terms"
                  className="hover:text-blue-400 transition-colors relative group px-2 py-1"
                >
                  Payment Policy
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group">
                <div className="p-1.5 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/40 transition-colors">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                </div>
                <span className="text-gray-300">Visitors:</span>
                <strong className="text-blue-400 text-lg font-bold">
                  {visitorCount.toLocaleString()}
                </strong>
              </div>
            </div>

            {/* Developer Credit */}
            <div className="mt-6 pt-4 border-t border-gray-700/30 text-center pb-2">
              <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                <span>Designed And Developed By</span>
                <a
                  href="https://webnappstudio.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-semibold hover:underline"
                >
                  WebnApp Studio
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.footer>
    </>
  );
}
