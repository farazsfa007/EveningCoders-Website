/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables dark mode via class
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        glow: "glow 2s ease-in-out infinite",
        'slow-bounce': 'slowBounce 3s infinite ease-in-out', // ➕ added slow bounce
      },
      keyframes: {
        glow: {
          '0%, 100%': {
            textShadow: '0 0 5px #3B82F6, 0 0 10px #3B82F6, 0 0 20px #ffffff',
          },
          '50%': {
            textShadow: '0 0 10px #ffffff, 0 0 20px #3B82F6, 0 0 30px #ffffff',
          },
        },
        slowBounce: { // ➕ added custom slow bounce animation
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
    },
  },
  plugins: [],
};
