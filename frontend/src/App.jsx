import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./components/layout/AdminLayout";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Static Pages
import Home from "./pages/static/Home";
import About from "./pages/static/About";
import Services from "./pages/static/Services";
import Contact from "./pages/static/Contact";
import FAQ from "./pages/static/FAQ";
import Privacy from "./pages/static/Privacy";
import Refund from "./pages/static/Refund";
import Terms from "./pages/static/Terms";
import PaymentTerms from "./pages/static/PaymentTerms";

// User Pages
import QuickPrint from "./pages/user/QuickPrint";
import Profile from "./pages/user/Profile";
import UserDashboard from "./pages/user/UserDashboard";
import Checkout from "./pages/user/Checkout";

// Service Forms
import PlanPrintForm from "./components/planprint/PlanPrintForm";
import BusinessCardForm from "./components/businesscards/BusinessCardForm";

// Admin Pages (MIGRATED CODES)
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminShipments from "./pages/admin/AdminShipments"; // Updated from AdminShipping
import AdminDeleteFiles from "./pages/admin/AdminDeleteFiles"; // NEW
import AdminContactMessages from "./pages/admin/AdminContactMessages"; // NEW

// import { ConfigProvider } from "./context/ConfigContext"; // Removed

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/slices/authSlice";
import { fetchConfig } from "./redux/slices/configSlice";
import ScrollToTop from "./components/common/ScrollToTop";
import CustomCursor from "./components/common/CustomCursor";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchConfig());
  }, [dispatch]);



  return (
    <>
      {/* <CustomCursor /> */}
      <ScrollToTop />
      <Routes>
      {/* 1. Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/refund-policy" element={<Refund />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="/payment-terms" element={<PaymentTerms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 2. User Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/quick-print" element={<QuickPrint />} />
          <Route path="/plan-printing" element={<PlanPrintForm />} />
          <Route path="/business-cards" element={<BusinessCardForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Route>

      {/* 3. Admin Protected Routes (Fully Migrated) */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="settings" element={<AdminSettings />} />

          {/* PATHS SYNCED WITH ADMIN LAYOUT MENU */}
          <Route path="shipments" element={<AdminShipments />} />
          <Route path="delete-files" element={<AdminDeleteFiles />} />
          <Route path="contact-messages" element={<AdminContactMessages />} />
        </Route>
      </Route>

      {/* 4. Catch-All 404 */}
      <Route
        path="*"
        element={
          <div className="flex flex-col items-center justify-center min-h-[60vh] font-sans">
            <h2 className="text-6xl font-black text-slate-200">404</h2>
            <p className="text-xl font-bold text-slate-500 mt-2">
              Page Not Found
            </p>
          </div>
        }
      />
      </Routes>
    </>
  );
}

export default App;
