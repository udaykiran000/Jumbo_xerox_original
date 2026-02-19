import React from "react";
import PlanPrintForm from "../../components/planprint/PlanPrintForm";

export default function PlanPrinting() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter">
          Large Format Plan Printing
        </h1>
        <p className="text-gray-500 font-medium">
          CAD Drawings, Architecture Plans & Engineering Blueprints.
        </p>
      </div>

      {/* Rendering the Component */}
      <PlanPrintForm />
    </div>
  );
}
