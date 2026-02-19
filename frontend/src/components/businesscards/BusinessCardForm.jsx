import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloudUpload,
  Loader2,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { useFileUpload } from "../../hooks/useFileUpload";
import { PRICING_DATA, calculateItemPrice } from "../../utils/pricingRules";
import toast from "react-hot-toast";

const BusinessCardForm = () => {
  const navigate = useNavigate();
  const { uploadFile, pauseRef } = useFileUpload();

  // --- CORE STATES ---
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);

  const [settings, setSettings] = useState({
    paper: "art_paper",
    lamination: "none",
    sides: "single", // Added sides state
    qty: 100,
  });

  // Handle Image/File selection and Preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith("image/")) {
        setImagePreview(URL.createObjectURL(selectedFile));
      } else {
        setImagePreview(null);
      }
    }
  };

  useEffect(() => {
    return () => { if (imagePreview) URL.revokeObjectURL(imagePreview); };
  }, [imagePreview]);

  // Pricing Calculation using our Rules
  const estimatedPrice = useMemo(
    () => calculateItemPrice("businessCard", { ...settings }),
    [settings]
  );

  const handleFinalSubmit = async () => {
    if (!file) return toast.error("Please upload design!");
    setUploading(true);
    try {
      const res = await uploadFile(file, {
        onProgress: (p) => setOverallProgress(p),
        onAlert: (msg) => {
          toast.error(msg);
          setUploading(false);
        },
      });
      if (res?.success) {
        // Navigating with all required fields to avoid backend errors
        navigate("/checkout", {
          state: {
            fileKeys: [res.url.split("/").pop()],
            ...settings,
            totalPages: 1, // Business cards usually count as 1 design
            totalPrice: estimatedPrice,
            serviceType: "Business Card",
          },
        });
      }
    } catch (e) {
      toast.error("Upload failed.");
    } finally {
      if (!pauseRef.current) setUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 font-sans text-slate-700">
      {/* PHP Style Breadcrumb */}
      <nav className="flex mb-6 text-sm text-gray-500 px-4">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/services" className="hover:text-blue-600">Services</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Business Cards</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4">
        {/* LEFT COLUMN: Preview & Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="aspect-[16/10] bg-gray-100 rounded-lg overflow-hidden relative group border border-gray-100">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : file ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-green-50 text-green-600">
                  <CheckCircle2 size={48} />
                  <p className="mt-2 font-bold text-sm text-center px-4">{file.name}</p>
                </div>
              ) : (
                <img src="https://jumboxerox.com/assets/bcard.jpg" alt="Sample" className="w-full h-full object-cover opacity-80" />
              )}
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} accept=".pdf,image/*" />
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h2 className="font-bold text-lg text-blue-900 mb-2">Premium Business Cards</h2>
            <p className="text-sm text-blue-800 leading-relaxed">
              Professional cards printed on premium stocks. Choose from metallic or art papers with custom finishing.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Configuration */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 space-y-8 text-left">
              
              {/* 1. Upload Section */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">1</span>
                  Upload Design
                </h3>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-slate-50 transition relative">
                   <p className="text-sm font-bold text-slate-500">{file ? file.name : "Click or Drag PDF/Image"}</p>
                   <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} accept=".pdf,image/*" />
                </div>
              </section>

              {/* 2. Sides Selection (PHP Match) */}
              <section>
                <label className="block text-sm font-bold text-gray-700 mb-3">Print Sides</label>
                <div className="flex bg-gray-100 p-1 rounded-xl gap-1">
                  <button 
                    onClick={() => setSettings({...settings, sides: 'single'})}
                    className={`flex-1 py-3 rounded-lg text-xs font-black uppercase transition ${settings.sides === 'single' ? "bg-white text-blue-600 shadow-sm" : "text-gray-400"}`}>
                    Single Side
                  </button>
                  <button 
                    onClick={() => setSettings({...settings, sides: 'double'})}
                    className={`flex-1 py-3 rounded-lg text-xs font-black uppercase transition ${settings.sides === 'double' ? "bg-white text-blue-600 shadow-sm" : "text-gray-400"}`}>
                    Double Side
                  </button>
                </div>
              </section>

              {/* 3. Paper Type Selection */}
              <section>
                <label className="block text-sm font-bold text-gray-700 mb-3">Paper Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.entries(PRICING_DATA.businessCard.papers).map(([key, data]) => (
                    <div 
                      key={key} 
                      onClick={() => setSettings({...settings, paper: key})}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center ${settings.paper === key ? "border-blue-600 bg-blue-50" : "border-gray-100 hover:border-gray-300"}`}>
                      <span className="text-xs font-bold text-gray-800">{data.name}</span>
                      <span className="text-[10px] font-black text-blue-500 mt-1">+₹{data.price}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 4. Lamination & Qty */}
              <div className="grid sm:grid-cols-2 gap-6">
                <section>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Lamination</label>
                  <select 
                    value={settings.lamination} 
                    onChange={(e) => setSettings({...settings, lamination: e.target.value})}
                    className="w-full rounded-xl border-gray-200 p-3 text-sm font-bold">
                    {Object.entries(PRICING_DATA.businessCard.lamination).map(([key, data]) => (
                      <option key={key} value={key}>{data.name}</option>
                    ))}
                  </select>
                </section>
                <section>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Quantity</label>
                  <div className="flex items-center justify-between bg-slate-50 p-1 rounded-xl border">
                    <button onClick={() => setSettings(s => ({...s, qty: Math.max(100, s.qty - 100)}))} className="w-10 h-10 font-bold text-xl">-</button>
                    <span className="font-black text-blue-600">{settings.qty}</span>
                    <button onClick={() => setSettings(s => ({...s, qty: s.qty + 100}))} className="w-10 h-10 font-bold text-xl">+</button>
                  </div>
                </section>
              </div>

            </div>

            {/* PHP Style Summary Bar */}
            <div className="bg-slate-50 p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Estimated Price</p>
                <p className="text-3xl font-black text-blue-600">₹{Number(estimatedPrice).toFixed(2)}</p>
                <p className="text-[10px] text-slate-400">Incl. GST (18%)</p>
              </div>
              <button 
                onClick={handleFinalSubmit}
                disabled={!file || uploading}
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2">
                {uploading ? <Loader2 className="animate-spin" /> : "Place Order"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCardForm;