import React from "react";
import Footer from "../../components/common/Footer";
import { motion } from "framer-motion";
import { 
  fadeInUp, 
  staggerContainer, 
  scaleIn, 
  slideInLeft, 
  slideInRight 
} from "../../components/common/Animations";
import MaskedHeading from "../../components/common/MaskedHeading";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen font-sans">
      {/* Marquee Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-3 overflow-hidden relative">
        <div className="animate-marquee flex items-center gap-8 text-sm font-semibold whitespace-nowrap">
          <span>🖨️ Fast & Reliable Printing Services</span>
          <span>•</span>
          <span>📄 Photocopying & Document Services</span>
          <span>•</span>
          <span>📚 Binding & Lamination Available</span>
          <span>•</span>
          <span>🚚 Doorstep Delivery in Guntur</span>
          <span>•</span>
          <span>💰 Affordable Pricing</span>
          <span>•</span>
          <span>⭐ High-Quality Prints Every Time</span>
          <span>•</span>
          <span>📞 Bulk Orders: +91 9441081125</span>
          <span>•</span>
          <span>🖨️ Fast & Reliable Printing Services</span>
          <span>•</span>
          <span>📄 Photocopying & Document Services</span>
          <span>•</span>
          <span>📚 Binding & Lamination Available</span>
          <span>•</span>
          <span>🚚 Doorstep Delivery in Guntur</span>
          <span>•</span>
          <span>💰 Affordable Pricing</span>
          <span>•</span>
          <span>⭐ High-Quality Prints Every Time</span>
          <span>•</span>
          <span>📞 Bulk Orders: +91 9441081125</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full mb-6 shadow-2xl animate-float"
          >
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              ></path>
            </svg>
          </motion.div>
          
          <div className="overflow-hidden">
            <MaskedHeading className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight pb-2">
              Welcome to Jumbo Xerox
            </MaskedHeading>
          </div>
          
          <motion.h2 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
          >
            Guntur's Most Trusted Online Printing Service
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Get high-quality printing, photocopying, binding, and document
            services delivered with speed, accuracy, and affordable pricing.
          </motion.p>
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            {/* Introduction Card */}
            <motion.div 
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-600"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Who We Are</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Whether you're a student, business owner, or professional, Jumbo
                Xerox brings fast, reliable, and hassle-free printing solutions
                right to your fingertips.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500">
                <p className="text-gray-800 font-semibold text-lg mb-2">
                  Order online. Upload your files. Get doorstep delivery in
                  Guntur.
                </p>
                <p className="text-gray-700 text-xl font-bold">
                  Printing made simple.
                </p>
              </div>
            </motion.div>

            {/* Services Card */}
            <motion.div 
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-indigo-600"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <svg
                    className="w-8 h-8 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Our Services
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Jumbo Xerox is Guntur's leading digital print and document
                solutions center, offering online printing, photocopying,
                lamination, binding, and custom print services. We simplify the
                printing process—just upload your files, choose your print
                preferences, and we take care of the rest.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Online Printing", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                  { name: "Photocopying", icon: "M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" },
                  { name: "Binding", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
                  { name: "Lamination", icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-default"
                  >
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={item.icon}
                      ></path>
                    </svg>
                    <span className="text-sm font-semibold text-gray-700">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Quality & Mission */}
          <div className="space-y-8">
            {/* Quality Card */}
            <motion.div 
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-8 text-white"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <svg
                    className="w-8 h-8 text-white"
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
                <h3 className="text-2xl font-bold">Quality Assurance</h3>
              </div>
              <p className="text-blue-100 leading-relaxed text-lg">
                With modern machines, experienced staff, and a commitment to
                quality, we ensure your prints look professional every single
                time.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { val: "100%", label: "Quality" },
                  { val: "24/7", label: "Support" },
                  { val: "Fast", label: "Delivery" }
                ].map((stat, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 10 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.2 + (i * 0.1) }}
                     className="text-center"
                   >
                    <div className="text-3xl font-bold mb-1">{stat.val}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div 
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-purple-600"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Our Mission
                </h3>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border-l-4 border-purple-500">
                <p className="text-gray-800 leading-relaxed text-lg font-medium">
                  To provide fast, affordable, and high-quality printing
                  solutions for students, offices, businesses, and professionals
                  in Guntur.
                </p>
              </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { title: "Fast Service", desc: "Quick turnaround times", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "green", bg: "bg-green-100", text: "text-green-600" },
                { title: "Affordable", desc: "Competitive pricing", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "blue", bg: "bg-blue-100", text: "text-blue-600" },
                { title: "Reliable", desc: "Trusted by thousands", icon: "M5 13l4 4L19 7", color: "purple", bg: "bg-purple-100", text: "text-purple-600" },
                { title: "Support", desc: "Dedicated service team", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", color: "indigo", bg: "bg-indigo-100", text: "text-indigo-600" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={scaleIn}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-blue-300 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 ${item.bg} rounded-lg`}>
                      <svg
                        className={`w-6 h-6 ${item.text}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d={item.icon}
                        ></path>
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* CTA Section for Bulk Orders */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl shadow-2xl p-8 md:p-12 text-white mb-16"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm"
            >
              <svg
                className="w-10 h-10 text-white"
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
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Need Bulk Printing Services?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              For large orders, corporate printing, or special requirements, our
              dedicated team is ready to assist you with customized solutions
              and competitive pricing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+919441081125"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-orange-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
              >
                <svg
                  className="w-6 h-6"
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
                Call: +91 9441081125
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all"
              >
                <svg
                  className="w-6 h-6"
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
                Contact Us
              </motion.a>
            </div>
            <p className="text-white/80 text-sm mt-6">
              Available Monday - Saturday, 9:00 AM - 7:00 PM
            </p>
          </div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16"
        >
          <div className="text-center mb-12">
            <MaskedHeading className="text-4xl font-extrabold text-gray-900 mb-4 inline-block">
              Why Choose Jumbo Xerox?
            </MaskedHeading>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our professional printing services
            </p>
          </div>
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { title: "Lightning Fast", desc: "Quick processing and delivery for urgent printing needs", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "blue", bg: "bg-blue-100", text: "text-blue-600" },
              { title: "Premium Quality", desc: "State-of-the-art equipment ensuring crisp, clear prints", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "green", bg: "bg-green-100", text: "text-green-600" },
              { title: "Best Prices", desc: "Competitive rates without compromising on quality", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "purple", bg: "bg-purple-100", text: "text-purple-600" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="text-center p-6 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${item.bg} rounded-full mb-4`}>
                  <svg
                    className={`w-8 h-8 ${item.text}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={item.icon}
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>

      {/* Notes Section (Inline to match PHP source exactly) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Store Pickup", desc: "Available only at", highlight: "Guntur Branch", color: "blue", bg: "from-blue-50 to-blue-100", border: "border-blue-500", text: "text-blue-800", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" },
            { title: "Bulk Orders", desc: "Call", highlight: "+91 9441081125", color: "yellow", bg: "from-yellow-50 to-yellow-100", border: "border-yellow-500", text: "text-yellow-800", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
            { title: "Order Support", desc: "Email", highlight: "info@jumboxerox.com", color: "green", bg: "from-green-50 to-green-100", border: "border-green-500", text: "text-green-800", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }
          ].map((note, i) => (
             <motion.div 
               key={i}
               whileHover={{ scale: 1.02 }}
               className={`bg-gradient-to-r ${note.bg} border-l-4 ${note.border} ${note.text} p-5 rounded-xl shadow-sm`}
             >
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={note.icon}
                  ></path>
                </svg>
                <strong className="font-bold">{note.title}</strong>
              </div>
              <p className="text-sm">
                {note.desc} <b>{note.highlight}</b>
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style>{`
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
            animation-play-state: paused;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        .animate-float {
            animation: float 3s ease-in-out infinite;
        }
      `}</style>
      <Footer />
    </div>
  );
};

export default About;
