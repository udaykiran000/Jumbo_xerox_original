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
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "../../components/common/Animations";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const { data } = await api.get("/admin/stats");
      setStats(data);
    } catch (error) {
      console.error("Dashboard sync failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleActivityClick = (item) => {
    if (item.type === "order") {
      navigate("/admin/orders", { state: { openOrderId: item._id } });
    } else {
      navigate("/admin/users");
    }
  };

  if (loading)
    return (
      <div className="h-96 flex flex-col items-center justify-center text-blue-500 gap-4">
        <Loader2 className="animate-spin" size={32} />
        <p className="font-medium text-sm text-slate-400">
          Loading Dashboard Data...
        </p>
      </div>
    );

  const cards = [
    {
      title: "Total Orders",
      value: stats?.todayOrders?.total || 0,
      icon: <ShoppingBag size={20} />,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
    {
      title: "Active Processing",
      value: stats?.processing || 0,
      icon: <Activity size={20} />,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      title: "Completed Today",
      value: stats?.todayOrders?.completed || 0,
      icon: <CheckCircle2 size={20} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      title: "Total Revenue",
      value: `₹${stats?.totalRev?.toLocaleString()}`,
      sub: `Today: ₹${stats?.todayRev}`,
      icon: <IndianRupee size={20} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      title: "Customer Base",
      value: stats?.totalUsers || 0,
      icon: <Users size={20} />,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-100",
    },
    {
      title: "New Registrations",
      value: stats?.todayReg || 0,
      icon: <UserPlus size={20} />,
      color: "text-pink-600",
      bg: "bg-pink-50",
      border: "border-pink-100",
    },
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="space-y-8 font-sans"
    >
      {/* 1. HEADER */}
      <div className="flex justify-between items-end border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome back, here's what's happening in your store today.
          </p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
            Last Sync
          </p>
          <p className="text-sm font-semibold text-slate-700">
            {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* 2. STATS GRID (Clean Cards) */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {cards.map((card, i) => (
          <motion.div
            key={i}
            variants={scaleIn}
            whileHover={{ y: -5 }}
            className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-3 rounded-lg ${card.bg} ${card.color} border ${card.border} transition-colors`}
              >
                {card.icon}
              </div>
              {card.sub && (
                <span className="text-xs font-medium text-slate-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                  {card.sub}
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-slate-500">{card.title}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              {card.value}
            </h3>
          </motion.div>
        ))}
      </motion.div>

      {/* 3. RECENT ACTIVITY (List Style) */}
      <motion.div 
        variants={fadeInUp}
        className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Activity className="text-slate-400" size={18} /> Recent Activity
          </h3>
          <button
            onClick={() => navigate("/admin/orders")}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            View All Orders
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {!stats?.recentActivity || stats.recentActivity.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              No recent activity recorded.
            </div>
          ) : (
            stats.recentActivity.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleActivityClick(item)}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    item.type === "order"
                      ? "bg-blue-50 text-blue-600 border border-blue-100"
                      : "bg-purple-50 text-purple-600 border border-purple-100"
                  }`}
                >
                  {item.type === "order" ? (
                    <ShoppingCart size={18} />
                  ) : (
                    <UserPlus size={18} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900 text-sm truncate">
                      {item.type === "order"
                        ? item.user?.name || "Customer"
                        : item.name}
                    </p>
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      {new Date(item.activityTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">
                    {item.type === "order"
                      ? `Placed order #${item._id?.slice(-6).toUpperCase()} • ₹${item.totalAmount}`
                      : `Newly registered via ${item.email}`}
                  </p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-slate-300 group-hover:text-slate-500"
                />
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
