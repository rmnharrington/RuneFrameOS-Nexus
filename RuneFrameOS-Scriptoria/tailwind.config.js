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
        // BrokeUnicorn Tavern Theme - Gold & Stone Grey (identical to PersonaVault)
        'gold': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        'stone': {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        'character': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        'dice': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        }
      },
      fontFamily: {
        'fantasy': ['Cinzel', 'serif'],
        'handwriting': ['Kalam', 'cursive'],
      },
      textShadow: {
        'gold': '0 2px 4px rgba(59, 130, 246, 0.3)',
        'stone': '0 2px 4px rgba(28, 25, 23, 0.4)',
        'character': '0 2px 4px rgba(14, 165, 233, 0.3)',
        'dice': '0 2px 4px rgba(34, 197, 94, 0.3)',
      },
              boxShadow: {
          'gold': '0 4px 20px rgba(59, 130, 246, 0.15)',
          'stone': '0 4px 20px rgba(28, 25, 23, 0.2)',
          'character': '0 4px 20px rgba(14, 165, 233, 0.3)',
          'dice': '0 4px 20px rgba(34, 197, 94, 0.3)',
        }
    },
  },
  plugins: [],
}
