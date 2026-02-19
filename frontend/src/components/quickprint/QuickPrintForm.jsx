import React, { useState, useMemo, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloudUpload,
  FileText,
  Trash2,
  Loader2,
  Wifi,
  Signal,
  Pause,
  Play,
} from "lucide-react";
import { useFileUpload } from "../../hooks/useFileUpload";
import { PRICING_DATA, calculateItemPrice } from "../../utils/pricingRules";
import toast from "react-hot-toast";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

const QuickPrintForm = () => {
  const navigate = useNavigate();
  const { uploadFile, progress, netHealth, pauseRef } = useFileUpload();

  const [files, setFiles] = useState([]);
  const [totalNumPages, setTotalNumPages] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [eta, setEta] = useState("");
  const [overallProgress, setOverallProgress] = useState(0);
  const [currentFileIdx, setCurrentFileIdx] = useState(0);
  const [uploadedBytesStore, setUploadedBytesStore] = useState(0);

  const [settings, setSettings] = useState({
    printType: "grayscale",
    size: "A4",
    media: "75gsm",
    binding: "none",
    sides: "single",
    copies: 1,
    lamination: "None",
    cover: "No Cover Page",
    orientation: "Portrait",
    instructions: "",
  });

  const availableSizes = Object.keys(
    PRICING_DATA.quickPrint[settings.printType] || {}
  );
  const availableMedia =
    PRICING_DATA.quickPrint[settings.printType]?.[settings.size] || {};
  const isBindingDisabled = [
    "A0",
    "A1",
    "A2",
    "A3",
    "fls",
    "Sticker 12x18",
    "Sticker 13x19",
    "LAMINATION",
  ].includes(settings.size);
  const isDoubleAvailable = availableMedia[settings.media]?.double > 0;

  useEffect(() => {
    if (!availableSizes.includes(settings.size))
      setSettings((p) => ({ ...p, size: availableSizes[0] }));
    if (!availableMedia[settings.media])
      setSettings((p) => ({ ...p, media: Object.keys(availableMedia)[0] }));
    if (!isDoubleAvailable) setSettings((p) => ({ ...p, sides: "single" }));
    if (isBindingDisabled)
      setSettings((p) => ({
        ...p,
        binding: "none",
        lamination: "None",
        cover: "No Cover Page",
      }));
  }, [settings.printType, settings.size, settings.media]);

  const processFiles = async (acceptedFiles) => {
    let pagesSum = 0;
    const newList = [];
    for (const file of acceptedFiles) {
      let pages = 1;
      if (file.type === "application/pdf") {
        try {
          const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file))
            .promise;
          pages = pdf.numPages;
        } catch (e) {
          console.error(e);
        }
      }
      newList.push({ file, pages, id: `${Date.now()}-${file.name}` });
      pagesSum += pages;
    }
    setFiles((prev) => [...prev, ...newList]);
    setTotalNumPages((p) => p + pagesSum);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: processFiles,
  });
  const estimatedPrice = useMemo(
    () =>
      calculateItemPrice("quickPrint", {
        ...settings,
        pages: totalNumPages,
        qty: settings.copies,
      }),
    [totalNumPages, settings]
  );

  const removeFile = (id) => {
    const f = files.find((x) => x.id === id);
    if (!f) return;
    setTotalNumPages((p) => p - f.pages);
    setFiles((p) => p.filter((x) => x.id !== id));
  };

  const togglePause = () => {
    const newState = !isPaused;
    setIsPaused(newState);
    pauseRef.current = newState;
    if (!newState) handleFinalSubmit(); // Resume click
  };

  const handleFinalSubmit = async () => {
    if (files.length === 0) return toast.error("Please upload files first!");

    // 1. 30MB WARNING
    const largeFile = files.find((f) => f.file.size > 30 * 1024 * 1024);
    if (largeFile && !uploading) {
      toast("You are uploading a large file. Switching to a high-speed network will make it faster.", {
        icon: "🚀",
      });
    }

    setUploading(true);
    setIsPaused(false);
    pauseRef.current = false;

    const totalBytes = files.reduce((acc, f) => acc + f.file.size, 0);

    try {
      const results = [];
      for (let i = currentFileIdx; i < files.length; i++) {
        setCurrentFileIdx(i);
        const res = await uploadFile(files[i].file, {
          stats: { totalSize: totalBytes, uploadedSoFar: uploadedBytesStore },
          onEta: (time) => setEta(time),
          onProgress: (fP, fileBytes) =>
            setOverallProgress(
              ((uploadedBytesStore + fileBytes) / totalBytes) * 100
            ),
          onThresholdWarning: () => {
            setIsPaused(true);
            setUploading(false);
            toast.error(
              "Slow Network! 5 mins lo 50% kaledhu. Switch network and Resume."
            );
          },
        });

        if (res?.paused) return;
        if (res?.success) {
          results.push(res);
          setUploadedBytesStore((prev) => prev + files[i].file.size);
        }
      }

      navigate("/checkout", {
        state: {
          fileKeys: results.map((r) => r.url.split("/").pop()),
          ...settings,
          totalPages: totalNumPages,
          totalPrice: estimatedPrice,
          serviceType: "Quick Print",
        },
      });
    } catch (e) {
      toast.error("Upload failed.");
    } finally {
      if (!pauseRef.current) setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-40 pt-12 px-4 md:px-8 font-sans text-slate-700">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quick Print</h1>
              <p className="text-gray-500 text-sm font-medium">
                Auto-count pages & instant pricing.
              </p>
            </div>
            <div
              className={`px-4 py-1.5 bg-white rounded-xl border shadow-sm flex items-center gap-2 ${netHealth.color}`}
            >
              {netHealth.type === "WIFI" ? (
                <Wifi size={14} />
              ) : (
                <Signal size={14} />
              )}
              <span className="text-[10px] font-black uppercase tracking-widest">
                {netHealth.type}
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <SectionHeader badge="1" title="Upload Files" />
            <div
              {...getRootProps()}
              className={`mt-4 border-2 border-dashed p-10 rounded-lg text-center cursor-pointer transition ${
                isDragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <input {...getInputProps()} />
              <CloudUpload className="mx-auto mb-2 text-blue-400" size={32} />
              <p className="text-sm text-gray-700 font-bold">
                Drop PDF or Word files here (Max 500MB)
              </p>
            </div>
            <div className="mt-4 space-y-2">
              {files.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="text-blue-300" size={20} />
                    <div>
                      <p className="text-sm font-bold text-gray-800 truncate max-w-[180px]">
                        {f.file.name}
                      </p>
                      <p className="text-[10px] text-gray-400 font-black uppercase">
                        {f.pages} Pages (
                        {(f.file.size / (1024 * 1024)).toFixed(1)} MB)
                      </p>
                    </div>
                  </div>
                  {!uploading && !isPaused && (
                    <button
                      onClick={() => removeFile(f.id)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* PRINT SETTINGS */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <SectionHeader badge="2" title="Print Settings" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <SelectGroup
                label="Color Mode"
                value={settings.printType}
                onChange={(v) => setSettings({ ...settings, printType: v })}
              >
                <option value="grayscale">Grayscale (B&W)</option>
                <option value="color">Full Color</option>
              </SelectGroup>
              <SelectGroup
                label="Paper Size"
                value={settings.size}
                onChange={(v) => setSettings({ ...settings, size: v })}
              >
                {availableSizes.map((s) => (
                  <option key={s} value={s}>
                    {s.toUpperCase()}
                  </option>
                ))}
              </SelectGroup>
              <div className="md:col-span-2">
                <SelectGroup
                  label="Paper Type"
                  value={settings.media}
                  onChange={(v) => setSettings({ ...settings, media: v })}
                >
                  {Object.entries(availableMedia).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v.name}
                    </option>
                  ))}
                </SelectGroup>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Print Sides
                </label>
                <div className="flex bg-gray-100 p-1 rounded-lg gap-1 border">
                  <button
                    onClick={() =>
                      setSettings({ ...settings, sides: "single" })
                    }
                    className={`flex-1 py-2 rounded-md text-xs font-bold transition ${
                      settings.sides === "single"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-400"
                    }`}
                  >
                    Single Side
                  </button>
                  <button
                    disabled={!isDoubleAvailable}
                    onClick={() =>
                      setSettings({ ...settings, sides: "double" })
                    }
                    className={`flex-1 py-2 rounded-md text-xs font-bold transition ${
                      settings.sides === "double"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-400 disabled:opacity-30"
                    }`}
                  >
                    Double Side
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Pages
                  </label>
                  <input
                    type="number"
                    value={totalNumPages}
                    readOnly
                    className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2.5 text-gray-500 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Sets
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={settings.copies}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        copies: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg p-2.5 font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BINDING & FINISHING (UI content remains similar but synced with isBindingDisabled) */}
          {!isBindingDisabled && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <SectionHeader badge="3" title="Binding" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                {Object.entries(PRICING_DATA.quickPrint.binding).map(
                  ([key, bind]) => (
                    <div
                      key={key}
                      onClick={() => setSettings({ ...settings, binding: key })}
                      className={`cursor-pointer border rounded-xl overflow-hidden hover:shadow-md transition flex flex-col ${
                        settings.binding === key
                          ? "border-blue-600 bg-blue-50 ring-2 ring-blue-600"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="h-32 w-full bg-gray-100">
                        <img
                          src={bind.img}
                          className="w-full h-full object-cover"
                          alt={bind.name}
                        />
                      </div>
                      <div className="p-3 bg-white flex flex-col justify-between flex-grow">
                        <div className="text-sm font-bold text-gray-800 leading-tight">
                          {bind.name}
                        </div>
                        <div className="text-right mt-2">
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            {bind.cost > 0 ? `₹${bind.cost}` : "Free"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR SUMMARY & UPLOAD UI */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-slate-800 text-white p-4 text-center">
              <h3 className="font-bold text-lg">Item Summary</h3>
            </div>
            <div className="p-6">
              <div className="mb-4 pb-4 border-b border-slate-100 text-center font-semibold text-blue-600 text-sm">
                {files.length > 0
                  ? `${files.length} Files Selected`
                  : "No File Uploaded"}
              </div>

              <div className="space-y-3">
                <SummaryRow
                  label="Total Pages"
                  value={totalNumPages * settings.copies}
                />
                <SummaryRow label="Print Type" value={settings.printType} />
                <SummaryRow label="Size" value={settings.size.toUpperCase()} />
                <SummaryRow label="Sides" value={settings.sides} />
              </div>

              {/* PROGRESS SECTION */}
              {(uploading || isPaused) && (
                <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                        {isPaused ? "Upload Paused" : "Uploading..."}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold">
                        {eta ? `ETA: ${eta}` : "Calculating..."}
                      </span>
                    </div>
                    <button
                      onClick={togglePause}
                      className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition"
                    >
                      {isPaused ? (
                        <Play size={20} fill="currentColor" />
                      ) : (
                        <Pause size={20} fill="currentColor" />
                      )}
                    </button>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${overallProgress}%` }}
                      className={`h-full ${
                        isPaused ? "bg-yellow-400" : "bg-blue-600"
                      }`}
                    />
                  </div>
                  <div className="text-right text-[10px] font-black text-gray-400">
                    {Math.round(overallProgress)}% COMPLETE
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t-2 border-dashed border-slate-200">
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-bold text-gray-600">
                    Total Price :
                  </span>
                  <span className="text-3xl font-bold text-blue-600">
                    ₹{Number(estimatedPrice).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleFinalSubmit}
                  disabled={files.length === 0 || (uploading && !isPaused)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {uploading && !isPaused ? (
                    <Loader2 className="animate-spin" />
                  ) : isPaused ? (
                    "Resume Upload"
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// HELPERS
const SectionHeader = ({ badge, title }) => (
  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
    <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black">
      {badge}
    </span>
    {title}
  </h3>
);
const SelectGroup = ({ label, value, onChange, children }) => (
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-2">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-300 p-3 bg-white focus:ring-2 focus:ring-blue-500 font-medium"
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
    <span className="font-bold text-gray-800 text-xs">{value}</span>
  </div>
);

export default QuickPrintForm;
