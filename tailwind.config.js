/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        surface: "#1e293b",
        primary: "#3b82f6",
        secondary: "#64748b",
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },
      backdropFilter: {
        none: "none",
        blur: "blur(20px)",
      },
    },
  },
  plugins: [],
};
