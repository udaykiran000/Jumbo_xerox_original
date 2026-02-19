import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className= "flex flex-col min-h-screen font-sans bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
