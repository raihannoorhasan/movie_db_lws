/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.25rem",
      },
      colors: {
        primary: "#00D991",
        dark: "#171923",
        light: "#fff",
        body: "#1D1E28",
        "moviedb-red": "#E50914",
        "moviedb-black": "#221F1F",
        "moviedb-gray": "#353535",
      },
      // animation: {
      //   "spin-slow": "spin 4s linear infinite",
      //   pulse: "pulse 1.5s infinite",
      // },
      animation: {
        "spin-fast": "spin 1s linear infinite",
        pulse: "pulse 2s infinite",
      },
      blur: {
        "3xl": "50px",
      },
    },
  },
  plugins: [],
};
