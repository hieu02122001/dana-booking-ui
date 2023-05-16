/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      bree: ['Bree Serif', 'serif'],
    },

    colors: {
      primary: "#088395",
      primaryHover: "#05BFDB",
      noColor: "transparent",
      grayCustom: "rgb(100 116 139)",
      lightRed: "#e6a0db",
      grayLight: "#E7ECF3",
      grayText: "#475569",
      grayLigherText: "#94A3B8",
      green: colors.green,
      cyan: colors.cyan,
      orange: colors.orange,
      white: "#FFFFFF",
      slate: colors.slate,
      black: colors.black,
      red: colors.red,
      purple: colors.purple,
      gray: colors.gray,
      pink: colors.pink,
      teal: colors.teal,
    },
    extend: {},
  },
  plugins: [],
};
