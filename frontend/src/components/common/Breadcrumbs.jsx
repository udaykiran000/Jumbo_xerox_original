import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Path mapping for readable names
  const breadcrumbNameMap = {
    admin: "Dashboard",
    orders: "Manage Orders",
    users: "User Directory",
    payments: "Transaction History",
    settings: "Security Settings",
    shipments: "Logistics & Shipments",
    "delete-files": "Storage Cleanup",
    "contact-messages": "Customer Inbox",
  };

  return (
    <nav className="flex items-center space-x-2 text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400 mb-6 overflow-x-auto whitespace-nowrap custom-scrollbar pb-2">
      <Link
        to="/admin"
        className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
      >
        <Home size={14} />
        <span>Admin</span>
      </Link>

      {pathnames.map((name, index) => {
        // Skip 'admin' since we added it manually as 'Home'
        if (name === "admin") return null;

        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const displayName = breadcrumbNameMap[name] || name.replace("-", " ");

        return (
          <div key={routeTo} className="flex items-center space-x-2">
            <ChevronRight size={14} className="text-slate-300" />
            {isLast ? (
              <span className="text-blue-600 font-black">{displayName}</span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-blue-600 transition-colors"
              >
                {displayName}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
