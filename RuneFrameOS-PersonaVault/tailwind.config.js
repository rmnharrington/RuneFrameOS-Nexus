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
        gold: {
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
        stone: {
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
        character: {
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
        dice: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        }
      },
      textShadow: {
        'gold': '0 2px 4px rgba(234, 179, 8, 0.3)',
        'stone': '0 2px 4px rgba(87, 83, 78, 0.3)',
        'character': '0 2px 4px rgba(14, 165, 233, 0.3)',
        'dice': '0 2px 4px rgba(217, 70, 239, 0.3)',
      },
      boxShadow: {
        'gold': '0 4px 6px -1px rgba(234, 179, 8, 0.1), 0 2px 4px -1px rgba(234, 179, 8, 0.06)',
        'stone': '0 4px 6px -1px rgba(87, 83, 78, 0.1), 0 2px 4px -1px rgba(87, 83, 78, 0.06)',
        'character': '0 4px 6px -1px rgba(14, 165, 233, 0.1), 0 2px 4px -1px rgba(14, 165, 233, 0.06)',
        'dice': '0 4px 6px -1px rgba(217, 70, 239, 0.1), 0 2px 4px -1px rgba(217, 70, 239, 0.06)',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-gold': {
          'text-shadow': '0 2px 4px rgba(234, 179, 8, 0.3)',
        },
        '.text-shadow-stone': {
          'text-shadow': '0 2px 4px rgba(87, 83, 78, 0.3)',
        },
        '.text-shadow-character': {
          'text-shadow': '0 2px 4px rgba(14, 165, 233, 0.3)',
        },
        '.text-shadow-dice': {
          'text-shadow': '0 2px 4px rgba(217, 70, 239, 0.3)',
        },
        '.dice-button': {
          '@apply bg-gradient-to-r from-dice-600 to-dice-700 text-white px-3 py-2 rounded-lg hover:from-dice-500 hover:to-dice-600 transition-all duration-200 font-medium border border-dice-500 hover:border-dice-400 shadow-sm hover:shadow-md': {},
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
