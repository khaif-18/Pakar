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
        accent: {
          DEFAULT: "#f59e0b",
          light: "#fbbf24",
          dark: "#d97706",
        },
        brand: {
          50: "#e8f4fd",
          100: "#cce6f7",
          200: "#b1d4e8",
          300: "#88bdd9",
          400: "#5b9bc7",
          500: "#5b8ab1",
          600: "#2a5b84",
          700: "#1e4568",
          800: "#0d1b2e",
          900: "#070d15",
          950: "#030810",
        },
      },
      fontFamily: {
        sans: ["Barlow", "system-ui", "sans-serif"],
        display: ["Barlow Condensed", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "1" }],
        "11xl": ["12rem", { lineHeight: "1" }],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "scan": "scan 4s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        "amber-glow": "0 0 20px rgba(245, 158, 11, 0.2)",
        "amber-glow-lg": "0 0 40px rgba(245, 158, 11, 0.3)",
        "blue-glow": "0 0 20px rgba(91, 138, 177, 0.2)",
        "blue-glow-lg": "0 0 40px rgba(91, 138, 177, 0.3)",
        "card": "0 1px 0 rgba(177, 212, 232, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.02)",
      },
    },
  },
  plugins: [],
};
export default config;
