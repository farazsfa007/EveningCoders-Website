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
      },
    },
  },
  plugins: [],
};
