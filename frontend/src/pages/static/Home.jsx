import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiTruck,
  FiRefreshCw,
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";

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

const Home = () => {
  const [currentHero, setCurrentHero] = useState(0);
  const heroImages = [h1, h2, h3, h4, h5, h6, h7];

  // 1. Hero Auto-Fade Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // 2. WhatsApp Widget Logic
  useEffect(() => {
    const url = "https://cdn.waplus.io/waplus-crm/settings/ossembed.js";
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = url;

    // Ekkada missing fields (welcomeText, messageText, etc.) add chesanu
    const options = {
      enabled: true,
      chatButtonSetting: {
        backgroundColor: "#16BE45",
        ctaText: "Message Us",
        borderRadius: "25",
        marginLeft: "0",
        marginBottom: "50",
        marginRight: "50",
        position: "right",
        phoneNumber: "919441081125",
        welcomeText: "Hi there!", // Ee field missing valla error ravachu
        messageText: "Hello, I have a query about Jumbo Xerox",
      },
      brandSetting: {
        brandName: "Jumbo Xerox",
        brandSubTitle: "Typically replies in a few minutes",
        brandImg: "https://jumboxerox.com/assets/icon.png",
        welcomeText: "Hi there!\nHow can I help you?",
        messageText: "Hello, I have a query about Jumbo Xerox",
        backgroundColor: "#075e54",
        ctaText: "Start Chat",
        borderRadius: "25",
        autoShow: false,
        phoneNumber: "919441081125",
      },
    };

    s.onload = () => {
      // Check if the function exists before calling
      if (typeof window.CreateWhatsappChatWidget === "function") {
        window.CreateWhatsappChatWidget(options);
      }
    };

    document.body.appendChild(s);

    return () => {
      if (document.body.contains(s)) {
        document.body.removeChild(s);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-700 overflow-x-hidden">
      <section className="relative w-full h-[450px] md:h-[550px] bg-slate-900 overflow-hidden">
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentHero ? "opacity-93" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentHero(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentHero ? "bg-white w-8" : "bg-white/40 w-2"
              }`}
            />
          ))}
        </div>
      </section>

      {/* STEP 3: BLUE ANNOUNCEMENT TICKER (Exact Screenshot Position) */}
      <section className="bg-blue-700 text-white py-4 overflow-hidden shadow-xl z-30 relative border-b border-blue-800">
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
      </section>

      {/* --- CATEGORIES SECTION --- */}
      <section className="py-20 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-black mb-2 text-slate-800 uppercase tracking-tighter">
          Our Categories
        </h2>
        <p className="text-slate-400 mb-16 font-bold text-xs uppercase tracking-widest">
          Choose what you need to print
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {[
            { n: "Document Print A4", i: catA4 },
            { n: "Plan Printing", i: catPlan },
            { n: "Flyers", i: catFlyer },
            { n: "Business Cards", i: catBcard },
            { n: "Sticker Printing", i: catSticker },
          ].map((cat, i) => (
            <div
              key={i}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-[6px] border-slate-50 shadow-2xl group-hover:border-indigo-100 transition-all duration-500 bg-slate-100">
                <img
                  src={cat.i}
                  alt={cat.n}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <p className="mt-6 font-black text-xs text-slate-700 uppercase tracking-tighter">
                {cat.n}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- INFO GRID (Alerts) --- */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 shadow-sm border-y border-slate-50">
        <div className="bg-indigo-50 p-8 border-r border-slate-100 flex items-center gap-5">
          <FiMapPin className="text-indigo-600 w-8 h-8" />
          <div>
            <p className="text-[11px] font-black text-indigo-900 uppercase">
              Store Pickup
            </p>
            <p className="text-xs text-slate-500 font-medium tracking-tight leading-tight mt-1">
              Available only at Guntur Branch
            </p>
          </div>
        </div>
        <div className="bg-yellow-50 p-8 border-r border-slate-100 flex items-center gap-5">
          <FiPhone className="text-yellow-600 w-8 h-8" />
          <div>
            <p className="text-[11px] font-black text-yellow-900 uppercase">
              Bulk Orders
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1">
              +91 9441081125
            </p>
          </div>
        </div>
        <div className="bg-emerald-50 p-8 flex items-center gap-5">
          <FiMail className="text-emerald-600 w-8 h-8" />
          <div>
            <p className="text-[11px] font-black text-emerald-900 uppercase">
              Order Related
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1">
              info@jumboxerox.com
            </p>
          </div>
        </div>
      </section>

      {/* --- BUSINESS NEEDS (GRID) --- */}
      <section className="py-24 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-16 uppercase tracking-[0.2em] text-slate-800">
            Business Needs
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
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
              <div
                key={i}
                className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition-all group"
              >
                <div className="h-44 bg-slate-50 rounded-xl mb-4 overflow-hidden">
                  <img
                    src={item.i}
                    alt={item.n}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <p className="font-bold text-[10px] uppercase text-slate-600 tracking-tighter">
                  {item.n}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOME DECORATIVES (SWIPER) --- */}
      <section className="py-24 bg-white px-4 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16 uppercase tracking-[0.2em] text-slate-800">
            Home Decoratives
          </h2>
          <div className="px-10">
            <Swiper
              modules={[Autoplay, Navigation]}
              autoplay={{ delay: 3000 }}
              navigation={true}
              loop={true}
              spaceBetween={20}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              className="decor-swiper pb-10"
            >
              {[s1, s2, s3, s4, s5, s6].map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden group">
                    <div className="h-64 overflow-hidden relative">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
