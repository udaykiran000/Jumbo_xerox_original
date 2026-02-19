import React from "react";
import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiTruck,
  FiRefreshCw,
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import { motion } from "framer-motion"; // Import Animation Library

// --- Swiper (For Decoratives) ---
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// --- IMAGE IMPORTS ---
// Hero Backgrounds (1-7)
import h1 from "../../assets/1.jpg";
import h2 from "../../assets/2.jpg";
import h3 from "../../assets/3.jpg";
import h4 from "../../assets/4.jpg";
import h5 from "../../assets/5.jpg";
import h6 from "../../assets/6.jpg";
import h7 from "../../assets/7.jpg";

// Categories
import catA4 from "../../assets/a4.jpg";
import catPlan from "../../assets/Plan-Printing.jpg";
import catFlyer from "../../assets/flyers.jpg";
import catBcard from "../../assets/bcard.jpg";
import catSticker from "../../assets/poster.jpg";

// Business Needs
import biz1 from "../../assets/prescription-pads.webp";
import biz2 from "../../assets/bill-books.webp";
import biz3 from "../../assets/letterheads.webp";
import biz4 from "../../assets/cash-receipts.webp";
import biz5 from "../../assets/vouchers.webp";
import biz6 from "../../assets/envelopes.webp";
import biz7 from "../../assets/mouse-pads.webp";
import biz8 from "../../assets/keychains.webp";
import biz9 from "../../assets/metal.webp";
import biz10 from "../../assets/name-pencils.webp";

// Decoratives
import s1 from "../../assets/slide1.webp";
import s2 from "../../assets/slide2.webp";
import s3 from "../../assets/slide3.webp";
import s4 from "../../assets/slide4.jpg";
import s5 from "../../assets/slide5.webp";
import s6 from "../../assets/slide6.webp";

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "backOut" }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "backOut" }
  }
};

const slideInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "backOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 } // Elastic pop
  }
};

// Masked Text Reveal Variant
const maskedReveal = {
  hidden: { y: "100%" },
  visible: { 
    y: "0%",
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } // Cubic bezier for premium feel
  }
};

const MaskedHeading = ({ children, className }) => (
  <div className="overflow-hidden relative inline-block">
    <motion.h2 
      variants={maskedReveal}
      className={className}
    >
      {children}
    </motion.h2>
  </div>
);

