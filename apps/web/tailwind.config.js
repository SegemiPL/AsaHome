/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    require("@tailwindcss/typography"),
  ],
  theme: {
    extend: {
      // Design Tokens — see src/styles/tokens.ts for the canonical definitions.
      // Tailwind theme extensions mirror those tokens so utility classes match.
      colors: {
        // Brand palette — Galgame character theme + modern tech
        brand: {
          50:  "oklch(0.97 0.01 280)",
          100: "oklch(0.93 0.02 280)",
          200: "oklch(0.85 0.04 280)",
          300: "oklch(0.75 0.06 280)",
          400: "oklch(0.65 0.08 280)",
          500: "oklch(0.55 0.10 280)",
          600: "oklch(0.45 0.09 280)",
          700: "oklch(0.35 0.08 280)",
          800: "oklch(0.25 0.06 280)",
          900: "oklch(0.15 0.04 280)",
        },
        surface: {
          DEFAULT: "oklch(0.98 0.01 280)",
          muted: "oklch(0.95 0.01 280)",
          card: "oklch(1 0 0 / 0.85)",
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans SC"',
          '"Noto Sans JP"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          "sans-serif",
        ],
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },
      maxWidth: {
        content: "72rem",
        prose: "65ch",
      },
      borderRadius: {
        card: "0.75rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        "card-hover": "0 4px 12px 0 rgb(0 0 0 / 0.08)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
