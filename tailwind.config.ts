import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        paper: "var(--paper)",
        surface: "var(--surface)",
        muted: "var(--muted)",
        border: "var(--border)",
        signal: "var(--signal)",
        amber: "var(--amber)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        "draw-line": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
        "pulse-node": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        "text-shimmer": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        blob1: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(60px, -50px) scale(1.2)' },
          '66%': { transform: 'translate(-30px, 40px) scale(0.9)' },
        },
        blob2: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-70px, 40px) scale(1.1)' },
          '66%': { transform: 'translate(40px, -60px) scale(0.95)' },
        },
        blob3: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(50px, 60px) scale(1.15)' },
          '66%': { transform: 'translate(-50px, -40px) scale(0.85)' },
        },
        blob4: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-40px, -50px) scale(1.05)' },
          '66%': { transform: 'translate(60px, 30px) scale(1.1)' },
        },
      },
      animation: {
        'blob-1': 'blob1 12s ease-in-out infinite',
        'blob-2': 'blob2 15s ease-in-out infinite',
        'blob-3': 'blob3 10s ease-in-out infinite',
        'blob-4': 'blob4 14s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;