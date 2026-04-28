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
        ink: "#0f172a",
        ocean: "#0369a1",
        skyline: "#e0f2fe",
        coral: "#f97316",
        mint: "#14b8a6"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.10)",
        card: "0 12px 36px rgba(2, 132, 199, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
