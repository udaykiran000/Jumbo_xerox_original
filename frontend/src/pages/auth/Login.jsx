import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Printer,
  Sparkles,
  Smartphone,
} from "lucide-react";
import api from "../../services/api";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import { 
  fadeInUp, 
  staggerContainer, 
  scaleIn, 
  pageTransition
} from "../../components/common/Animations";
import MaskedHeading from "../../components/common/MaskedHeading";

export default function Login() {
  const [loginMethod, setLoginMethod] = useState("choice"); // choice, email, mobile
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Timer logic for OTP
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle Email Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      toast.success(`Welcome back, ${data.name}!`);
      dispatch(loginSuccess(data.token));
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // Handle Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (mobile.length < 10) return toast.error("Please enter a valid mobile number");
    
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login-otp-request", { phone: mobile });
      toast.success(data.message);
      setShowOtpInput(true);
      setTimer(60); // 60s cooldown
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length < 6) return toast.error("Please enter a valid OTP");

    setLoading(true);
    try {
      const { data } = await api.post("/auth/login-otp-verify", { phone: mobile, otp });
      toast.success(`Welcome back, ${data.name}!`);
      dispatch(loginSuccess(data.token));
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const footerCards = [
    {
      icon: <Printer size={20} />,
      title: "Store Pickup",
      desc: "Available only at Guntur Branch",
      color: "blue"
    },
    {
      icon: <Sparkles size={20} />,
      title: "Bulk Orders",
      desc: "Call +91 9441081125",
      color: "yellow"
    },
    {
      icon: <Mail size={20} />,
      title: "Order Support",
      desc: "Email info@jumboxerox.com",
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col font-sans">
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <motion.div 
          className="w-full max-w-md"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {/* Header Card */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-t-2xl shadow-2xl p-8 text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm"
            >
              <Printer className="w-8 h-8 text-white" />
            </motion.div>
            <div className="overflow-hidden">
                <MaskedHeading className="text-3xl font-extrabold text-white mb-2 inline-block">
                    Welcome Back
                </MaskedHeading>
            </div>
            <motion.p 
              variants={fadeInUp}
              className="text-blue-100 text-sm"
            >
                Login to manage your print orders
            </motion.p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-b-2xl shadow-2xl p-8 border-t-4 border-blue-600">
            <AnimatePresence mode="wait">
              {/* CHOICE SCREEN */}
              {loginMethod === "choice" && (
                <motion.div
                  key="choice"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <p className="text-gray-700 text-center font-semibold mb-6 text-lg">
                    Choose your login method
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setLoginMethod("mobile")}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                  >
                    <Smartphone size={20} />
                    Login with Mobile OTP
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setLoginMethod("email")}
                    className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                  >
                    <Mail size={20} />
                    Login with Email & Password
                  </motion.button>

                  <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{" "}
                      <Link
                        to="/register"
                        className="text-blue-600 hover:text-blue-800 font-bold transition-colors"
                      >
                        Create Account
                      </Link>
                    </p>
                  </div>
                </motion.div>
              )}

              {/* MOBILE OTP SCREEN */}
              {loginMethod === "mobile" && (
                <motion.div
                  key="mobile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {!showOtpInput ? (
                    <>
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Smartphone className="w-6 h-6 text-blue-600" />
                          </div>
                          <h2 className="text-xl font-bold text-gray-900">
                            Mobile OTP Login
                          </h2>
                        </div>
                      </div>

                      <form onSubmit={handleSendOtp}>
                        <div className="mb-6">
                          <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                            Mobile Number
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Smartphone className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                              type="tel"
                              value={mobile}
                              onChange={(e) =>
                                setMobile(e.target.value.replace(/\D/g, ""))
                              }
                              placeholder="9876543210"
                              maxLength={10}
                              required
                              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
                            />
                          </div>
                          <p className="text-gray-500 text-xs mt-2 ml-1">
                            Enter your 10-digit mobile number
                          </p>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            "Send OTP"
                          )}
                        </motion.button>
                      </form>
                    </>
                  ) : (
                    <>
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <ShieldCheck className="w-6 h-6 text-green-600" />
                          </div>
                          <h2 className="text-xl font-bold text-gray-900">
                            Verify OTP
                          </h2>
                        </div>
                      </div>

                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-xl mb-6"
                      >
                        <div className="flex items-start gap-3">
                          <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-blue-800 text-sm font-semibold mb-1">
                              Verification Code Sent!
                            </p>
                            <p className="text-blue-700 text-sm">
                              We've sent a verification code to{" "}
                              <strong>{mobile}</strong>
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <form onSubmit={handleVerifyOtp}>
                        <div className="mb-6">
                          <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                            Enter OTP Code
                          </label>
                          <input
                            type="text"
                            value={otp}
                            onChange={(e) =>
                              setOtp(e.target.value.replace(/\D/g, ""))
                            }
                            maxLength={6}
                            required
                            className="w-full px-4 py-4 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-3xl tracking-[0.5em] font-bold text-gray-900"
                            placeholder="000000"
                          />
                          <p className="text-gray-500 text-xs mt-2 text-center">
                            Enter the 6-digit code sent to your mobile
                          </p>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl mb-4 flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            "Verify & Login"
                          )}
                        </motion.button>

                        <div className="text-center">
                          {timer > 0 ? (
                            <span className="text-xs text-slate-400 font-medium">
                              Resend OTP in {timer}s
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={handleSendOtp}
                              className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
                            >
                              Resend OTP
                            </button>
                          )}
                        </div>
                      </form>
                    </>
                  )}

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => {
                        setLoginMethod("choice");
                        setShowOtpInput(false);
                      }}
                      className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center justify-center gap-1 mx-auto"
                    >
                      <ArrowRight className="rotate-180 w-4 h-4" />
                      Back to Login Options
                    </button>
                  </div>
                </motion.div>
              )}

              {/* EMAIL LOGIN SCREEN */}
              {loginMethod === "email" && (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Mail className="w-6 h-6 text-gray-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Email Login
                      </h2>
                    </div>
                  </div>

                  <form onSubmit={handleEmailLogin}>
                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
                        />
                      </div>
                      <div className="text-right mt-2">
                        <Link
                          to="/forgot-password"
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Login"
                      )}
                    </motion.button>
                  </form>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setLoginMethod("choice")}
                      className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center justify-center gap-1 mx-auto"
                    >
                      <ArrowRight className="rotate-180 w-4 h-4" />
                      Back to Login Options
                    </button>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{" "}
                      <Link
                        to="/register"
                        className="text-blue-600 hover:text-blue-800 font-bold transition-colors"
                      >
                        Create Account
                      </Link>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      {/* Notes Section Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 w-full">
        <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-4 md:grid-cols-3"
        >
          {footerCards.map((card, idx) => (
            <motion.div
                key={idx}
                variants={scaleIn}
                whileHover={{ scale: 1.03 }}
                className={`bg-gradient-to-r from-${card.color}-50 to-${card.color}-100 border-l-4 border-${card.color}-500 text-${card.color}-800 p-5 rounded-xl shadow-sm`}
            >
                <div className="flex items-center gap-2 mb-2">
                <div className="p-1 bg-white/50 rounded">
                    {card.icon}
                </div>
                <strong className="font-bold">{card.title}</strong>
                </div>
                <p className="text-sm">
                    {card.title === "Bulk Orders" && "Call "}
                    {card.title === "Order Support" && "Email "}
                    <b>{card.desc.replace("Call ", "").replace("Email ", "")}</b>
                </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
