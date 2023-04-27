/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        pc: "80%",
        mobile: "90%",
      },
      colors: {
        ourGreen: "#90d0b1",
      },
    },
  },
  plugins: [],
};
