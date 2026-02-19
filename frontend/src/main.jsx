import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./context/AuthProvider"; // Removed
import { Toaster } from "react-hot-toast";

import { Provider } from "react-redux";
import { store } from "./redux/store";

// Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("✅ Service Worker Registered:", reg.scope))
      .catch((err) => console.log("❌ Service Worker Failed:", err));
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
          <Toaster position="top-center" />
          <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
