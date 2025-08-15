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
        // TravelersTable Theme - Dark Brown to Light Tan
        'brown': {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
          950: '#2d1b1b',
        },
        'tan': {
          50: '#fefdfb',
          100: '#fef9f3',
          200: '#fdf2e4',
          300: '#fbe7d1',
          400: '#f8d5b3',
          500: '#f4c08c',
          600: '#eea665',
          700: '#e58c3d',
          800: '#d17a2e',
          900: '#a85f28',
          950: '#5a3214',
        },
        'dice': {
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
      fontFamily: {
        'fantasy': ['Cinzel', 'serif'],
        'handwriting': ['Kalam', 'cursive'],
      },
      textShadow: {
        'brown': '0 2px 4px rgba(67, 48, 43, 0.4)',
        'tan': '0 2px 4px rgba(168, 95, 40, 0.3)',
        'dice': '0 2px 4px rgba(217, 70, 239, 0.3)',
        'campaign': '0 2px 4px rgba(14, 165, 233, 0.3)',
      },
      boxShadow: {
        'brown': '0 4px 20px rgba(67, 48, 43, 0.2)',
        'tan': '0 4px 20px rgba(168, 95, 40, 0.15)',
        'dice': '0 4px 20px rgba(217, 70, 239, 0.3)',
        'campaign': '0 4px 20px rgba(14, 165, 233, 0.3)',
      }
    },
  },
  plugins: [],
}
