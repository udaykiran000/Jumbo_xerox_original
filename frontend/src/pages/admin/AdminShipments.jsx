import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  Package,
  Clock,
  CheckCircle2,
  Search,
  MapPin,
  Eye,
  FileText,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X,
  RefreshCw,
} from "lucide-react";

export default function AdminShipments() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [trackingData, setTrackingData] = useState(null);

  // Fetch Tracking Data when shipment is selected
  useEffect(() => {
    if (selectedShipment && selectedShipment.shipmentId) {
      const fetchTracking = async () => {
        try {
          const res = await api.get(
            `/admin/shipment/track/${selectedShipment._id}`
          );
          setTrackingData(res.data.tracking_data);
        } catch (e) {
          console.error("Tracking Error:", e);
        }
      };
      fetchTracking();
    } else {
      setTrackingData(null);
    }
  }, [selectedShipment]);

  useEffect(() => {
    fetchShipmentOrders();
  }, []);

  const fetchShipmentOrders = async () => {
    console.log("[DEBUG-SHIP] Fetching shipment ready orders...");
    try {
      const { data } = await api.get("/admin/orders");
      // Filter orders that are either Paid or marked for Delivery
      setOrders(
        data.orders.filter(
          (o) => o.deliveryMode === "Delivery"
        )
      );
    } catch (e) {
      toast.error("Shipment data load failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. STATS SECTION (Image 6 Top) */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100 shadow-sm">
            <Truck size={32} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Logistics Management
            </p>
            <h1 className="text-3xl font-black text-slate-900">
              Manage Shipments
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full lg:w-auto flex-1 max-w-3xl">
          <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase text-slate-400">
                Total Orders
              </p>
              <h3 className="text-xl font-black">{orders.length}</h3>
            </div>
            <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
              <Package size={18} />
            </div>
          </div>
          <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase text-slate-400">
                Shipped
              </p>
              <h3 className="text-xl font-black">0</h3>
            </div>
            <div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase text-slate-400">
                Pending Shipment
              </p>
              <h3 className="text-xl font-black">{orders.length}</h3>
            </div>
            <div className="p-2 bg-orange-50 text-orange-500 rounded-xl">
              <Clock size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. SHIPMENTS TABLE (Image 6 Table) */}
      <div className="bg-white border border-gray-200 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="bg-[#5c67f2] p-6 flex items-center gap-3">
          <Truck className="text-white" size={20} />
          <h3 className="text-white font-black text-lg italic">
            Paid Orders Ready for Shipment
          </h3>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                <th className="p-6">Order ID</th>
                <th className="p-6">Customer</th>
                <th className="p-6 text-center">Amount</th>
                <th className="p-6">Status</th>
                <th className="p-6">Shipment ID</th>
                <th className="p-6">Shipping Status</th>
                <th className="p-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-bold text-slate-700">
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="p-20 text-center animate-pulse text-slate-400"
                  >
                    Syncing shipments...
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr
                    key={o._id}
                    className="hover:bg-blue-50/20 transition-colors"
                  >
                    <td className="p-6 text-blue-600 font-black">
                      #{o._id.slice(-4)}
                    </td>
                    <td className="p-6">
                      <p className="font-black text-slate-900">
                        {o.user?.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {o.user?.email}
                      </p>
                    </td>
                    <td className="p-6 text-center italic">₹{o.totalAmount}</td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[9px] font-black uppercase">
                        {o.status}
                      </span>
                    </td>
                    <td className="p-6 text-[10px] font-mono text-slate-400 italic">
                      {o.shipmentId ? o.shipmentId.slice(-8) : "Not Created"}
                    </td>
                    <td className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      {o.shipmentId ? "Shipped" : "Not Shipped"}
                    </td>
                    <td className="p-6 text-center">
                      {o.status === "Completed" && !o.shipmentId && (
                        <button
                          onClick={() => setSelectedShipment(o)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black hover:bg-blue-700 flex items-center gap-2 mx-auto"
                        >
                          + Create Shipment
                        </button>
                      )}
                      {o.status === "Completed" && o.shipmentId && (
                        <button
                          onClick={() => setSelectedShipment(o)}
                          className="bg-purple-600 text-white px-4 py-2 rounded-xl text-[10px] font-black hover:bg-purple-700 flex items-center gap-2 mx-auto"
                        >
                          <Eye size={14} /> View Tracking
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. TRACKING DRAWER (Image 10 Style) */}
      <AnimatePresence>
        {selectedShipment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm font-sans">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden h-[90vh] flex flex-col relative"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <button
                  onClick={() => setSelectedShipment(null)}
                  className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest hover:translate-x-[-4px] transition-all"
                >
                  <ChevronLeft size={16} /> Back to Shipments
                </button>
                <button className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100">
                  <RefreshCw size={18} />
                </button>
              </div>

              <div className="p-10 overflow-y-auto space-y-8">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl">
                    <Package size={32} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                      Shiprocket Tracking
                    </p>
                    <h2 className="text-3xl font-black text-slate-900">
                      Shipment #{selectedShipment._id.slice(-8)}
                    </h2>
                    <p className="text-xs font-bold text-slate-400 mt-1 italic">
                      Real-time tracking and delivery information
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-full text-blue-600 border border-blue-200">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase">
                        Current Status
                      </p>
                      <h3 className="text-xl font-black text-slate-800">
                        {trackingData?.current_status || "Pending"}
                      </h3>
                    </div>
                  </div>
                  <span className="px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-[10px] font-black uppercase">
                    {trackingData?.current_status || "Pending"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[#2563eb] p-8 rounded-[2rem] text-white space-y-6 shadow-xl shadow-blue-100 relative overflow-hidden">
                    <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                      <FileText size={16} /> Shipment Information
                    </h4>
                    <div className="grid grid-cols-2 gap-y-6 relative z-10">
                      <div>
                        <p className="text-[9px] font-black uppercase opacity-60">
                          Shipment ID
                        </p>
                        <p className="text-xs font-black">
                          {selectedShipment._id.slice(-10)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase opacity-60">
                          Order ID
                        </p>
                        <p className="text-xs font-black">
                          #{selectedShipment._id.slice(-4)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase opacity-60">
                          AWB Number
                        </p>
                        <p className="text-xs font-black italic opacity-80">
                          {selectedShipment.shipmentId || "Pending Assignment"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase opacity-60">
                          Order Amount
                        </p>
                        <p className="text-lg font-black italic">
                          ₹{selectedShipment.totalAmount}
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                  </div>

                  <div className="bg-emerald-600 p-8 rounded-[2rem] text-white space-y-6 shadow-xl shadow-emerald-100">
                    <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                      <MapPin size={16} /> Customer Details
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[9px] font-black uppercase opacity-60">
                          Name
                        </p>
                        <p className="text-sm font-black">
                          {selectedShipment.user?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase opacity-60">
                          Email
                        </p>
                        <p className="text-xs font-bold truncate">
                          {selectedShipment.user?.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase opacity-60">
                          Phone
                        </p>
                        <p className="text-xs font-bold italic">
                          {selectedShipment.user?.phone || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 p-10 rounded-[2.5rem] flex flex-col text-center space-y-4 border-dashed">
                  <h4 className="text-lg font-black text-slate-800">
                    Tracking Timeline
                  </h4>
                  <p className="text-xs font-bold text-slate-400 max-w-sm">
                    Tracking information will be available once the shipment is
                    processed by the courier.
                  </p>
                </div>
              </div>

              <div className="p-8 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                {!selectedShipment.shipmentId && (
                  <button
                    onClick={async () => {
                      try {
                        console.log("Sending Create Request...");
                        const { data } = await api.post("/admin/shipment/create", {
                          orderId: selectedShipment._id,
                        });
                        console.log("Create Response:", data);
                        
                        toast.success("Shipment Generated!");
                        
                        // Update local state to show buttons immediately
                        const updatedShipment = {
                           ...selectedShipment,
                           shipmentId: data.order.shipmentId,
                           awbNumber: data.order.awbNumber
                        };
                        console.log("Updating State to:", updatedShipment);
                        setSelectedShipment(updatedShipment);
                        
                        fetchShipmentOrders(); // Refresh list to update background
                      } catch (e) {
                         console.error("Create Failed:", e);
                        toast.error("Failed to create shipment");
                      }
                    }}
                    className="bg-blue-600 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase shadow-lg shadow-blue-100"
                  >
                    Generate Shipment ID
                  </button>
                )}
                
                {selectedShipment.shipmentId && (
                  <button
                    onClick={async () => {
                      try {
                        const { data } = await api.get(
                          `/admin/shipment/label/${selectedShipment._id}`
                        );
                        if (data.labelUrl) {
                          window.open(data.labelUrl, "_blank");
                        } else {
                          toast.error("Label not generated yet");
                        }
                      } catch (e) {
                        toast.error("Failed to fetch label");
                      }
                    }}
                    className="bg-purple-600 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase shadow-lg shadow-purple-100 hover:bg-purple-700 transition-colors"
                  >
                    Download Label
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
