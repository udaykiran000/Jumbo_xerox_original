import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  CreditCard,
  IndianRupee,
  CheckCircle2,
  Search,
  Eye,
  FileText,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalCount: 0, totalRev: 0 });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    console.log("[DEBUG-PAY] Fetching paid transactions...");
    try {
      const { data } = await api.get("/admin/orders");
      // Filter only "Paid" orders
      const paidOnly = data.orders.filter((o) => o.paymentStatus === "Paid");
      setPayments(paidOnly);
      const rev = paidOnly.reduce((acc, curr) => acc + curr.totalAmount, 0);
      setStats({ totalCount: paidOnly.length, totalRev: rev });
    } catch (e) {
      toast.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. HEADER & STATS CARDS (Image 3 Top) */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 shadow-sm">
            <CreditCard size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Payment Management
            </p>
            <h1 className="text-3xl font-black text-slate-900">Payments</h1>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full lg:w-auto flex-1 max-w-3xl">
          <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase text-slate-400">
                Total Payments
              </p>
              <h3 className="text-xl font-black">{stats.totalCount}</h3>
            </div>
            <div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase text-slate-400">
                Total Revenue
              </p>
              <h3 className="text-xl font-black">₹{stats.totalRev}</h3>
            </div>
            <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
              <IndianRupee size={18} />
            </div>
          </div>
          <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between hidden md:flex">
            <div>
              <p className="text-[9px] font-black uppercase text-slate-400">
                Showing
              </p>
              <h3 className="text-xl font-black">1-{payments.length}</h3>
            </div>
            <div className="p-2 bg-purple-50 text-purple-500 rounded-xl">
              <FileText size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. BRIGHT PAYMENTS TABLE (Image 3 Table) */}
      <div className="bg-white border border-gray-200 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="bg-emerald-600 p-6 flex items-center gap-3">
          <CheckCircle2 className="text-white" size={20} />
          <h3 className="text-white font-black text-lg">Paid Payments</h3>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                <th className="p-6">Order ID</th>
                <th className="p-6">Customer</th>
                <th className="p-6 text-center">Amount</th>
                <th className="p-6">Payment ID</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-center">Date</th>
                <th className="p-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-bold text-slate-700">
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="p-20 text-center animate-pulse text-slate-400 italic"
                  >
                    Syncing transactions...
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr
                    key={p._id}
                    className="hover:bg-emerald-50/20 transition-colors"
                  >
                    <td className="p-6 text-blue-600 font-black">
                      #{p._id.slice(-4)}
                    </td>
                    <td className="p-6">
                      <p className="font-black text-slate-900">
                        {p.user?.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {p.user?.email}
                      </p>
                    </td>
                    <td className="p-6 text-center text-slate-900 font-black italic">
                      ₹{p.totalAmount}
                    </td>
                    <td className="p-6 text-[10px] font-mono text-slate-400">
                      {p.paymentId || "N/A"}
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[9px] font-black uppercase">
                        {p.status}
                      </span>
                    </td>
                    <td className="p-6 text-center text-[10px] text-slate-400 uppercase tracking-tighter">
                      {new Date(p.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="p-6 text-center">
                      <button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
