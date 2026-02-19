import React from "react";
import { ShieldCheck, RefreshCcw, Mail } from "lucide-react";

export default function NotesSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 mt-12">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 text-blue-800 p-5 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 bg-white/50 rounded">
              <ShieldCheck size={20} />
            </div>
            <strong className="font-bold">Store Pickup</strong>
          </div>
          <p className="text-sm">
            Available only at <b>Guntur Branch</b>
          </p>
        </div>
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-5 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 bg-white/50 rounded">
              <RefreshCcw size={20} />
            </div>
            <strong className="font-bold">Bulk Orders</strong>
          </div>
          <p className="text-sm">
            Call <b>+91 9441081125</b>
          </p>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 text-green-800 p-5 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 bg-white/50 rounded">
              <Mail size={20} />
            </div>
            <strong className="font-bold">Order Support</strong>
          </div>
          <p className="text-sm">
            Email <b>info@jumboxerox.com</b>
          </p>
        </div>
      </div>
    </div>
  );
}
