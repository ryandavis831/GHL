import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f1f5fb",
          100: "#dde7f3",
          200: "#b9cde6",
          300: "#85a8d2",
          400: "#5180b9",
          500: "#2f60a0",
          600: "#214a82",
          700: "#1a3b69",
          800: "#13294b",
          900: "#0b1d38",
          950: "#06112a",
        },
        sky2: {
          50: "#eff7ff",
          100: "#dceaff",
          200: "#bcd5ff",
          300: "#8eb6ff",
          400: "#5b8df5",
          500: "#3b6fe6",
          600: "#2b56c8",
          700: "#2545a0",
          800: "#223c81",
          900: "#1f3568",
        },
        slate1: {
          50: "#f7f9fc",
          100: "#eef2f7",
          200: "#dde4ec",
          300: "#c1cbd8",
          400: "#94a2b5",
          500: "#6c7a90",
          600: "#525e72",
          700: "#3e4759",
        },
        accent: {
          green: "#16a34a",
          greenDark: "#15803d",
          greenSoft: "#dcfce7",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11, 29, 56, 0.04), 0 12px 32px -12px rgba(11, 29, 56, 0.18)",
        cardHover:
          "0 4px 12px rgba(11, 29, 56, 0.06), 0 20px 44px -16px rgba(11, 29, 56, 0.28)",
        ring: "0 0 0 1px rgba(11, 29, 56, 0.08)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(60% 50% at 70% 0%, rgba(47, 96, 160, 0.30) 0%, rgba(11, 29, 56, 0) 60%), linear-gradient(135deg, #06112a 0%, #0b1d38 55%, #13294b 100%)",
        "soft-blue": "linear-gradient(180deg, #f7f9fc 0%, #eef2f7 100%)",
        "navy-deep": "linear-gradient(135deg, #0b1d38 0%, #13294b 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
