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
        // Broke Unicorn Tavern Theme - Brown and Tan Color Scheme
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
          950: '#2d1b1a',
        },
        'tan': {
          50: '#fefdfb',
          100: '#fef7ed',
          200: '#fdecd4',
          300: '#fbdca8',
          400: '#f7c475',
          500: '#f3a94a',
          600: '#ed8a1c',
          700: '#c86a12',
          800: '#a45516',
          900: '#864717',
          950: '#4a2509',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
