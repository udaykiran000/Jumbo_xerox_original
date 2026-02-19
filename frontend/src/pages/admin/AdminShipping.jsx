import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Truck,
  Send,
  CheckCircle,
  Package,
  User,
  Loader2,
  MapPin,
} from "lucide-react";

export default function AdminShipping() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/admin/orders?limit=100");
      const allOrders = data.orders || [];
      // Only Delivery orders
      const deliveryOrders = allOrders.filter(
        (o) => o.deliveryMode === "Delivery"
      );
      setOrders(deliveryOrders);
    } catch (e) {
      toast.error("Orders load failed");
    } finally {
      setLoading(false);
    }
  };

  const handleShiprocket = async (id) => {
    const toastId = toast.loading("Connecting to Shiprocket...");
    try {
      const { data } = await api.post(`/admin/order/${id}/ship`);
      toast.success("Shipment Created! ID: " + data.data.shipment_id, {
        id: toastId,
      });
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || "Shipping failed", {
        id: toastId,
      });
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-slate-500 font-bold uppercase tracking-[0.3em]">
        <Loader2 className="animate-spin mb-4 text-blue-500" size={32} />{" "}
        Syncing Logistics...
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-white flex items-center gap-3">
          <Truck className="text-blue-500" /> Shipping Management
        </h2>
        <div className="bg-blue-600/10 text-blue-500 px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest">
          {orders.length} Ready for Dispatch
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="p-6 text-[10px] font-black uppercase text-slate-500">
                  Customer
                </th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-500">
                  Destination
                </th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-500">
                  Status
                </th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-500">
                  Tracking Info
                </th>
                <th className="p-6 text-center text-[10px] font-black uppercase text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-20 text-center text-slate-500 italic"
                  >
                    No delivery orders found.
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr key={o._id} className="hover:bg-white/[0.02]">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-blue-400">
                          <User size={18} />
                        </div>
                        <p className="text-white font-bold leading-none">
                          {o.user?.name || "Unknown"}
                        </p>
                      </div>
                    </td>
                    <td className="p-6 text-xs text-white/80 font-mono">
                      <MapPin size={12} className="inline mr-1" />
                      {o.shippingAddress?.city || "Missing Address"}
                    </td>
                    <td className="p-6">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                          o.status === "Completed"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="p-6 text-[10px] text-slate-500">
                      {o.shipmentId
                        ? `SID: ${o.shipmentId}`
                        : "Waiting for Label..."}
                    </td>
                    <td className="p-6 text-center">
                      {!o.shipmentId ? (
                        o.status === "Completed" ? (
                          <button
                            onClick={() => handleShiprocket(o._id)}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase mx-auto flex items-center gap-2"
                          >
                            <Send size={14} /> Ship Now
                          </button>
                        ) : (
                          <span className="text-slate-500 text-[10px] font-bold italic">
                            Wait for Print
                          </span>
                        )
                      ) : (
                        <div className="text-emerald-500 font-black text-[10px] flex items-center justify-center gap-1">
                          <CheckCircle size={14} /> Shipped
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
