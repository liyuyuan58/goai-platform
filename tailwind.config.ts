import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./content/**/*.{ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#F3F4F6",
        surface: "#FFFFFF",
        primary: "#0B132B",
        secondary: "#64748B",
        brand: "#2563EB",
        brandSecondary: "#3B82F6",
        cyan: "#00C2FF",
        growth: "#12B76A",
        border: "#E4E7EC"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(16, 24, 40, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
