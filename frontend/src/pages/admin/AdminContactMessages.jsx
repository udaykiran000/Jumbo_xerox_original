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
    <div className="space-y-6 animate-in fade-in duration-500 font-sans pb-20">
      {/* 1. HEADER & STATS */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
             Contact Messages
          </h1>
          <p className="text-sm text-slate-500 mt-1">
             Manage customer inquiries and messages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full lg:w-auto flex-1 max-w-3xl">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Total
              </p>
              <h3 className="text-xl font-bold text-slate-900 mt-1">{stats.total}</h3>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Mail size={20} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Unread
              </p>
              <h3 className="text-xl font-bold text-orange-600 mt-1">
                {stats.unread}
              </h3>
            </div>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <Bell size={20} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Read
              </p>
              <h3 className="text-xl font-bold text-emerald-600 mt-1">
                {stats.read}
              </h3>
            </div>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle2 size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. MESSAGES LIST */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm min-h-[400px]">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50 flex items-center gap-2">
            <MessageSquare className="text-slate-500" size={18} />
            <h3 className="font-bold text-slate-800">Inbox</h3>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center p-12 text-slate-400 font-medium">
              <Loader2 className="animate-spin mr-2" /> Syncing inbox...
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
              <div className="p-4 bg-gray-50 rounded-full text-gray-400 border border-gray-200">
                <Mail size={32} />
              </div>
              <h4 className="text-lg font-bold text-slate-800">
                No contact messages yet
              </h4>
              <p className="text-sm text-slate-500">
                Messages from the contact form will appear here
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {messages.map((m) => (
                <div
                  key={m._id}
                  className={`p-5 rounded-xl border transition-all flex flex-col md:flex-row md:items-center gap-4 ${
                    m.isRead
                      ? "bg-white border-gray-200"
                      : "bg-blue-50/50 border-blue-100 shadow-sm"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg w-fit ${
                      m.isRead
                        ? "bg-gray-100 text-gray-500"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    <User size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-slate-900 text-sm">
                        {m.name}
                      </p>
                      {!m.isRead && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-xs font-mono text-slate-500 mb-1">
                      {m.email}
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {m.message}
                    </p>
                  </div>
                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 md:gap-1 mt-2 md:mt-0 pl-0 md:pl-4 border-t md:border-t-0 border-gray-100 pt-3 md:pt-0">
                    <p className="text-xs text-slate-400 font-medium">
                      {new Date(m.createdAt).toLocaleDateString("en-IN", {
                          day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </p>
                    <button
                      onClick={() => markAsRead(m._id)}
                      className={`p-2 rounded-lg border transition-all text-xs font-semibold flex items-center gap-1 ${
                        m.isRead
                          ? "bg-gray-50 text-gray-400 cursor-default border-transparent"
                          : "bg-white text-blue-600 hover:bg-blue-50 border-blue-200 shadow-sm"
                      }`}
                      disabled={m.isRead}
                    >
                      {m.isRead ? (
                          <>Read <CheckCircle2 size={12}/></>
                      ) : (
                          <>Mark Read <Eye size={12}/></>
                      )}
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
