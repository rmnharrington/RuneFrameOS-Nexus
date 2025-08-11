/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'fantasy': ['Cinzel', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        tavern: {
          50: '#fef7f0',
          100: '#fdecd8',
          200: '#fbd5b0',
          300: '#f8b77d',
          400: '#f5934a',
          500: '#f27522',
          600: '#e35d18',
          700: '#bc4616',
          800: '#963a1a',
          900: '#7a3219',
        },
        wood: {
          50: '#faf7f2',
          100: '#f3ede0',
          200: '#e7d9c0',
          300: '#d4bc8f',
          400: '#bc9a5f',
          500: '#a8844a',
          600: '#8f6d3d',
          700: '#745634',
          800: '#5f4630',
          900: '#4f3b2a',
        },
      },
      backgroundImage: {
        'tavern-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23a8844a\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
}

