import React, { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import {
  Trash2,
  AlertTriangle,
  RotateCcw,
  FileText,
  CheckCircle2,
  AlertCircle,
  Search,
  Clock,
  Calendar,
} from "lucide-react";

export default function AdminDeleteFiles() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // --- 1. CORE LOGIC: MULTI-TIMER ARCHITECTURE (Refactored) ---
  // timers: { [orderId]: secondsRemaining } for Visuals
  const [timers, setTimers] = useState({});
  // timeouts: { [orderId]: timeoutID } for Logic execution
  const timeouts = useRef({});

  useEffect(() => {
    fetchOrders();
    // Cleanup on unmount: clear all pending timeouts
    return () => {
      Object.values(timeouts.current).forEach((id) => clearTimeout(id));
    };
  }, []);

  // Global Visual Ticker: Decrements all active visual timers
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const next = { ...prev };
        let hasChanges = false;
        Object.keys(next).forEach((id) => {
          if (next[id] > 0) {
            next[id] -= 1;
            hasChanges = true;
          }
        });
        return hasChanges ? next : prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    // console.log("[DEBUG-FILE] Fetching holistic storage metadata...");
    try {
      setLoading(true);
      // Holistic Connectivity: Fetching both Paid (Finalized) and Unpaid orders
      const { data } = await api.get("/admin/orders-for-deletion");
      setOrders(data.orders || []);
    } catch (e) {
      toast.error("Failed to load storage data");
    } finally {
      setLoading(false);
    }
  };

  const triggerDeletion = (id) => {
    // 1. Set Visual Timer
    setTimers((prev) => ({ ...prev, [id]: 7 }));
    toast("Asset purge will execute in 7s...", { icon: "⏳" });

    // 2. Schedule Execution (Independent of Render Cycle)
    if (timeouts.current[id]) clearTimeout(timeouts.current[id]);
    
    timeouts.current[id] = setTimeout(() => {
      commitDeletion(id);
    }, 7000);
  };

  const cancelDeletion = (id) => {
    // 1. Clear Execution
    if (timeouts.current[id]) {
      clearTimeout(timeouts.current[id]);
      delete timeouts.current[id];
    }
    // 2. Clear Visual
    setTimers((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    toast.success("Purge Cancelled", { icon: "🔄" });
  };

  const commitDeletion = async (id) => {
    try {
      // Clear local state first to update UI immediately
      setTimers((prev) => {
         const next = { ...prev };
         delete next[id];
         return next;
      });
      delete timeouts.current[id];

      await api.delete(`/admin/order/files/${id}`);
      toast.success("Disk storage cleared!");
      fetchOrders();
    } catch (e) {
      toast.error(e.response?.data?.message || "File purge protocol failed");
    }
  };

  // Micro-Logic: Filtering based on ID, Name or Payment Status
  const filteredOrders = orders.filter(
    (o) =>
      o.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.paymentStatus?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o._id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 font-sans">
      {/* HEADER & SEARCH BAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 shadow-sm">
            <Trash2 size={32} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Actions
            </p>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              File Management
            </h1>
          </div>
        </div>

        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-500 outline-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* STORAGE TABLE */}
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl">
        <div className="bg-slate-900 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="text-slate-400" size={20} />
            <h3 className="text-white font-bold text-lg">
              Purge Queue
            </h3>
          </div>
          <span className="text-xs font-medium text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            Total: {filteredOrders.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold uppercase text-slate-500 tracking-wide">
                <th className="p-6">Order ID</th>
                <th className="p-6">Customer / Payment</th>
                <th className="p-6 text-center">Age</th>
                <th className="p-6 text-center">Status</th>
                <th className="p-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-20 text-center animate-pulse text-[10px] font-black uppercase text-slate-300"
                  >
                    Syncing storage state...
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => {
                  const daysOld = Math.floor(
                    (new Date() - new Date(o.createdAt)) /
                      (1000 * 60 * 60 * 24),
                  );
                  const isStale = daysOld >= 2; // Flag for older orders
                  const isCounting = timers[o._id] !== undefined;

                  return (
                    <tr
                      key={o._id}
                      className={`transition-all ${o.filesDeleted ? "bg-gray-50/50 grayscale opacity-60" : "hover:bg-red-50/20"}`}
                    >
                      <td className="p-7 text-blue-600 font-black italic text-sm">
                        #{o._id.slice(-6).toUpperCase()}
                      </td>
                      <td className="p-7">
                        <p className="font-black text-slate-900 text-sm uppercase">
                          {o.user?.name || "N/A"}
                        </p>
                        <span
                          className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md border inline-block mt-1 ${
                            o.paymentStatus === "Paid"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                              : "bg-amber-50 text-amber-600 border-amber-100"
                          }`}
                        >
                          {o.paymentStatus}
                        </span>
                      </td>
                      <td className="p-7 text-center">
                        <div
                          className={`flex flex-col items-center ${isStale ? "text-red-500" : "text-slate-400"}`}
                        >
                          <Calendar size={14} />
                          <span className="text-[10px] font-black mt-1 uppercase tracking-tighter">
                            {daysOld} Days Old
                          </span>
                        </div>
                      </td>
                      <td className="p-7 text-center">
                        <div className="flex items-center justify-center gap-1.5 bg-purple-50 text-purple-600 py-1.5 px-4 rounded-xl border border-purple-100 w-fit mx-auto">
                          <FileText size={12} />
                          <span className="text-[10px] font-black">
                            {o.files.length} Assets on Disk
                          </span>
                        </div>
                      </td>
                      <td className="p-7">
                        <div className="flex justify-center items-center">
                          {o.filesDeleted ? (
                            <span className="text-[9px] font-black uppercase text-slate-400 bg-gray-100 px-4 py-2 rounded-xl border flex items-center gap-2 italic tracking-widest">
                              <CheckCircle2 size={12} /> Assets Purged
                            </span>
                          ) : isCounting ? (
                            <button
                              onClick={() => cancelDeletion(o._id)}
                              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black flex items-center gap-2 shadow-xl shadow-blue-200 animate-pulse"
                            >
                              <RotateCcw size={14} /> STOP ({timers[o._id]}s)
                            </button>
                          ) : (
                            <button
                              onClick={() => triggerDeletion(o._id)}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-red-700 transition-all shadow-sm active:scale-95"
                            >
                              <Trash2 size={14} /> DELETE PERMANENTLY
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SYSTEM SECURITY NOTICE */}
      <div className="bg-orange-50 border border-orange-100 p-8 rounded-3xl flex items-start gap-5 shadow-sm">
        <AlertCircle className="text-orange-500 shrink-0 mt-1" size={28} />
        <div className="space-y-2">
          <p className="text-[12px] font-black text-orange-800 uppercase tracking-widest">
            Autonomous Purge Protocol
          </p>
          <p className="text-[10px] font-bold text-orange-700 leading-relaxed uppercase italic">
            Integrity Notice: Manual purging permanently removes PDF/Asset
            streams from the server. User details, price settlements, and
            service logs are strictly preserved for audit trails. Use this
            master control for Unpaid or Finalized records older than 48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
