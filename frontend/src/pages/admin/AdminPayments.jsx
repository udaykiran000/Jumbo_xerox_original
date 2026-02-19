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
    <div className="space-y-6 animate-in fade-in duration-500 font-sans">
      {/* 1. HEADER & STATS CARDS */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
             Financial Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
             Track revenue and payment status.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full lg:w-auto flex-1 max-w-3xl">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Total Payments
              </p>
              <h3 className="text-xl font-bold text-slate-900 mt-1">{stats.totalCount}</h3>
            </div>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Total Revenue
              </p>
              <h3 className="text-xl font-bold text-slate-900 mt-1">₹{stats.totalRev}</h3>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <IndianRupee size={20} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between hidden md:flex">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Recent
              </p>
              <h3 className="text-xl font-bold text-slate-900 mt-1">1-{payments.length}</h3>
            </div>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <FileText size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. PAYMENTS TABLE */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50 flex items-center gap-2">
            <CheckCircle2 className="text-slate-500" size={18} />
            <h3 className="font-bold text-slate-800">Successful Transactions</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3 text-center">Amount</th>
                <th className="px-6 py-3">Payment Ref</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Date</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-12 text-center text-slate-500">
                    <Loader2 className="animate-spin mx-auto mb-2" size={20}/>
                    Syncing transactions...
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr
                    key={p._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs font-medium text-blue-600">
                      #{p._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">
                        {p.user?.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {p.user?.email}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center font-medium">
                      ₹{p.totalAmount}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-500">
                      {p.paymentId || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-xs text-slate-500">
                      {new Date(p.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-slate-400 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                        <Eye size={18} />
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
