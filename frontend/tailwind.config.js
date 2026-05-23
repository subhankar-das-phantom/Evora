import { colors } from "./src/theme/colors.js";
import { spacing } from "./src/theme/spacing.js";
import { motion } from "./src/theme/motion.js";
import { radius } from "./src/theme/radius.js";
import { shadows } from "./src/theme/shadows.js";
import { typography } from "./src/theme/typography.js";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        evora: colors
      },
      spacing: spacing,
      transitionDuration: {
        fast: motion.fast,
        medium: motion.medium,
        large: motion.large,
      },
      transitionTimingFunction: {
        premium: motion.easeOut,
      },
      borderRadius: radius,
      boxShadow: shadows,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      maxWidth: {
        '5xl': '64rem', // 1024px reading sections
        '6xl': '72rem', // 1152px content pages
        '7xl': '80rem', // 1280px dashboards
      },
      backgroundImage: {
        "radial-fade": "radial-gradient(1400px 700px at 10% -10%, rgba(9,124,135,0.08), transparent 45%), radial-gradient(1000px 650px at 95% 0%, rgba(252,164,112,0.05), transparent 40%)"
      }
    },
  },
  plugins: [],
};