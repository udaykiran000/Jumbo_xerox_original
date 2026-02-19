import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">
      {/* Brand Icon Spinner */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-blue-100 rounded-2xl"></div>
        <div className="absolute inset-0 border-4 border-blue-600 rounded-2xl animate-spin border-t-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center font-black text-2xl text-blue-600">
          J
        </div>
      </div>

      {/* Shimmer Text */}
      <p className="mt-6 font-black text-blue-900 tracking-[0.3em] uppercase text-xs animate-pulse">
        Loading Excellence...
      </p>
    </div>
  );
}
