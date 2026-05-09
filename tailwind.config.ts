import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          warm: "#9b8b73",
          light: "#c4b8a4",
          lighter: "#e8e2d9",
          subtle: "#f5f2ed",
        },
        ink: {
          DEFAULT: "#111111",
          secondary: "#555555",
          muted: "#999999",
          faint: "#cccccc",
        },
        canvas: {
          DEFAULT: "#ffffff",
          subtle: "#faf9f7",
          muted: "#f5f4f1",
          warm: "#ede9e3",
        },
        border: {
          DEFAULT: "#e8e6e1",
          subtle: "#f0ede8",
          strong: "#d0cdc8",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "serif"],
      },
      fontSize: {
        "2xs": ["11px", "16px"],
        xs: ["12px", "18px"],
        sm: ["13px", "20px"],
        base: ["15px", "24px"],
        lg: ["17px", "26px"],
        xl: ["19px", "28px"],
        "2xl": ["22px", "32px"],
        "3xl": ["28px", "36px"],
        "4xl": ["36px", "44px"],
        "5xl": ["48px", "56px"],
        "6xl": ["60px", "68px"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-md": "0 4px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
        "card-lg": "0 8px 32px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
