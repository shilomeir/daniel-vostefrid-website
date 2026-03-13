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
        bone: "#FDFCFB",
        sage: {
          DEFAULT: "#5F6F62",
          light: "#7A8D7D",
          dark: "#4A5A4D",
        },
        earth: {
          DEFAULT: "#C2A888",
          light: "#D4BFA3",
          dark: "#A8906E",
        },
        warm: {
          50: "#FAF8F5",
          100: "#F5F0E8",
          200: "#EDE3D4",
        },
      },
      fontFamily: {
        sans: ["Assistant", "sans-serif"],
        serif: ["Frank Ruhl Libre", "serif"],
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
