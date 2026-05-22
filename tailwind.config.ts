import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          aqua: "#3FB8D2",
          aquaDeep: "#1E8FA8",
          aquaSoft: "#E4F4F8",
          aquaMist: "#F2FAFC",
          gold: "#F4B73A",
          goldSoft: "#FFF4D6",
          navy: "#0F2A44",
          navyDeep: "#0A1E33",
          cream: "#FBF8F2",
          slate: "#5D6E80",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(15, 42, 68, 0.18)",
        card: "0 6px 24px -8px rgba(15, 42, 68, 0.15)",
        glow: "0 8px 30px -10px rgba(63, 184, 210, 0.45)",
        gold: "0 8px 30px -10px rgba(244, 183, 58, 0.45)",
      },
      backgroundImage: {
        "hero-wash":
          "radial-gradient(60% 60% at 50% 0%, rgba(63,184,210,0.18) 0%, rgba(255,255,255,0) 60%), linear-gradient(180deg, #ffffff 0%, #F2FAFC 100%)",
        "aqua-wash":
          "linear-gradient(180deg, #F2FAFC 0%, #E4F4F8 100%)",
        "cream-wash":
          "linear-gradient(180deg, #ffffff 0%, #FBF8F2 100%)",
        "navy-wash":
          "linear-gradient(135deg, #0F2A44 0%, #1E8FA8 100%)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        floaty: "floaty 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
