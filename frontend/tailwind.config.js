import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

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
        background: '#0B0F19',
        surface: '#111827',
        'surface-elevated': '#1C2433',
        primary: '#6366F1',
        'primary-hover': '#818CF8',
        accent: '#8B5CF6',
        cyan: '#0EA5E9',
        'text-primary': '#E5E7EB',
        'text-muted': '#94A3B8',
        'text-secondary': '#CBD5E1',
        border: '#1F2937',
        'border-hover': '#374151',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.5rem",
        "full": "9999px",
      },
      fontFamily: {
        "headline": ["Geist", "Inter", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "800" }],
        "display-md": ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-md": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        "headline-sm": ["1.25rem", { lineHeight: "1.4", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["1rem", { lineHeight: "1.5", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        "label-md": ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }],
        "label-sm": ["0.75rem", { lineHeight: "1.3", letterSpacing: "0.02em", fontWeight: "500" }],
      },
      maxWidth: {
        '7xl': '80rem',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(99, 102, 241, 0.2)',
        'glow-md': '0 0 25px rgba(99, 102, 241, 0.3)',
        'glow-lg': '0 0 35px rgba(99, 102, 241, 0.4)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 30px -10px rgba(99, 102, 241, 0.1)',
      },
      animation: {
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    forms,
    containerQueries
  ],
};
