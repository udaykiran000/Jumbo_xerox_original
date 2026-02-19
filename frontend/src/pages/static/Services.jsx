import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiMapPin,
  FiMonitor,
  FiBox
} from "react-icons/fi";
import { 
  fadeInUp, 
  staggerContainer, 
  scaleIn,
  slideInUp 
} from "../../components/common/Animations";
import MaskedHeading from "../../components/common/MaskedHeading";

// Import images
import a4Image from "../../assets/a4.jpg";
import planImage from "../../assets/plan.jpg";
import bcardImage from "../../assets/bcard.jpg";

const ServicesPage = () => {
  const serviceCards = [
    {
      title: "Quick Printouts",
      image: a4Image,
      popular: true,
      desc: "Fast and crisp document printing for reports, thesis, assignments, and office documents.",
      features: [
        "A4, A3, FLS, A0, A1, A2",
        "Color & Grayscale Options",
        "All Binding Options Available",
      ],
      link: "/quick-print", // Matches route in App.js
    },
    {
      title: "Plan Print Outs",
      image: planImage,
      desc: "Large format printing for architectural drawings, engineering plans (CAD), and posters.",
      features: [
        "Sizes: A0, A1, A2",
        "High Precision Plotter",
        "90gsm Bond Paper",
      ],
      link: "/plan-printing", // Matches route in App.js
    },
    {
      title: "Business Cards",
      image: bcardImage,
      desc: "Make a lasting impression with our premium business cards. Available in matte, gloss, and textured finishes.",
      features: ["300gsm & 350gsm Cardstock", "Single or Double Sided"],
      link: "/business-cards", // Matches route in App.js
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <section className="pt-20 pb-12 px-4">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-5xl mx-auto bg-white rounded-3xl p-12 shadow-sm border border-slate-100 text-center"
        >
          <MaskedHeading className="text-5xl font-extrabold text-indigo-900 mb-4 tracking-tight inline-block">
            Our Printing Services
          </MaskedHeading>
          <motion.p 
            variants={fadeInUp}
            className="text-slate-500 text-lg font-medium"
          >
            Professional printing solutions tailored for your needs.
          </motion.p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {serviceCards.map((card, idx) => (
          <motion.div
            key={idx}
            variants={scaleIn}
            whileHover={{ y: -8 }}
            className="h-full"
          >
            <Link
              to={card.link}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col group h-full transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                {card.popular && (
                  <div className="absolute top-4 right-[-35px] bg-gradient-to-r from-orange-400 to-yellow-400 text-white text-[10px] font-bold py-1 px-10 rotate-45 shadow-md z-10">
                    POPULAR
                  </div>
                )}
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                  {card.desc}
                </p>

                <ul className="space-y-3 mb-8">
                  {card.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center text-sm text-slate-600 font-medium"
                    >
                      <FiCheckCircle className="text-indigo-500 mr-2 w-4 h-4 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center font-bold rounded-2xl shadow-lg group-hover:shadow-indigo-200 transition-all uppercase tracking-widest text-sm"
                >
                  Order Now
                </motion.div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.section>

      {/* Info Badges */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <motion.div 
          variants={slideInUp}
          className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100 flex items-center gap-4 hover:bg-indigo-100 transition-colors"
        >
          <div className="bg-white p-2 rounded-full text-indigo-500 shadow-sm">
            <FiMapPin />
          </div>
          <p className="text-xs font-semibold text-indigo-900 leading-tight">
            Store Pickup:
            <br />
            <span className="text-slate-500 font-normal text-[11px]">
              Available at Guntur Branch
            </span>
          </p>
        </motion.div>
        
        <motion.div 
          variants={slideInUp}
          className="bg-purple-50 p-5 rounded-2xl border border-purple-100 flex items-center gap-4 hover:bg-purple-100 transition-colors"
        >
          <div className="bg-white p-2 rounded-full text-purple-500 shadow-sm">
            <FiMonitor />
          </div>
          <p className="text-xs font-semibold text-purple-900 leading-tight">
            Online Order:
            <br />
            <span className="text-slate-500 font-normal text-[11px]">
              Upload & Get Delivered
            </span>
          </p>
        </motion.div>
        
        <motion.div 
          variants={slideInUp}
          className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex items-center gap-4 hover:bg-blue-100 transition-colors"
        >
          <div className="bg-white p-2 rounded-full text-blue-500 shadow-sm">
            <FiBox />
          </div>
          <p className="text-xs font-semibold text-blue-900 leading-tight">
            Bulk Orders:
            <br />
            <span className="text-slate-500 font-normal text-[11px]">
              Special Rates Available
            </span>
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default ServicesPage;

