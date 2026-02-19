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
    payments: "Transactions",
    settings: "Settings",
    shipments: "Shipments",
    "delete-files": "File Management",
    "contact-messages": "Messages",
  };

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-6 overflow-x-auto whitespace-nowrap pb-2">
      <Link
        to="/admin"
        className="flex items-center gap-1 hover:text-blue-600 transition-colors"
      >
        <Home size={16} />
        <span className="font-medium">Admin</span>
      </Link>

      {pathnames.map((name, index) => {
        // Skip 'admin' since we added it manually as 'Home'
        if ((name === "admin" && index === 0) || name === "admin") return null;

        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        // Clean up the name
        let displayName = breadcrumbNameMap[name] || name.replace(/-/g, " ");
        // Capitalize first letter of each word if it's not in the map
        if (!breadcrumbNameMap[name]) {
             displayName = displayName.replace(/\b\w/g, l => l.toUpperCase());
        }

        return (
          <div key={routeTo} className="flex items-center space-x-2">
            <ChevronRight size={14} className="text-slate-400" />
            {isLast ? (
              <span className="font-semibold text-slate-900">{displayName}</span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-blue-600 transition-colors font-medium"
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
