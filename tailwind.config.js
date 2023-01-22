/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      animation: {
        tilt: "tilt 5s infinite linear",
      },
      keyframes: {
        tilt: {
          "0%, 50%, 100%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(8deg)",
          },
          "75%": {
            transform: "rotate(-8deg)",
          },
        },
      },
      colors: {
        blue: {
          10: "#3574f4",
        },
      },
    },
  },
  plugins: [],
};
