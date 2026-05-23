// Tropical Jade Sunrise Palette + Neutral Anchors
// Palette colors remain static (they don't change between themes).
// Semantic tokens (surface, text, border) use CSS variables for dark mode support.
export const colors = {
  // Palette (static — these are the brand identity)
  primary: {
    DEFAULT: "#097C87",
    foreground: "#FFFFFF",
    hover: "#07646D",
  },
  accent: {
    DEFAULT: "#FCA470",
    foreground: "#1C1917",
    hover: "#F98F53",
  },
  highlight: {
    DEFAULT: "#23CED9",
    foreground: "#1C1917",
  },
  support: {
    DEFAULT: "#A1CCA6",
  },
  neutral: {
    50: "#FAFAF9",
    100: "#F5F5F4",
    200: "#E7E5E4",
    300: "#D6D3D1",
    400: "#A8A29E",
    700: "#44403C",
    900: "#1C1917",
  },

  // Semantic tokens (CSS-variable-driven for theme switching)
  surface: {
    primary: "var(--surface-primary)",
    secondary: "var(--surface-secondary)",
    tertiary: "var(--surface-tertiary)",
    muted: "var(--surface-muted)",
    hover: "var(--surface-hover)",
  },
  text: {
    primary: "var(--text-primary)",
    secondary: "var(--text-secondary)",
    muted: "var(--text-muted)",
  },
  border: {
    DEFAULT: "var(--border)",
    soft: "var(--border-soft)",
  },
  trend: {
    positive: "var(--trend-positive)",
    negative: "var(--trend-negative)",
  },
};
