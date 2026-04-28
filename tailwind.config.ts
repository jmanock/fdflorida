import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        gulf: "#0284C7",
        ocean: "#0EA5E9",
        gold: "#F59E0B",
        sand: "#FAFAF7",
        slateText: "#475569",
        skyline: "#E0F2FE",
        coral: "#F59E0B",
        mint: "#14B8A6"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(15, 23, 42, 0.12)",
        card: "0 16px 50px rgba(15, 23, 42, 0.08)",
        premium: "0 24px 70px rgba(14, 165, 233, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
