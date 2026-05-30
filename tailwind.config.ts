import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#b1d4e8",
        secondary: "#5b8ab1",
        brand: {
          50: "#f0f7fb",
          100: "#dceef7",
          200: "#b1d4e8",
          300: "#88bdd9",
          400: "#5b9bc7",
          500: "#5b8ab1",
          600: "#2a5b84",
          700: "#1e4568",
          800: "#163350",
          900: "#0e2338",
          950: "#071524",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern":
          "radial-gradient(circle at 20% 50%, rgba(91,138,177,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(177,212,232,0.1) 0%, transparent 50%)",
      },
    },
  },
  plugins: [],
};
export default config;
