import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext"; // Removed
import api from "../../services/api"; // Static Import
import Breadcrumbs from "../common/Breadcrumbs";
import {
  LayoutDashboard,
  ShoppingCart,
  Truck,
  Trash2,
  Users,
  CreditCard,
  MessageSquare,
  Settings,
  LogOut,
  Printer,
  Mail,
  Phone,
  Menu,
  X,
  Database,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats, selectNotifications } from "../../redux/slices/dashboardSlice";
import { selectUser, logout } from "../../redux/slices/authSlice";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // const dispatch = useDispatch(); // Removed duplicate
  const notifications = useSelector(selectNotifications);

  // Debugging route logs
  useEffect(() => {
    console.log(`[NAV-LOG] Current View: ${location.pathname}`);
  }, [location]);

  // Business Context Menu Items
  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingCart size={18} /> },
    { name: "Shipments", path: "/admin/shipments", icon: <Truck size={18} /> },
    {
      name: "Delete Files", // Fixed capitalization
      path: "/admin/delete-files",
      icon: <Trash2 size={18} />,
    },
    {
      name: "Customers",
      path: "/admin/users",
      icon: <Users size={18} />,
    },
    {
      name: "Payments",
      path: "/admin/payments",
      icon: <CreditCard size={18} />,
    },
    {
      name: "Enquiries",
      path: "/admin/contact-messages",
      icon: <MessageSquare size={18} />,
    },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={18} /> },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Redux: Fetch on Mount & Poll
  useEffect(() => {
    dispatch(fetchDashboardStats());
    const interval = setInterval(() => dispatch(fetchDashboardStats()), 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const getBadge = (path) => {
    if (!notifications) return null;
    
    if (path === "/admin/orders" && notifications.pendingOrders > 0) return notifications.pendingOrders;
    if (path === "/admin/shipments" && notifications.pendingShipments > 0) return notifications.pendingShipments;
    if (path === "/admin/contact-messages" && notifications.unreadMessages > 0) return notifications.unreadMessages;
    if (path === "/admin/delete-files" && notifications.fileCleanup > 0) return notifications.fileCleanup;
    return null;
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans text-slate-800">
      {/* 1. CLEAN BUSINESS HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 h-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-full flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="xl:hidden p-2 hover:bg-slate-50 rounded-lg text-slate-500"
            >
              <Menu size={20} />
            </button>
            <Link to="/admin" className="flex items-center gap-3">
              <div className="bg-slate-900 p-1.5 rounded-md">
                <Printer className="text-white" size={18} />
              </div>
              <div className="flex flex-col border-l border-slate-200 pl-3">
                <span className="text-sm font-bold text-slate-900 leading-tight">
                  Admin Console
                </span>
                <span className="text-[11px] font-medium text-slate-500 leading-tight">
                  Jumbo Xerox
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu - Functional Business Style */}
          <nav className="hidden xl:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const badge = getBadge(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 rounded-md text-[13px] font-semibold transition-colors flex items-center gap-2 ${
                    isActive
                      ? "text-blue-600 bg-blue-50/50"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {item.name}
                  {badge && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none">
                      {badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="w-px h-4 bg-slate-200 mx-3" />
            <button
              onClick={handleLogout}
              className="px-3 py-2 text-[13px] font-bold text-red-600 hover:bg-red-50 rounded-md"
            >
              Log Out
            </button>
          </nav>
        </div>
      </header>

      {/* 2. MOBILE SIDEBAR */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-[2px] z-[100] xl:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[101] xl:hidden flex flex-col shadow-xl"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-900">
                  Store Management
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold ${
                      location.pathname === item.path
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item.icon} {item.name}
                    {getBadge(item.path) && (
                      <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {getBadge(item.path)}
                      </span>
                    )}
                  </Link>
                ))}
                
                {/* Mobile Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors mt-4"
                >
                  <LogOut size={18} /> Log Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 3. MAIN INTERFACE */}
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 md:px-10 py-10">
        <div className="mb-8">
          <Breadcrumbs />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl border border-slate-200 p-6 md:p-10 shadow-sm"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* 4. REALISTIC BUSINESS FOOTER */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-12 px-6">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-1 space-y-4">
            <h2 className="text-slate-900 text-lg font-bold">Jumbo Xerox</h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Internal store operations portal. Manage orders, track shipments,
              and oversee customer support.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm font-semibold text-slate-600">
              <li>
                <Link to="/admin" className="hover:text-blue-600">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/orders" className="hover:text-blue-600">
                  Pending Orders
                </Link>
              </li>
              <li>
                <Link to="/admin/users" className="hover:text-blue-600">
                  Customers
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Support Enquiries
            </h3>
            <ul className="space-y-2 text-sm font-semibold text-slate-600">
              <li>
                <Link
                  to="/admin/contact-messages"
                  className="hover:text-blue-600"
                >
                  Inbound Messages
                </Link>
              </li>
              <li>
                <Link to="/admin/settings" className="hover:text-blue-600">
                  Store Settings
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Contact Store
            </h3>
            <div className="space-y-2 text-sm font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-slate-400" />{" "}
                support@jumboxerox.com
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-slate-400" /> +91 9441081125
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-[12px] font-bold text-slate-400">
          <p>© 2026 Jumbo Xerox Operations</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="flex items-center gap-1.5">
              <Database size={14} /> Database: Sync OK
            </span>
            <span>Software v2.5.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
