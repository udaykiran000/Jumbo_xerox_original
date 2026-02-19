import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  Search,
  Trash2,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    isActive: true,
  });

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/admin/users?page=${page}&limit=10`);
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (e) {
      toast.error("Load failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post("/admin/users", newUser);
      toast.success("Account Created!");
      setNewUser({ name: "", email: "", password: "", isActive: true });
      fetchUsers(1);
    } catch (e) {
      toast.error(e.response?.data?.message || "Add failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const { data } = await api.patch(`/admin/user/toggle/${id}`);
      setUsers(
        users.map((u) => (u._id === id ? { ...u, isActive: data.isActive } : u))
      );
      toast.success(`User updated!`);
    } catch (e) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* RESPONSIVE HEADER & FORM */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 md:p-4 bg-blue-50 text-blue-600 rounded-xl md:rounded-2xl">
            <Users size={28} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Directory
            </p>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Customers
            </h1>
          </div>
        </div>

        {/* ADD USER CARD (Single col on mobile) */}
        <div className="w-full lg:w-auto bg-white p-5 md:p-6 rounded-3xl border border-gray-200 shadow-sm flex-1 max-w-2xl">
          <form
            onSubmit={handleAddUser}
            className="grid grid-cols-1 md:grid-cols-4 gap-3"
          >
            <input
              required
              type="text"
              placeholder="Name"
              className="bg-gray-50 border-gray-200 rounded-lg p-3 text-sm font-medium w-full focus:ring-2 focus:ring-blue-500 outline-none"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="bg-gray-50 border-gray-200 rounded-lg p-3 text-sm font-medium w-full focus:ring-2 focus:ring-blue-500 outline-none"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <input
              required
              type="password"
              placeholder="Password"
              className="bg-gray-50 border-gray-200 rounded-lg p-3 text-sm font-medium w-full focus:ring-2 focus:ring-blue-500 outline-none"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-blue-600 text-white rounded-lg text-xs font-bold py-3 px-6 flex items-center justify-center gap-2 hover:bg-blue-700 shadow-sm transition-all"
            >
              {isSubmitting ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                "Add Customer"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* SEARCH BAR (Mobile full width) */}
      <div className="relative w-full">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />
        <input
          type="text"
              placeholder="Search customers..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* SCROLLABLE USER TABLE */}
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-100 text-xs font-semibold uppercase text-slate-500 tracking-wide">
                <th className="p-6">User Info</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="3"
                    className="p-20 text-center text-slate-400 font-bold italic"
                  >
                    Loading list...
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr
                    key={u._id}
                    className="hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="p-5">
                      <p className="text-sm font-black text-slate-800">
                        {u.name}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400">
                        {u.email}
                      </p>
                    </td>
                    <td className="p-5">
                      <span
                        className={`flex items-center gap-1.5 text-[9px] font-black uppercase px-3 py-1 rounded-full w-fit ${
                          u.isActive
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {u.isActive ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <XCircle size={12} />
                        )}{" "}
                        {u.isActive ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleToggleStatus(u._id)}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-[9px] font-black uppercase"
                        >
                          Toggle
                        </button>
                        <button className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION (Responsive Stack) */}
        <div className="p-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/30">
          <p className="text-[10px] font-bold text-gray-400 uppercase">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 bg-white border border-gray-200 rounded-xl"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 bg-white border border-gray-200 rounded-xl"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
