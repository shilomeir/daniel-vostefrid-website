import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F7F2EB",
          dark: "#ECE5D8",
          deeper: "#E2D8C8",
        },
        blue: {
          deep: "#17366B",
          mid: "#2C6CA8",
          light: "#5BAFD0",
          pale: "#D5EAF5",
          glow: "rgba(91, 175, 208, 0.18)",
        },
        teal: "#4A9DB5",
        sand: {
          DEFAULT: "#C4A882",
          light: "#D4BFA3",
          dark: "#A8906E",
        },
        "text-dark": "#1A2B3C",
        "text-mid": "#4A5B72",
        "text-light": "#7A8EA0",
      },
      fontFamily: {
        sans: ["Heebo", "Arial", "sans-serif"],
        serif: ["Frank Ruhl Libre", "Georgia", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
