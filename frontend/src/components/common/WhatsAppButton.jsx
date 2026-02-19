import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "919441081125";
  const message = encodeURIComponent("Hello, I have a query about Jumbo Xerox");

  // Cleanup old widget (if it persists due to caching)
  React.useEffect(() => {
    // 1. Remove Script
    const scripts = document.querySelectorAll('script[src*="waplus.io"]');
    scripts.forEach(s => s.remove());

    // 2. Remove Widget Elements (Generic catch-all for potential IDs)
    const potentialIds = ["waplus-widget", "wa-widget-send-button", "waplus-guest-box"];
    potentialIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });
    
    // 3. Remove by class if ID fails (specific to the "Message Us" text container if found)
    // This is a safety measure.
  }, []);

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[60] group"
      title="Chat with us on WhatsApp"
    >
      <div className="relative flex items-center justify-center p-4 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce-slow">
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
        
        <FaWhatsapp size={32} />
      </div>
      
      {/* Tooltip on Hover */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppButton;
