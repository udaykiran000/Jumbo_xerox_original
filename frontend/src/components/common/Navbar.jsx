import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Printer,
  LogOut,
  Menu,
  X,
  Zap,
  Info,
  Phone,
  LayoutDashboard,
  User,
  Settings,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from "../../redux/slices/authSlice";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("[DEBUG-AUTH] User Logging out from Navbar...");
    dispatch(logout());
    setIsOpen(false);
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `relative px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
      isActive
        ? "text-blue-600 bg-blue-50 shadow-inner"
        : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
    }`;

  return (
    <nav className="sticky top-0 w-full z-[50] bg-white/90 backdrop-blur-xl border-b border-slate-100 py-3 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
              <Printer size={24} />
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tighter uppercase">
              Jumbo<span className="text-blue-600">Xerox</span>
            </span>
          </Link>

          {/* Desktop Navigation (Center) */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              <Info size={16} className="text-slate-400" /> About
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              <Phone size={16} className="text-slate-400" /> Contact
            </NavLink>

            <NavLink to="/quick-print" className={navLinkClass}>
              <Zap size={16} className="text-orange-500 fill-orange-500" />
              Quick Print
            </NavLink>
          </div>

          {/* Auth/User Action Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                {/* UPGRADE: Dashboard Link for Desktop Users */}
                <NavLink to="/dashboard" className={navLinkClass}>
                  <LayoutDashboard size={18} /> Dashboard
                </NavLink>

                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-black text-xs uppercase">
                    {user.name?.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    {user.name}
                  </span>
                </Link>

                {/* Admin Quick Link */}
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="p-2.5 text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all"
                  >
                    <LayoutDashboard size={20} />
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-slate-600 font-bold hover:text-blue-600 transition-colors text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 p-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-300">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={navLinkClass}
          >
            Home
          </NavLink>
          <NavLink
            to="/services"
            onClick={() => setIsOpen(false)}
            className={navLinkClass}
          >
            Services
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={navLinkClass}
          >
            About Jumbo
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={navLinkClass}
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/quick-print"
            onClick={() => setIsOpen(false)}
            className={navLinkClass}
          >
            <Zap size={16} className="text-orange-500" /> Quick Print
          </NavLink>

          <div className="h-[1px] bg-slate-100 my-4" />

          {user ? (
            <>
              <NavLink
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className={navLinkClass}
              >
                <LayoutDashboard size={16} /> User Dashboard
              </NavLink>
              <NavLink
                to="/profile"
                onClick={() => setIsOpen(false)}
                className={navLinkClass}
              >
                <User size={16} /> My Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-500 font-bold bg-red-50 rounded-xl flex items-center gap-2 mt-4"
              >
                <LogOut size={18} /> Logout Session
              </button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-center p-3 rounded-xl border border-slate-200 font-bold text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="text-center p-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-100"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
