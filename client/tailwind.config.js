/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          50: "#e8f9f6",
          100: "#b7ede2",
          200: "#94e5d5",
          300: "#64d9c1",
          400: "#45d1b5",
          500: "#17c6a3",
          600: "#15b494",
          700: "#108d74",
          800: "#0d6d5a",
          900: "#0a5344",
        },

        grey: {
          10: "#FBFBFB",
          50: "#e9e9e9",
          100: "#b9b9b9",
          200: "#989898",
          300: "#686868",
          400: "#4b4b4b",
          500: "#1e1e1e",
          600: "#1b1b1b",
          700: "#151515",
          800: "#111111",
          900: "#0d0d0d",
        },

        negative: "#FC4547",
        "negative-25": "#FED0D1",
        warning: "#FEA53F",
        "warning-25": "#FEE8CF",
        link: "#3EAFFF",
        "link-25": "#CEEBFF",
        positive: "#37C976",
        "positive-25": "#CDF1DC",
      },
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    backgroundImage: {
      // "vector-header": 'url("./assets/vector.png")',
      // "vector-header-2": 'url("./assets/vector-2.png")',
      // "ellipse-header": 'url("./assets/ellipse.svg")',
      // "doctor-header": 'url("./assets/doctor.svg")',
      "error-timeout": 'url("./assets/error-timeout.png")',
      "error-notfound": 'url("./assets/notfound.svg")',
    },
  },
  plugins: [],
  important: true,
};
