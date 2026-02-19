import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import {
  MessageSquare,
  Mail,
  Bell,
  CheckCircle2,
  Trash2,
  Eye,
  User,
  Clock,
  Search,
  Loader2,
} from "lucide-react";

export default function AdminContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0 });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    console.log("[DEBUG-MSG] Fetching contact enquiries...");
    try {
      const { data } = await api.get("/admin/messages");
      setMessages(data);
      setStats({
        total: data.length,
        unread: data.filter((m) => !m.isRead).length,
        read: data.filter((m) => m.isRead).length,
      });
    } catch (e) {
      toast.error("Messages load failed");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.patch(`/admin/messages/${id}/read`);
      toast.success("Message marked as read");
      fetchMessages();
    } catch (e) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. HEADER & STATS (Image 1 Style) */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100 shadow-sm">
            <MessageSquare size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Contact Management
            </p>
            <h1 className="text-3xl font-black text-slate-900">
              Contact Messages
            </h1>
            <p className="text-xs font-bold text-slate-500 mt-1 italic">
              View and manage customer inquiries and messages
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full lg:w-auto flex-1 max-w-3xl">
          <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase text-slate-400">
                Total Messages
              </p>
              <h3 className="text-xl font-black">{stats.total}</h3>
            </div>
            <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
              <Mail size={18} />
            </div>
          </div>
          <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase text-slate-400">
                Unread Messages
              </p>
              <h3 className="text-xl font-black text-orange-600">
                {stats.unread}
              </h3>
            </div>
            <div className="p-2 bg-orange-50 text-orange-500 rounded-xl">
              <Bell size={18} />
            </div>
          </div>
          <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase text-slate-400">
                Read Messages
              </p>
              <h3 className="text-xl font-black text-emerald-600">
                {stats.read}
              </h3>
            </div>
            <div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl">
              <CheckCircle2 size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. MESSAGES CONTAINER (Image 1 Style) */}
      <div className="bg-white border border-gray-200 rounded-[2.5rem] overflow-hidden shadow-sm min-h-[400px]">
        <div className="bg-gray-50/80 p-6 border-b border-gray-100 flex items-center gap-3">
          <h3 className="text-slate-800 font-black text-lg">All Messages</h3>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="flex justify-center p-20 italic text-slate-400 font-bold animate-pulse">
              Syncing inbox...
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-center space-y-4">
              <div className="p-6 bg-gray-50 rounded-3xl text-gray-400 border border-gray-100">
                <Mail size={48} />
              </div>
              <h4 className="text-xl font-black text-slate-800">
                No contact messages yet
              </h4>
              <p className="text-xs font-bold text-slate-400">
                Messages from the contact form will appear here
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {messages.map((m) => (
                <div
                  key={m._id}
                  className={`p-6 rounded-3xl border transition-all flex items-center gap-6 ${
                    m.isRead
                      ? "bg-white border-gray-100 grayscale-[0.5]"
                      : "bg-blue-50/30 border-blue-100 shadow-sm"
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl ${
                      m.isRead
                        ? "bg-gray-100 text-gray-400"
                        : "bg-blue-600 text-white shadow-lg shadow-blue-100"
                    }`}
                  >
                    <User size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-slate-900 text-sm flex items-center gap-2">
                      {m.name}{" "}
                      {!m.isRead && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                      )}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase italic mb-1">
                      {m.email}
                    </p>
                    <p className="text-xs font-bold text-slate-600 truncate">
                      {m.message}
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div className="hidden md:block">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        Received
                      </p>
                      <p className="text-[10px] font-bold text-slate-500">
                        {new Date(m.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => markAsRead(m._id)}
                      className={`p-2.5 rounded-xl border transition-all ${
                        m.isRead
                          ? "bg-gray-50 text-gray-400"
                          : "bg-white text-blue-600 hover:bg-blue-600 hover:text-white border-blue-100 shadow-sm"
                      }`}
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
