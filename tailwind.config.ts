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
          cream: "#FBF7F1",
          tealmist: "#EBF6F4",
          mistGlow: "#E2F2EF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(12, 42, 77, 0.18)",
        card: "0 6px 24px -8px rgba(12, 42, 77, 0.15)",
        review: "0 1px 2px rgba(12,42,77,0.04), 0 8px 24px -10px rgba(12,42,77,0.15)",
        reviewHover: "0 4px 8px rgba(12,42,77,0.06), 0 16px 36px -12px rgba(15,182,168,0.22)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(60% 60% at 50% 0%, rgba(15,182,168,0.18) 0%, rgba(244,247,250,0) 60%), linear-gradient(180deg, #ffffff 0%, #F4F7FA 100%)",
        "reviews-tint":
          "radial-gradient(80% 60% at 50% 0%, rgba(15,182,168,0.10) 0%, rgba(235,246,244,0) 65%), linear-gradient(180deg, #F1F8F7 0%, #EBF6F4 100%)",
        "about-cream":
          "linear-gradient(180deg, #ffffff 0%, #FBF7F1 60%, #F8F2EA 100%)",
        "gallery-depth":
          "radial-gradient(60% 60% at 50% 0%, rgba(15,182,168,0.06) 0%, rgba(255,255,255,0) 55%), linear-gradient(180deg, #FFFFFF 0%, #F7FAFC 100%)",
        "contact-tint":
          "radial-gradient(70% 50% at 80% 10%, rgba(15,182,168,0.12) 0%, rgba(244,247,250,0) 60%), linear-gradient(180deg, #F4F7FA 0%, #EBF6F4 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
