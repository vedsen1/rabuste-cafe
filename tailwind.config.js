/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        brown: {
          900: "#2F1B14", // Espresso brown
          800: "#3C2414", // Deep chocolate brown (Primary)
        },
        cream: {
          100: "#F5E6D3", // Rich cream (Primary)
          200: "#E8D5B7", // Latte beige
        },
        gold: {
          400: "#D4AF37", // Warm gold (Primary)
          500: "#B87333", // Copper accents
        },
      },
      fontFamily: {
        serif: ["Cinzel", "serif"],
        sans: ["Fauna One", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
    },
  },
  plugins: [],
};