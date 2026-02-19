/** @type {import('tailwindcss').Config} */
// 1. Plugins ni Import cheskovali (Require badulu)
import tailwindForms from "@tailwindcss/forms";
import tailwindAspectRatio from "@tailwindcss/aspect-ratio";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Brand Colors (Screenshot lo unna exact premium feel kosam)
      colors: {
        brand: {
          blue: "#2563eb",
          indigo: "#4f46e5",
          orange: "#f97316",
          dark: "#0f172a",
        },
      },
      // Custom Animations
      animation: {
        marquee: "marquee 30s linear infinite",
        float: "float 3s ease-in-out infinite",
      },
      // Keyframes Logic
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }, // Pro Tip: -50% is for seamless loop
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      // Custom Border Radius
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  // 2. Imported variables ni ikkada pass cheyali
  plugins: [tailwindForms, tailwindAspectRatio],
};
