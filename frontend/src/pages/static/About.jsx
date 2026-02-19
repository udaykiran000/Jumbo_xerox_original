import React from "react";
import {
  FiPrinter,
  FiZap,
  FiTarget,
  FiShield,
  FiCheckCircle,
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";

const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl mb-8 shadow-2xl animate-float">
            <FiPrinter className="text-4xl text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-slate-900 tracking-tighter">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Jumbo Xerox
            </span>
          </h1>
          <h2 className="text-2xl font-bold text-slate-600 mb-6">
            Guntur's Most Trusted Online Printing Service
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Who We Are */}
          <div className="bg-white rounded-3xl shadow-xl p-10 border-t-8 border-blue-600">
            <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <FiZap className="text-blue-600" /> WHO WE ARE
            </h3>
            <p className="text-slate-600 leading-loose mb-6">
              Whether you're a student, business owner, or professional, Jumbo
              Xerox brings fast, reliable, and hassle-free printing solutions
              right to your fingertips.
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-500 font-bold text-blue-900">
              Order online. Upload your files. Get doorstep delivery in Guntur.
            </div>
          </div>

          {/* Our Mission */}
          <div className="bg-white rounded-3xl shadow-xl p-10 border-t-8 border-purple-600">
            <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <FiTarget className="text-purple-600" /> OUR MISSION
            </h3>
            <p className="text-slate-600 leading-loose mb-6">
              To provide fast, affordable, and high-quality printing solutions
              for students, offices, businesses, and professionals in Guntur.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {["Fast Service", "Affordable", "Reliable", "24/7 Support"].map(
                (t) => (
                  <div
                    key={t}
                    className="bg-slate-50 p-3 rounded-xl text-xs font-black text-slate-700 uppercase flex items-center gap-2"
                  >
                    <FiCheckCircle className="text-green-500" /> {t}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Bulk Printing CTA */}
        <div className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 rounded-[40px] shadow-2xl p-12 text-white text-center mb-16">
          <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">
            Need Bulk Printing Services?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Call us for corporate orders and special pricing.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a
              href="tel:+919441081125"
              className="bg-white text-orange-600 px-10 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition"
            >
              +91 9441081125
            </a>
            <a
              href="/contact"
              className="border-2 border-white px-10 py-4 rounded-2xl font-black hover:bg-white hover:text-orange-600 transition"
            >
              CONTACT US
            </a>
          </div>
        </div>

        {/* Final Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-8 rounded-3xl border border-blue-200">
            <FiMapPin className="text-blue-600 mb-4" size={30} />
            <h4 className="font-black text-blue-900 mb-2">STORE PICKUP</h4>
            <p className="text-sm text-blue-700 font-medium">
              Guntur Branch Only
            </p>
          </div>
          <div className="bg-yellow-100 p-8 rounded-3xl border border-yellow-200">
            <FiZap className="text-yellow-600 mb-4" size={30} />
            <h4 className="font-black text-yellow-900 mb-2">BULK ORDERS</h4>
            <p className="text-sm text-yellow-700 font-medium">
              Special Pricing Available
            </p>
          </div>
          <div className="bg-green-100 p-8 rounded-3xl border border-green-200">
            <FiMail className="text-green-600 mb-4" size={30} />
            <h4 className="font-black text-green-900 mb-2">ORDER SUPPORT</h4>
            <p className="text-sm text-green-700 font-medium">
              info@jumboxerox.com
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
