/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#106587",
          200: "#106585",
          500: "#1e3f48",
        },
        pink: {
          50: "#d7b4af",
          100: "#d9b6b1",
          200: "#e28b7a",
          300: "#e48b7a",
          500: "#ff8166"
        },
        purple: {
          50: "#767fa5",
          100: "#767fa7"
        },
        green: {
          50: "#b9bba3",
          200: "#7ed957",
          500: "#99b83c"
        },
        yellow: {
          50: "#fff8cc",
          100: "#bbbda5",
          300: "#ffda7b",
          400: "#daa972",
          700: "#6b625e",
        },
        white: {
          50: "#ffffff",
          100: "#f8f7f4"
        }
      }
    },
  },
  plugins: [],
}

