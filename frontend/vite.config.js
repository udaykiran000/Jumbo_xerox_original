import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import basicSsl from "@vitejs/plugin-basic-ssl"; // Step 1: Commented out

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // basicSsl(), // Step 2: Commented out
  ],

  server: {
    https: false, // Step 3: Changed to false
    allowedHosts: true,
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
