import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloudUpload,
  FileText,
  Trash2,
  Loader2,
  ChevronRight,
  Wifi,
  Signal,
} from "lucide-react";
import { useFileUpload } from "../../hooks/useFileUpload";
import { PRICING_DATA, calculateItemPrice } from "../../utils/pricingRules";
import toast from "react-hot-toast";
import * as pdfjsLib from "pdfjs-dist";

// Setting up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

const PlanPrintForm = () => {
  const navigate = useNavigate();
  const { uploadFile, netHealth, pauseRef } = useFileUpload();

  // --- CORE STATES ---
  const [files, setFiles] = useState([]);
  const [totalNumPages, setTotalNumPages] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [settings, setSettings] = useState({
    size: "A1",
    media: "line_90",
    sides: "single", // Locked in UI
    printType: "color", // Locked in UI
    copies: 1,
    instructions: "", // Mapped to special_request
  });

  const availableMedia = PRICING_DATA.planPrinting[settings.size] || {};

  // Helper to get full display name for Size
  const getSizeDisplayName = (sizeKey) => {
    const names = {
      A2: "A2 (420 x 594 mm)",
      A1: "A1 (594 x 841 mm)",
      A0: "A0 (841 x 1189 mm)",
    };
    return names[sizeKey] || sizeKey;
  };

  // Generate Thumbnail for first page preview
  const generatePreview = async (file) => {
    if (file.type !== "application/pdf") return;
    try {
      const url = URL.createObjectURL(file);
      const pdf = await pdfjsLib.getDocument(url).promise;
      const page = await pdf.getPage(1);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const viewport = page.getViewport({ scale: 0.3 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport }).promise;
      setPreviewUrl(canvas.toDataURL());
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Preview failed", err);
    }
  };

  const handleFileChange = async (e) => {
    const acceptedFiles = Array.from(e.target.files);
    if (acceptedFiles.length === 0) return;

    if (files.length === 0) generatePreview(acceptedFiles[0]);

    let pagesSum = 0;
    const newList = [];
    for (const file of acceptedFiles) {
      let pages = 1;
      if (file.type === "application/pdf") {
        try {
          const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file))
            .promise;
          pages = pdf.numPages;
        } catch (err) {
          console.error(err);
        }
      }
      newList.push({ file, pages, id: `${Date.now()}-${file.name}` });
      pagesSum += pages;
    }
    setFiles((prev) => [...prev, ...newList]);
    setTotalNumPages((p) => p + pagesSum);
  };

  const estimatedPrice = useMemo(
    () =>
      calculateItemPrice("planPrinting", {
        ...settings,
        pages: totalNumPages,
        qty: settings.copies,
      }),
    [totalNumPages, settings]
  );

  const handleFinalSubmit = async () => {
    if (files.length === 0) return toast.error("Please upload plans!");
    setUploading(true);

    try {
      const results = [];
      for (const f of files) {
        const res = await uploadFile(f.file, {
          onProgress: (p) => setOverallProgress(p),
          onAlert: (msg) => {
            toast.error(msg);
            setUploading(false);
          },
        });
        if (res?.success) results.push(res);
      }

      if (results.length === files.length) {
        navigate("/checkout", {
          state: {
            fileKeys: results.map((r) => r.url.split("/").pop()),
            ...settings,
            special_request: settings.instructions, 
            totalPages: totalNumPages,
            totalPrice: estimatedPrice,
            serviceType: "Plan Printing",
            binding: "Loose / Rolled",
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
    <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 font-sans text-slate-700">
      {/*Breadcrumb */}
      <nav className="flex mb-6 text-sm text-gray-500">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/services" className="hover:text-blue-600">
          Services
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Plan Printing</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: CONFIGURATION */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Upload Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-left">
              1. Upload Plans / Drawings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="aspect-[3/4] bg-gray-100 rounded-lg border flex flex-col items-center justify-center overflow-hidden shadow-inner">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    className="w-full h-full object-cover"
                    alt="Preview"
                  />
                ) : (
                  <div className="text-center p-4">
                    <FileText
                      className="mx-auto text-gray-300 mb-2"
                      size={32}
                    />
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      First Page Preview
                    </p>
                  </div>
                )}
              </div>

              <label className="md:col-span-2 flex flex-col items-center justify-center border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition relative">
                <CloudUpload className="w-10 h-10 text-blue-500 mb-2" />
                <p className="text-sm text-gray-700 font-bold">
                  Upload Drawings
                </p>
                <p className="text-[10px] text-gray-400 mt-1 uppercase">
                  PDF / CAD Exports
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className="space-y-2">
              {files.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1 rounded">
                      PDF
                    </span>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-medium text-gray-700 truncate w-48 sm:w-64">
                        {f.file.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {f.pages} pages
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const newFiles = files.filter((x) => x.id !== f.id);
                      setFiles(newFiles);
                      setTotalNumPages((p) => p - f.pages);
                      if (newFiles.length > 0)
                        generatePreview(newFiles[0].file);
                      else setPreviewUrl(null);
                    }}
                  >
                    <Trash2
                      size={16}
                      className="text-red-500 hover:text-red-700"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 2. SPECIFICATIONS SECTION (Matches PHP Grid) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-left">
              2. Printing Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <SelectGroup
                label="Paper Size"
                value={settings.size}
                onChange={(v) => setSettings({ ...settings, size: v })}
              >
                <option value="A2">A2 (420 x 594 mm)</option>
                <option value="A1">A1 (594 x 841 mm)</option>
                <option value="A0">A0 (841 x 1189 mm)</option>
              </SelectGroup>

              <SelectGroup
                label="Print Media"
                value={settings.media}
                onChange={(v) => setSettings({ ...settings, media: v })}
              >
                {Object.entries(availableMedia).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.name}
                  </option>
                ))}
              </SelectGroup>

              {/* PHP Matches: Read-only selection indicators */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">
                  Print Sides
                </label>
                <div className="w-full rounded-lg border-gray-200 bg-gray-100 p-3 text-gray-500 text-sm font-medium">
                  One Sided Only
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">
                  Color Mode
                </label>
                <div className="w-full rounded-lg border-gray-200 bg-gray-100 p-3 text-gray-500 text-sm font-medium">
                  Colour
                </div>
              </div>

              <div className="md:col-span-2 grid grid-cols-2 gap-4 pt-4 border-t border-dashed">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Total Sheets
                  </label>
                  <input
                    type="text"
                    value={totalNumPages}
                    readOnly
                    className="w-full rounded-lg border p-3 bg-gray-100 font-bold text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Sets / Copies
                  </label>
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        setSettings((s) => ({
                          ...s,
                          copies: Math.max(1, s.copies - 1),
                        }))
                      }
                      className="w-12 h-[46px] rounded-l-lg bg-gray-100 border border-r-0 font-bold hover:bg-gray-200"
                    >
                      -
                    </button>
                    <div className="w-full h-[46px] flex items-center justify-center border-y border-gray-300 font-bold text-lg bg-white">
                      {settings.copies}
                    </div>
                    <button
                      onClick={() =>
                        setSettings((s) => ({ ...s, copies: s.copies + 1 }))
                      }
                      className="w-12 h-[46px] rounded-r-lg bg-gray-100 border border-l-0 font-bold hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 pt-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Special Request (Optional)
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-24"
                  placeholder="Any notes for handling (e.g. urgent)..."
                  value={settings.instructions}
                  onChange={(e) =>
                    setSettings({ ...settings, instructions: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SUMMARY (Matches PHP Style) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-slate-800 text-white p-4 text-center">
              <h3 className="font-bold text-lg">Plan Estimate</h3>
            </div>
            <div className="p-6 space-y-4 text-left">
              <div className="mb-4 pb-4 border-b border-slate-100 text-center">
                <div className="font-semibold text-blue-600 text-sm truncate">
                  {files.length > 0 ? files[0].name : "Waiting for files..."}
                </div>
              </div>

              <div className="space-y-4">
                <SummaryRow label="Service" value="Large Format Plan" />
                <SummaryRow
                  label="Size"
                  value={getSizeDisplayName(settings.size)}
                />
                <SummaryRow
                  label="Material"
                  value={availableMedia[settings.media]?.name}
                />
                <SummaryRow
                  label="Rate per Sheet"
                  value={`₹${Number(
                    availableMedia[settings.media]?.single || 0
                  ).toFixed(2)}`}
                />

                {/* PHP Calculation Match */}
                <div className="flex justify-between pt-2 border-t border-gray-100 font-bold items-center">
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                    Total Sheets
                  </span>
                  <span className="text-gray-900 text-xs">
                    {totalNumPages} pgs x {settings.copies} sets ={" "}
                    <span className="text-blue-600">
                      {totalNumPages * settings.copies}
                    </span>
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-dashed border-slate-200 flex items-baseline justify-between">
                <span className="text-lg font-bold text-gray-600">
                  Total Price :
                </span>
                <span className="text-3xl font-bold text-blue-600">
                  ₹{Number(estimatedPrice).toFixed(2)}
                </span>
              </div>

              <button
                disabled={files.length === 0 || uploading}
                onClick={handleFinalSubmit}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition shadow-lg flex justify-center items-center gap-2"
              >
                {uploading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Place Order <ChevronRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER NOTES SECTION (Exact PHP Match) */}
      <div className="grid gap-4 md:grid-cols-3 mt-12 text-left">
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-800 p-4 rounded shadow-sm">
          <strong className="block mb-1">Note:</strong> Store pickup available
          only at <b className="font-black">Guntur Branch</b>.
        </div>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded shadow-sm">
          <strong className="block mb-1">Bulk Orders:</strong> Call{" "}
          <b className="font-black">+91 9441081125</b>
        </div>
        <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded shadow-sm">
          <strong className="block mb-1">Order Related:</strong> Mail us at{" "}
          <b className="font-black">info@jumboxerox.com</b>
        </div>
      </div>
    </div>
  );
};

// HELPER COMPONENTS
const SelectGroup = ({ label, value, onChange, children }) => (
  <div className="text-left">
    <label className="block text-sm font-bold text-gray-700 mb-2">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border-gray-300 p-3 bg-white font-bold focus:ring-2 focus:ring-blue-500 outline-none"
    >
      {children}
    </select>
  </div>
);

const SummaryRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-0.5">
    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
      {label}
    </span>
    <span className="font-bold text-gray-900 text-xs text-right truncate max-w-[200px]">
      {value || "—"}
    </span>
  </div>
);

export default PlanPrintForm;
