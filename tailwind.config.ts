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
        parchment: "#f5f0e8",
        "parchment-dark": "#e8dfd3",
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        wood: {
          light: "#c9a06c",
          DEFAULT: "#8b6914",
          dark: "#5c3d0e",
          shelf: "#6b4423",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
        display: [
          "Palatino",
          '"Palatino Linotype"',
          '"Book Antiqua"',
          "Georgia",
          "serif",
        ],
      },
      boxShadow: {
        book: "2px 3px 8px rgba(0,0,0,0.3), inset -2px 0 4px rgba(0,0,0,0.15)",
        "book-hover":
          "4px 6px 16px rgba(0,0,0,0.4), inset -2px 0 4px rgba(0,0,0,0.15)",
        shelf: "0 4px 12px rgba(0,0,0,0.3), inset 0 2px 4px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
