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
        // RuneFrameOS Color Scheme
        amber: {
          50: '#fffbeb',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          900: '#78350f',
        },
        orange: {
          50: '#fff7ed',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          800: '#9a3412',
        },
        red: {
          50: '#fef2f2',
          900: '#7f1d1d',
        },
      },
      fontFamily: {
        fantasy: ['Cinzel', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
