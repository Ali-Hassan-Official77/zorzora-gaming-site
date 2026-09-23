/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#0A0E13",
          50: "#EAF2F1",
          100: "#10161C",
          200: "#161E26",
          300: "#1C2530",
          400: "#243040",
        },
        teal: {
          DEFAULT: "#2DD4BF",
          soft: "#5EEAD4",
          deep: "#0F766E",
        },
        coral: {
          DEFAULT: "#FF6B5E",
          soft: "#FF8C81",
        },
        muted: "#8FA0AA",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        "gp-radial":
          "radial-gradient(60% 60% at 50% 0%, rgba(45,212,191,0.12) 0%, rgba(10,14,19,0) 70%)",
        "gp-dots":
          "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      boxShadow: {
        teal: "0 0 0 1px rgba(45,212,191,0.25), 0 8px 30px -8px rgba(45,212,191,0.3)",
        card: "0 4px 24px -8px rgba(0,0,0,0.5)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        shimmer: "shimmer 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
