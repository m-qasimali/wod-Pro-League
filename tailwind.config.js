/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B6B5FF",
        secondary: "#E2E8F0",
        tertiary: "#0000ff",
        background: "#F9F9F9",
        text: "#1A1A1A",
        textSecondary: "#48525B",
      },

      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Add the Google Font here
      },

      boxShadow: {
        "custom-lg": "4px 4px 40px 0px #0000000F",
      },
    },
  },
  plugins: [],
};
