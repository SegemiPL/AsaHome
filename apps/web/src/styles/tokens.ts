// =============================================================================
// AsaHome Design Tokens — Single source of truth for all visual values.
// =============================================================================
// Every brand color, font, spacing, shadow, animation-duration, content
// max-width, and z-index MUST be defined here. Components MUST NOT scatter
// hardcoded brand colors.
// =============================================================================

export const tokens = {
  color: {
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
      muted:   "oklch(0.95 0.01 280)",
      card:    "oklch(1 0 0 / 0.85)",
    },
    text: {
      primary:   "oklch(0.15 0.02 280)",
      secondary: "oklch(0.40 0.02 280)",
      muted:     "oklch(0.60 0.01 280)",
      inverse:   "oklch(0.98 0 0)",
    },
    border: {
      DEFAULT: "oklch(0.88 0.01 280)",
      hover:   "oklch(0.78 0.02 280)",
    },
  },

  font: {
    sans: [
      '"Noto Sans SC"',
      '"Noto Sans JP"',
      '"PingFang SC"',
      '"Hiragino Sans GB"',
      '"Microsoft YaHei"',
      "sans-serif",
    ].join(", "),
    mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"].join(", "),
  },

  radius: {
    sm:   "0.25rem",
    md:   "0.5rem",
    card: "0.75rem",
    lg:   "1rem",
    full: "9999px",
  },

  shadow: {
    card:       "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
    cardHover:  "0 4px 12px 0 rgb(0 0 0 / 0.08)",
    modal:      "0 10px 40px 0 rgb(0 0 0 / 0.15)",
  },

  spacing: {
    page: "1.5rem",
    section: "4rem",
  },

  animation: {
    duration: {
      fast:    "150ms",
      normal:  "300ms",
      slow:    "500ms",
    },
    easing: {
      default: "ease-out",
    },
  },

  content: {
    maxWidth: "72rem",
    proseWidth: "65ch",
  },

  zIndex: {
    base:      0,
   dropdown:  10,
    sticky:    20,
    overlay:   30,
    modal:     40,
    toast:     50,
    character: 100,
    tooltip:   110,
  },

  breakpoint: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
} as const;

export type DesignTokens = typeof tokens;
