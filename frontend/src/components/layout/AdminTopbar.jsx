import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  Globe,
  User,
  ChevronRight,
  Home as HomeIcon,
  Settings,
  X,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ShoppingCart,
  UserPlus,
  Loader2,
  Save,
  Menu,
  LogOut,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from "../../redux/slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import toast from "react-hot-toast";

const AdminTopbar = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const location = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState({ orders: [], users: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target))
        setShowProfileMenu(false);
      if (notifRef.current && !notifRef.current.contains(event.target))
        setShowNotifications(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const { data } = await api.get("/admin/stats");
        const newNotifs = [];
        if (data.todayOrders?.pending > 0)
          newNotifs.push({
            id: 1,
            type: "warning",
            title: "Pending Orders",
            msg: `${data.todayOrders.pending} orders need processing.`,
            icon: <ShoppingCart size={14} />,
            link: "/admin/orders",
          });
        if (data.disk?.isLowSpace)
          newNotifs.push({
            id: 2,
            type: "critical",
            title: "Storage Critical",
            msg: `Server storage full (${data.disk.percentFree} free).`,
            icon: <AlertTriangle size={14} />,
            link: "/admin/settings",
          });
        else
          newNotifs.push({
            id: 3,
            type: "success",
            title: "System Stable",
            msg: "Workers active. Storage healthy.",
            icon: <CheckCircle2 size={14} />,
            link: "/admin",
          });
        setNotifications(newNotifs);
        setUnreadCount(newNotifs.length);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAlerts();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    setIsSearchOpen(true);
    try {
      const { data } = await api.get(`/admin/search?query=${searchTerm}`);
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    toast.success("Admin Profile Updated!");
    setIsProfileModalOpen(false);
  };

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <>
      <header className="h-20 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 bg-white/5 rounded-xl text-slate-400 border border-white/10"
          >
            <Menu size={20} />
          </button>
          <nav className="hidden md:flex items-center text-[10px] font-black uppercase tracking-[0.2em]">
            <Link
              to="/admin"
              className="text-slate-500 hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <HomeIcon size={14} />
              <span>Admin</span>
            </Link>
            {pathnames.map((name, index) => {
              if (name === "admin") return null;
              return (
                <div key={index} className="flex items-center">
                  <ChevronRight size={12} className="mx-3 text-slate-700" />
                  <span
                    className={`${
                      index === pathnames.length - 1
                        ? "text-blue-400"
                        : "text-slate-500"
                    }`}
                  >
                    {name}
                  </span>
                </div>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          <form
            onSubmit={handleSearch}
            className="relative hidden lg:block group"
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-12 pr-12 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-slate-900 transition-all w-64 focus:w-80 placeholder:text-slate-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="lg:hidden p-2.5 bg-white/5 rounded-xl border border-white/5 text-slate-400"
          >
            <Search size={20} />
          </button>
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              to="/"
              className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white bg-white/5 px-4 py-2.5 rounded-xl border border-white/5 hover:bg-white/10 transition-all"
            >
              <Globe size={14} className="text-blue-400" /> Site
            </Link>
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all group"
              >
                <Bell
                  size={20}
                  className="text-slate-400 group-hover:text-white transition-colors"
                />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2.5 bg-red-500 w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]"></span>
                )}
              </button>
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-14 w-80 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
                  >
                    <h4 className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-white/5 bg-slate-950/50">
                      System Alerts
                    </h4>
                    <div className="py-1">
                      {notifications.map((n) => (
                        <Link
                          to={n.link}
                          key={n.id}
                          onClick={() => setShowNotifications(false)}
                          className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                        >
                          <div
                            className={`mt-1 ${
                              n.type === "critical"
                                ? "text-red-500"
                                : n.type === "warning"
                                ? "text-yellow-500"
                                : "text-emerald-500"
                            }`}
                          >
                            {n.icon}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-200">
                              {n.title}
                            </p>
                            <p className="text-xs text-slate-500">{n.msg}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div
              className="relative pl-0 md:pl-4 border-l-0 md:border-l border-white/5"
              ref={profileRef}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-[2px] shadow-lg shadow-blue-500/20"
              >
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-white">
                  <User size={20} />
                </div>
              </motion.button>
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-14 w-56 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-white/5 mb-2">
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                        Signed in as
                      </p>
                      <p className="text-sm text-white font-bold truncate">
                        {user?.name}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsProfileModalOpen(true);
                        setShowProfileMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-bold text-left"
                    >
                      <Settings size={16} /> Admin Settings
                    </button>
                    <div className="h-[1px] bg-white/5 my-2" />
                      <button
                        onClick={() => dispatch(logout())}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-bold text-left"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {isProfileModalOpen && (
          <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-white/10 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
                <h3 className="text-xl font-black text-white">Admin Profile</h3>
                <button
                  onClick={() => setIsProfileModalOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleUpdateProfile} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                    Admin Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500/50 outline-none font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                    Email (Read Only)
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    disabled
                    className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-slate-500 font-bold cursor-not-allowed"
                  />
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
                  >
                    <Save size={18} /> Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isSearchOpen && (
          <div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-white/5 flex items-center gap-4">
                <Search className="text-blue-400" size={20} />
                <input
                  autoFocus
                  type="text"
                  className="flex-1 bg-transparent text-lg text-white font-bold outline-none placeholder:text-slate-600"
                  placeholder="Type to search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
                {isSearching ? (
                  <div className="p-10 text-center text-slate-500">
                    <Loader2 className="animate-spin inline mr-2" />{" "}
                    Searching...
                  </div>
                ) : (
                  <>
                    {searchResults.orders?.length > 0 && (
                      <div className="mb-2">
                        <h4 className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                          Orders
                        </h4>
                        {searchResults.orders.map((o) => (
                          <div
                            key={o._id}
                            onClick={() => {
                              navigate("/admin/orders");
                              setIsSearchOpen(false);
                            }}
                            className="flex gap-4 p-3 hover:bg-white/5 rounded-xl cursor-pointer group"
                          >
                            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                              <FileText size={18} />
                            </div>
                            <div>
                              <p className="text-white font-bold text-sm">
                                Order #{o._id.slice(-6)}
                              </p>
                              <p className="text-xs text-slate-500">
                                {o.user?.name} • ₹{o.totalAmount}
                              </p>
                            </div>
                            <ChevronRight
                              size={16}
                              className="ml-auto text-slate-600 group-hover:text-white"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    {searchResults.users?.length > 0 && (
                      <div>
                        <h4 className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                          Users
                        </h4>
                        {searchResults.users.map((u) => (
                          <div
                            key={u._id}
                            onClick={() => {
                              navigate("/admin/users");
                              setIsSearchOpen(false);
                            }}
                            className="flex gap-4 p-3 hover:bg-white/5 rounded-xl cursor-pointer group"
                          >
                            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
                              <UserIcon size={18} />
                            </div>
                            <div>
                              <p className="text-white font-bold text-sm">
                                {u.name}
                              </p>
                              <p className="text-xs text-slate-500">
                                {u.email}
                              </p>
                            </div>
                            <ChevronRight
                              size={16}
                              className="ml-auto text-slate-600 group-hover:text-white"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
export default AdminTopbar;
