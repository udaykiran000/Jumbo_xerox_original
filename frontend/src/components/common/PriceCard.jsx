import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, ArrowRight, Star } from "lucide-react";

export default function PriceCard({
  title,
  price,
  sub,
  features,
  highlight = false,
  saving = "",
}) {
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative p-1 rounded-[2.6rem] transition-all duration-500 overflow-hidden flex flex-col h-full ${
        highlight
          ? "bg-gradient-to-b from-blue-500 to-cyan-600 shadow-[0_0_50px_rgba(37,99,235,0.25)]"
          : "bg-white/10 hover:bg-white/20 border border-white/10 shadow-xl"
      }`}
    >
      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-[35deg] animate-[shine_3s_infinite]" />
      </div>

      {/* Inner Content Box */}
      <div
        className={`relative h-full p-8 rounded-[2.5rem] flex flex-col justify-between ${
          highlight ? "bg-slate-950" : "bg-slate-900/90 backdrop-blur-3xl"
        }`}
      >
        <div>
          {/* Badge Section */}
          {(highlight || saving) && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-2">
              {highlight && (
                <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1 whitespace-nowrap">
                  <Zap size={10} className="fill-current" /> Best Value
                </span>
              )}
              {saving && (
                <span className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                  Save {saving}
                </span>
              )}
            </div>
          )}

          <div className="flex justify-between items-start mb-6">
            <div
              className={`p-3 rounded-2xl ${
                highlight ? "bg-blue-500/10" : "bg-white/5"
              }`}
            >
              {highlight ? (
                <Star className="text-blue-400" size={24} />
              ) : (
                <Zap className="text-slate-400" size={24} />
              )}
            </div>
          </div>

          <h3
            className={`text-lg font-bold mb-2 tracking-tight ${
              highlight ? "text-blue-400" : "text-slate-200"
            }`}
          >
            {title}
          </h3>

          <div className="mb-8">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-500 italic">
                ₹
              </span>
              <span className="text-6xl font-black tracking-tighter text-white">
                {price}
              </span>
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                / {sub}
              </span>
            </div>
          </div>

          <ul className="space-y-4 mb-10">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 group/item">
                <div
                  className={`mt-0.5 p-1 rounded-full transition-colors ${
                    highlight
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-white/5 text-slate-500 group-hover/item:text-cyan-400"
                  }`}
                >
                  <CheckCircle2 size={14} />
                </div>
                <span className="text-sm font-medium text-slate-400 group-hover/item:text-slate-200 transition-colors">
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto">
          <button
            className={`w-full group/btn relative flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 active:scale-95 overflow-hidden ${
              highlight
                ? "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_10px_30px_rgba(37,99,235,0.3)]"
                : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
            }`}
          >
            <span>Select {title}</span>
            <ArrowRight
              size={16}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>

      {highlight && (
        <div className="absolute -inset-10 bg-blue-600/10 blur-[60px] -z-10 rounded-full animate-pulse" />
      )}
    </motion.div> 
  );
}
