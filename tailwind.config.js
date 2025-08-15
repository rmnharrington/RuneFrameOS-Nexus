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
        // Tapestry Engine World Building Theme - Light Yellow and Green
        'tapestry': {
          50: '#fefef7',
          100: '#fdfde8',
          200: '#fbfbd1',
          300: '#f7f7a8',
          400: '#f0f075',
          500: '#e6e63a',
          600: '#d4d41f',
          700: '#b0b014',
          800: '#8c8c16',
          900: '#737315',
          950: '#42420a',
        },
        'world': {
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
        },
        'story': {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        'campaign': {
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
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      textShadow: {
        'tapestry': '0 2px 4px rgba(212, 212, 31, 0.3)',
        'world': '0 2px 4px rgba(34, 197, 94, 0.3)',
        'story': '0 2px 4px rgba(234, 179, 8, 0.3)',
        'campaign': '0 2px 4px rgba(14, 165, 233, 0.3)',
      },
      boxShadow: {
        'tapestry': '0 4px 6px -1px rgba(212, 212, 31, 0.1), 0 2px 4px -1px rgba(212, 212, 31, 0.06)',
        'world': '0 4px 6px -1px rgba(34, 197, 94, 0.1), 0 2px 4px -1px rgba(34, 197, 94, 0.06)',
        'story': '0 4px 6px -1px rgba(234, 179, 8, 0.1), 0 2px 4px -1px rgba(234, 179, 8, 0.06)',
        'campaign': '0 4px 6px -1px rgba(14, 165, 233, 0.1), 0 2px 4px -1px rgba(14, 165, 233, 0.06)',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-tapestry': {
          'text-shadow': '0 2px 4px rgba(212, 212, 31, 0.3)',
        },
        '.text-shadow-world': {
          'text-shadow': '0 2px 4px rgba(34, 197, 94, 0.3)',
        },
        '.text-shadow-story': {
          'text-shadow': '0 2px 4px rgba(234, 179, 8, 0.3)',
        },
        '.text-shadow-campaign': {
          'text-shadow': '0 2px 4px rgba(14, 165, 233, 0.3)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

