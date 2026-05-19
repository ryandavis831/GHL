import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#0FB6A8",
          mint: "#A8E6CF",
          navy: "#0C2A4D",
          coral: "#E5564E",
          soft: "#F4F7FA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(12, 42, 77, 0.18)",
        card: "0 6px 24px -8px rgba(12, 42, 77, 0.15)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(60% 60% at 50% 0%, rgba(15,182,168,0.18) 0%, rgba(244,247,250,0) 60%), linear-gradient(180deg, #ffffff 0%, #F4F7FA 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
