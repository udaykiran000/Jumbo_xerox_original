import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Printer,
  Sparkles,
} from "lucide-react";
import api from "../../services/api";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // Ensure navigate is used
  const dispatch = useDispatch();

  // Remove useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", { email, password });
      toast.success(`Welcome back, ${data.name}!`);
      
      // Dispatch Redux action
      dispatch(loginSuccess(data.token));
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Invalid credentials";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* 1. Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/40 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-[440px]"
      >
        {/* Logo / Icon */}
        <div className="flex justify-center mb-8">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="p-4 bg-blue-600 rounded-[2rem] shadow-2xl shadow-blue-500/30 text-white"
          >
            <Printer size={32} />
          </motion.div>
        </div>

        {/* 2. Login Card */}
        <div className="bg-white backdrop-blur-2xl border border-slate-200 p-8 md:p-10 rounded-[3rem] shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-500 text-sm font-medium italic">
              "Quality prints are just a login away."
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-slate-50 border border-slate-200 p-4 pl-12 rounded-2xl text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 font-bold"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[10px] font-black uppercase text-blue-600 hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-50 border border-slate-200 p-4 pl-12 rounded-2xl text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 font-bold"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative group bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-500/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Sign In{" "}
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </div>
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </form>

          {/* Social / Trust Badge */}
          <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <ShieldCheck size={14} className="text-emerald-500" /> Secure
              Encryption Active
            </div>

            <p className="text-slate-500 text-sm font-medium">
              New to Jumbo Xerox?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-black hover:text-blue-800 transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Floating Decorative Icon */}
        <div className="absolute -top-6 -right-6 text-blue-500/20 animate-pulse">
          <Sparkles size={40} />
        </div>
      </motion.div>
    </div>
  );
}
