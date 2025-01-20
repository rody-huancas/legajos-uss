/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#7DFA00",
          200: "#5FED00",
        },
        secondary: {
          100: "#F0F0F0",
          200: "#DCDCDC",
          300: "#BEBEBE",
          800: "#333333",
        },
        "uss-purple": {
          100: "#6A1B9A",
        },
        "uss-turquoise": {
          100: "#2ABDAA",
        },
      },
      width: {
        content: "330px"
      },
      padding: {
        content: "330px"
      },
      margin: {
        content: "330px"
      },
    },
  },
  plugins: [],
};
