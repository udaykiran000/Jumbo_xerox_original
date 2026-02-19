import React, { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("[DEBUG-UI] Triggering public contact message submission...");
    setLoading(true);
    try {
      // Endpoint created in Packet 9 backend
      await api.post("/admin/public/contact", formData);
      console.log("[DEBUG-UI] Success: Message received by server.");
      setSent(true);
      toast.success("Message Sent!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (sent)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 animate-in zoom-in duration-500">
        <div className="bg-emerald-100 text-emerald-600 p-8 rounded-full mb-8 shadow-xl shadow-emerald-100/50">
          <CheckCircle2 size={64} strokeWidth={2.5} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">
          Enquiry Received
        </h2>
        <p className="text-slate-500 mt-3 font-medium max-w-sm">
          Thank you for reaching out. Our support team will respond to your
          email shortly.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-10 px-8 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-200"
        >
          Send Another
        </button>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 space-y-16 animate-in fade-in duration-700 font-sans">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
          GET IN <span className="text-blue-600">TOUCH</span>
        </h1>
        <p className="text-slate-500 font-bold max-w-2xl mx-auto text-sm md:text-base">
          Experience premium document solutions. Send us a message for queries
          or bulk orders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-900/5 space-y-12">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl shrink-0 shadow-inner">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Direct Line
                </p>
                <h4 className="font-black text-slate-900">+91 9441081125</h4>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl shrink-0 shadow-inner">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Mail Inbox
                </p>
                <h4 className="font-black text-slate-900 text-sm">
                  support@jumboxerox.com
                </h4>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl shrink-0 shadow-inner">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Store Hub
                </p>
                <h4 className="font-black text-slate-900 leading-relaxed text-sm italic">
                  9th Line, Arundelpet, Guntur, AP
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[3rem] border border-gray-200 shadow-2xl shadow-blue-900/5">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-3 tracking-[0.2em]">
                  Full Identity
                </label>
                <input
                  required
                  type="text"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-3 tracking-[0.2em]">
                  Contact Email
                </label>
                <input
                  required
                  type="email"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-sm font-bold focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="name@email.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 ml-3 tracking-[0.2em]">
                How can we help?
              </label>
              <textarea
                required
                rows="5"
                className="w-full bg-gray-50 border border-gray-100 rounded-3xl p-5 text-sm font-bold focus:ring-2 focus:ring-blue-500/20 transition-all outline-none resize-none"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Describe your requirement in detail..."
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-3xl flex items-center justify-center gap-4 transition-all shadow-xl shadow-blue-500/30 active:scale-95"
            >
              {loading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <Send size={24} />
              )}
              <span className="uppercase tracking-widest text-sm">
                Deploy Message
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
