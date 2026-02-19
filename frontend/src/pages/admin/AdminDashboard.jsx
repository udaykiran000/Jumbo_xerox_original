import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  ShoppingBag,
  Activity,
  CheckCircle2,
  IndianRupee,
  Users,
  UserPlus,
  ArrowUpRight,
  ShoppingCart,
  Clock,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    console.log("[DEBUG-UI] Syncing Holistic Admin Stats...");
    try {
      const { data } = await api.get("/admin/stats");
      setStats(data);
      console.log("[DEBUG-UI] Dashboard Data Synced successfully.");
    } catch (error) {
      console.error("[DEBUG-UI-ERR] Dashboard sync failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- ACTION: Navigate to Order Details ---
  const handleActivityClick = (item) => {
    if (item.type === "order") {
      console.log(`[DEBUG-NAV] Directing to Order Detail: ${item._id}`);
      // Passing state to AdminOrders page to auto-open the modal
      navigate("/admin/orders", { state: { openOrderId: item._id } });
    } else {
      navigate("/admin/users");
    }
  };

  if (loading)
    return (
      <div className="h-96 flex flex-col items-center justify-center text-blue-600 gap-4">
        <Loader2 className="animate-spin" size={32} />
        <p className="font-semibold text-sm uppercase tracking-wider">
          Loading Dashboard...
        </p>
      </div>
    );

  const cards = [
    {
      title: "Total Orders",
      value: stats?.todayOrders?.total || 0,
      color: "bg-[#7c3aed]",
      icon: <ShoppingBag size={24} />,
    },
    {
      title: "Active Processing",
      value: stats?.processing || 0,
      color: "bg-[#f59e0b]",
      icon: <Activity size={24} />,
    },
    {
      title: "Completed Today",
      value: stats?.todayOrders?.completed || 0,
      color: "bg-[#10b981]",
      icon: <CheckCircle2 size={24} />,
    },
    {
      title: "Revenue Stream",
      value: `₹${stats?.totalRev?.toLocaleString()}`,
      sub: `Today: ₹${stats?.todayRev}`,
      color: "bg-[#2563eb]",
      icon: <IndianRupee size={24} />,
    },
    {
      title: "Customer Base",
      value: stats?.totalUsers || 0,
      color: "bg-[#8b5cf6]",
      icon: <Users size={24} />,
    },
    {
      title: "New Registrations",
      value: stats?.todayReg || 0,
      color: "bg-[#ec4899]",
      icon: <UserPlus size={24} />,
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 font-sans">
      {/* 1. HEADER SECTION (BRIGHT UI) */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            Overview
          </p>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Dashboard
          </h1>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Last Sync
          </p>
          <p className="text-xs font-bold text-slate-600">
            {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* 2. RESPONSIVE COLORFUL CARDS (Sync with Image 9) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`${card.color} p-8 rounded-3xl text-white shadow-2xl shadow-blue-900/10 relative overflow-hidden group cursor-default`}
          >
            <div className="relative z-10">
              <div className="bg-white/20 w-fit p-4 rounded-2xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <p className="text-xs font-bold uppercase tracking-wide opacity-70 mb-1">
                {card.title}
              </p>
              <h3 className="text-3xl font-bold tracking-tight">
                {card.value}
              </h3>
              {card.sub && (
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-tight">
                    {card.sub}
                  </p>
                  <ArrowUpRight size={14} className="opacity-50" />
                </div>
              )}
            </div>
            {/* Background Aesthetic Blur */}
            <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-[60px] group-hover:bg-white/20 transition-all duration-500" />
          </motion.div>
        ))}
      </div>

      {/* 3. RECENT ACTIVITY HUB (Actionable UI) */}
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl shadow-blue-900/5 animate-in slide-in-from-bottom duration-700">
        <div className="p-8 md:p-10 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <h3 className="font-bold text-lg text-slate-800 flex items-center gap-3">
            <Activity className="text-blue-600" size={20} /> Recent Activity
          </h3>
          <button
            onClick={() => navigate("/admin/orders")}
            className="text-xs font-bold uppercase tracking-wide bg-blue-600 text-white px-6 py-2.5 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
          >
            Manage All
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-4">
          {!stats?.recentActivity || stats.recentActivity.length === 0 ? (
            <div className="p-20 text-center italic text-slate-400 font-bold">
              No recent activities to show.
            </div>
          ) : (
            stats.recentActivity.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleActivityClick(item)}
                className="flex items-center gap-5 p-6 rounded-3xl bg-white border border-gray-100 hover:border-blue-300 hover:bg-blue-50/20 transition-all cursor-pointer group"
              >
                <div
                  className={`p-4 rounded-2xl shadow-sm group-hover:shadow-lg transition-all ${
                    item.type === "order"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-purple-50 text-purple-600"
                  }`}
                >
                  {item.type === "order" ? (
                    <ShoppingCart size={22} />
                  ) : (
                    <UserPlus size={22} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900 text-sm">
                      {item.type === "order"
                        ? `${item.user?.name || "Customer"} placed a New Order`
                        : `${item.name} joined Jumbo Xerox`}
                    </p>
                    {!item.isRead && item.type === "order" && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {item.type === "order"
                      ? `₹${item.totalAmount} • ${item.paymentMethod} • #${item._id?.slice(-6).toUpperCase()}`
                      : `${item.email}`}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                    {new Date(item.activityTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <div className="flex justify-end mt-1">
                    <ArrowUpRight
                      size={16}
                      className="text-slate-200 group-hover:text-blue-500 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
