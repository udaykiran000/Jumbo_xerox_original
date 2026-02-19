import React from "react";
import BusinessCardForm from "../../components/businesscards/BusinessCardForm";

export default function BusinessCards() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter">
          Premium Business Cards
        </h1>
        <p className="text-gray-500 font-medium">
          Standard 90x54mm high-quality offset printing.
        </p>
      </div>

      {/* Rendering the Component */}
      <BusinessCardForm />
    </div>
  );
}
