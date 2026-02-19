import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  UserPlus,
  Loader2,
  ArrowLeft,
  Phone,
  ShieldCheck,
  RefreshCcw,
  CheckCircle2,
  Printer,
  Sparkles
} from "lucide-react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import { 
  fadeInUp, 
  staggerContainer, 
  scaleIn, 
} from "../../components/common/Animations";
import MaskedHeading from "../../components/common/MaskedHeading";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State variables
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [otpValue, setOtpValue] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);

  const { name, email, phone, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Timer Effect
  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleRegisterRequest = async (e) => {
    if (e) e.preventDefault();
    if (password !== confirmPassword) return toast.error("Passwords do not match");
    if (phone.length < 10) return toast.error("Invalid phone number");

    setLoading(true);
    try {
      const { data } = await api.post("/auth/register-request", { name, email, phone, password });
      toast.success(`OTP sent to ${phone}`);
      
      // OTP Test Mode: Auto-fill
      if (data.otp) {
        toast.success(`TEST MODE: OTP ${data.otp}`, { icon: "🔐" });
        setOtpValue(data.otp);
      }

      setStep(2);
      setOtpTimer(60);
    } catch (error) {
       toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Final Verify & Create Account
  const handleFinalizeRegister = async () => {
    if (otpValue.length < 6) return toast.error("Enter 6-digit code");

    setLoading(true);
    try {
      const { data } = await api.post("/auth/register-verify", {
        ...formData,
        otp: otpValue,
      });
      toast.success("Identity Verified. Welcome!");
      
      // Dispatch Redux action
      dispatch(loginSuccess(data.token));
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid Code");
    } finally {
      setLoading(false);
    }
  };

  const footerCards = [
    {
      icon: <ShieldCheck size={20} />,
      title: "Store Pickup",
      desc: "Available only at Guntur Branch",
      color: "blue"
    },
    {
      icon: <RefreshCcw size={20} />,
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex flex-col font-sans">
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <motion.div 
            className="w-full max-w-md"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
        >
          {/* Header Card */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-t-2xl shadow-2xl p-8 text-center">
            <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm"
            >
              <UserPlus className="w-8 h-8 text-white" />
            </motion.div>
            <div className="overflow-hidden">
                <MaskedHeading className="text-3xl font-extrabold text-white mb-2 inline-block">
                    Create Account
                </MaskedHeading>
            </div>
            <motion.p 
                variants={fadeInUp}
                className="text-purple-100 text-sm"
            >
                Join Jumbo Xerox today
            </motion.p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-b-2xl shadow-2xl p-8 border-t-4 border-purple-600">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <UserPlus className="w-6 h-6 text-purple-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Registration Details
                      </h2>
                    </div>
                  </div>

                  <form className="space-y-5" onSubmit={handleRegisterRequest}>
                    <InputGroup
                      label="Full Name"
                      icon={<User className="w-5 h-5" />}
                      name="name"
                      value={name}
                      onChange={onChange}
                      placeholder="Enter your full name"
                      color="purple"
                    />
                    <InputGroup
                      label="Email Address"
                      icon={<Mail className="w-5 h-5" />}
                      name="email"
                      type="email"
                      value={email}
                      onChange={onChange}
                      placeholder="your.email@example.com"
                      color="purple"
                    />
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                        Mobile Number
                        </label>
                        <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors">
                            <Phone className="w-5 h-5" />
                        </div>
                        <input
                            type="tel"
                            name="phone"
                            value={phone}
                            onChange={onChange}
                            placeholder="9876543210"
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-gray-50 focus:bg-white"
                        />
                        </div>
                        <p className="text-gray-500 text-xs mt-2 ml-1">We'll send a verification code to this number</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                        Password
                        </label>
                        <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors">
                            <Lock className="w-5 h-5" />
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Minimum 6 characters"
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-gray-50 focus:bg-white"
                        />
                        </div>
                        <p className="text-gray-500 text-xs mt-2 ml-1">Minimum 6 characters required</p>
                    </div>

                    <InputGroup
                      label="Confirm Password"
                      icon={<CheckCircle2 className="w-5 h-5" />}
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={onChange}
                      placeholder="Confirm your password"
                      color="purple"
                    />

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Send OTP"
                      )}
                    </motion.button>
                  </form>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-600">Already have an account? 
                        <Link to="/login" className="text-purple-600 hover:text-purple-800 font-bold transition-colors ml-1">Login</Link>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
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
                    className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-xl mb-6"
                  >
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-purple-800 text-sm font-semibold mb-1">
                          Verification Code Sent!
                        </p>
                        <p className="text-purple-700 text-sm">
                          We've sent a verification code to{" "}
                          <strong>{phone}</strong>
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                        Enter OTP Code
                    </label>
                    <input
                        type="text"
                        maxLength="6"
                        placeholder="000000"
                        className="w-full px-4 py-4 rounded-xl border-2 border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-center text-3xl tracking-[0.5em] font-bold text-gray-900"
                        value={otpValue}
                        onChange={(e) =>
                        setOtpValue(e.target.value.replace(/\D/g, ""))
                        }
                    />
                    <p className="text-gray-500 text-xs mt-2 text-center">
                        Enter the 6-digit code sent to your mobile
                    </p>
                   </div>

                    <div className="flex justify-between items-center px-2 mb-4">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        {otpTimer > 0 ? `Resend in ${otpTimer}s` : "Code Expired"}
                    </p>
                    <button
                        disabled={otpTimer > 0}
                        onClick={handleRegisterRequest}
                        className="text-[10px] font-black text-purple-600 uppercase tracking-widest flex items-center gap-1 disabled:opacity-30 hover:text-purple-800"
                    >
                        <RefreshCcw size={12} /> Resend OTP
                    </button>
                    </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading || otpValue.length < 6}
                    onClick={handleFinalizeRegister}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl mb-4 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Verify & Create Account"
                    )}
                  </motion.button>
                  
                  <div className="mt-6 text-center">
                    <button
                        onClick={() => setStep(1)}
                        className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center justify-center gap-1 mx-auto"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Start Over
                    </button>
                   </div>

                   <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-600">Already have an account? 
                        <Link to="/login" className="text-purple-600 hover:text-purple-800 font-bold transition-colors ml-1">Login</Link>
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

const InputGroup = ({
  label,
  icon,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  color = "blue", // Allow distinct colors for focus states
}) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
      {label}
    </label>
    <div className="relative group">
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-${color}-600 transition-colors`}>
        {icon}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-11 pr-4 focus:bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-${color}-500/20 focus:border-${color}-500 transition-all text-base`}
      />
    </div>
  </div>
);
