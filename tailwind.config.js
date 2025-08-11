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
        distillara: {
          primary: '#f59e0b',    // amber-500
          secondary: '#ea580c',   // orange-600
          accent: '#dc2626',      // red-600
          dark: '#92400e',        // amber-800
          light: '#fef3c7',       // amber-100
        }
      },
      // iPad-optimized spacing and sizing
      spacing: {
        '18': '4.5rem',  // 72px - good touch target
        '22': '5.5rem',  // 88px - larger touch target
      },
      // Touch-friendly border radius
      borderRadius: {
        '3xl': '1.5rem',  // 24px
        '4xl': '2rem',     // 32px
      },
      // Smooth transitions for touch interactions
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      // Touch-friendly shadows
      boxShadow: {
        'touch': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'touch-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}

