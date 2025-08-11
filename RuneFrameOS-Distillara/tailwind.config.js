/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // RuneFrameOS Brand Colors
        'amber': {
          50: '#fffbeb',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        'orange': {
          50: '#fff7ed',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        'red': {
          50: '#fef2f2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        // Distillara-specific colors (keeping for compatibility)
        'distillara-primary': '#8B4513',
        'distillara-secondary': '#D2691E',
        'distillara-accent': '#FFD700',
        'distillara-dark': '#2F1B14',
        'distillara-light': '#F5DEB3',
      },
      fontFamily: {
        'fantasy': ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [],
}