const Home = () => {
  // Hero Images
  const heroImages = [h1, h2, h3, h4, h5, h6, h7];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-700 overflow-x-hidden relative">
      
      {/* --- FLOATING BACKGROUND BLOBS --- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ y: [0, -50, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[-100px] w-96 h-96 bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply"
        />
        <motion.div 
          animate={{ y: [0, 50, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-40 right-[-100px] w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl mix-blend-multiply"
        />
        <motion.div 
          animate={{ x: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-50/60 rounded-full blur-3xl"
        />
      </div>

      {/* IMPROVED HERO SECTION WITH SWIPER */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-[220px] sm:h-[350px] md:h-[550px] bg-slate-900 overflow-hidden z-10"
      >
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={true}
          loop={true}
          speed={1000}
          className="h-full w-full hero-swiper"
        >
          {heroImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>

      {/* STEP 3: BLUE ANNOUNCEMENT TICKER (Exact Screenshot Position) */}
      <motion.section 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="bg-blue-700 text-white py-4 overflow-hidden shadow-xl z-30 relative border-b border-blue-800"
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6">
          <div className="flex-shrink-0 font-black text-sm italic tracking-tighter bg-white/20 px-4 py-1.5 rounded-lg border border-white/10">
            📢 ANNOUNCEMENTS:
          </div>
          <div className="flex-grow overflow-hidden relative h-6 flex items-center">
            <div className="flex gap-16 animate-marquee whitespace-nowrap absolute text-[11px] font-extrabold uppercase tracking-wide">
              <span>
                ✨ FAST TURNAROUND TIME - GET YOUR PRINTS IN 24 HOURS!
              </span>
              <span>🎁 FIRST-TIME USERS GET 10% OFF ON ALL ORDERS!</span>
              <span>📦 FREE SHIPPING ON BULK ORDERS ABOVE ₹2000!</span>
              <span>
                🏆 HIGH-QUALITY PRINTING WITH GUARANTEED SATISFACTION!
              </span>
              <span>
                ✨ FAST TURNAROUND TIME - GET YOUR PRINTS IN 24 HOURS!
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* --- CATEGORIES SECTION --- */}
      <section className="py-10 md:py-20 px-4 max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <MaskedHeading className="text-3xl md:text-4xl font-black mb-2 text-slate-800 uppercase tracking-tighter">
            Our Categories
          </MaskedHeading>
          
          <motion.p 
            variants={fadeInUp}
            className="text-slate-400 mb-10 md:mb-16 font-bold text-xs uppercase tracking-widest"
          >
            Choose what you need to print
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {[
            { n: "Document Print A4", i: catA4 },
            { n: "Plan Printing", i: catPlan },
            { n: "Flyers", i: catFlyer },
            { n: "Business Cards", i: catBcard },
            { n: "Sticker Printing", i: catSticker },
          ].map((cat, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-28 h-28 md:w-48 md:h-48 rounded-full overflow-hidden border-[4px] md:border-[6px] border-slate-50 shadow-2xl group-hover:border-indigo-100 transition-all duration-500 bg-slate-100 relative">
                 {/* Shine Effect Wrapper */}
                 <div className="absolute inset-0 z-10 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 w-full h-full -translate-x-[150%] skew-x-[-25deg] group-hover:animate-shine" />
                <img
                  src={cat.i}
                  alt={cat.n}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <p className="mt-4 md:mt-6 font-black text-[10px] md:text-xs text-slate-700 uppercase tracking-tighter group-hover:text-indigo-600 transition-colors">
                {cat.n}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- INFO GRID (Alerts) --- */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 shadow-sm border-y border-slate-50 gap-4 md:gap-0 relative z-10 bg-white/80 backdrop-blur-sm overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInLeft}
          className="bg-indigo-50/50 p-6 md:p-8 border-r-0 md:border-r border-slate-100 flex items-center gap-5 rounded-xl md:rounded-none hover:bg-indigo-50 transition-colors"
        >
          <FiMapPin className="text-indigo-600 w-8 h-8" />
          <div>
            <p className="text-[11px] font-black text-indigo-900 uppercase">
              Store Pickup
            </p>
            <p className="text-xs text-slate-500 font-medium tracking-tight leading-tight mt-1">
              Available only at Guntur Branch
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInUp}
          className="bg-yellow-50/50 p-6 md:p-8 border-r-0 md:border-r border-slate-100 flex items-center gap-5 rounded-xl md:rounded-none hover:bg-yellow-50 transition-colors"
        >
          <FiPhone className="text-yellow-600 w-8 h-8" />
          <div>
            <p className="text-[11px] font-black text-yellow-900 uppercase">
              Bulk Orders
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1">
              +91 9441081125
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInRight}
          className="bg-emerald-50/50 p-6 md:p-8 flex items-center gap-5 rounded-xl md:rounded-none hover:bg-emerald-50 transition-colors"
        >
          <FiMail className="text-emerald-600 w-8 h-8" />
          <div>
            <p className="text-[11px] font-black text-emerald-900 uppercase">
              Order Related
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1">
              info@jumboxerox.com
            </p>
          </div>
        </motion.div>
      </section>

      {/* --- BUSINESS NEEDS (GRID) --- */}
      <section className="py-10 md:py-24 bg-slate-50/50 px-4 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
          >
             <MaskedHeading className="text-3xl md:text-4xl font-black mb-10 md:mb-16 uppercase tracking-[0.2em] text-slate-800">
                Business Needs
             </MaskedHeading>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {[
              { n: "Prescription Pads", i: biz1 },
              { n: "Bill Books", i: biz2 },
              { n: "Letterheads", i: biz3 },
              { n: "Cash Receipts", i: biz4 },
              { n: "Payment Vouchers", i: biz5 },
              { n: "Envelopes", i: biz6 },
              { n: "Mousepads", i: biz7 },
              { n: "Pen & Keychain", i: biz8 },
              { n: "Metal Pens", i: biz9 },
              { n: "Name Pencils", i: biz10 },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 hover:shadow-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
              >
                <div className="h-32 md:h-44 bg-slate-50 rounded-xl mb-4 overflow-hidden relative">
                  {/* Shine Effect */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 w-full h-full -translate-x-[150%] skew-x-[-25deg] group-hover:animate-shine" />
                  
                  <img
                    src={item.i}
                    alt={item.n}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <p className="font-bold text-[10px] uppercase text-slate-600 tracking-tighter group-hover:text-blue-600 transition-colors">
                  {item.n}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- HOME DECORATIVES (SWIPER) --- */}
      <section className="py-10 md:py-24 bg-white px-4 border-t border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
          >
            <MaskedHeading className="text-3xl md:text-4xl font-black text-center mb-10 md:mb-16 uppercase tracking-[0.2em] text-slate-800">
               Home Decoratives
            </MaskedHeading>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="px-2 md:px-10"
          >
            <Swiper
              modules={[Autoplay, Navigation]}
              autoplay={{ delay: 3000 }}
              navigation={true}
              loop={true}
              spaceBetween={20}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              className="decor-swiper pb-10"
            >
              {[s1, s2, s3, s4, s5, s6].map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden group relative">
                    {/* Shine Effect */}
                    <div className="absolute inset-0 z-20 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 w-full h-full -translate-x-[150%] skew-x-[-25deg] group-hover:animate-shine" />
                    <div className="h-48 md:h-64 overflow-hidden relative">
                      <img
                        src={img}
                        alt="decor"
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
// Trigger recompile
