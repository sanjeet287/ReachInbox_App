/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        primary: "#1A73E8",
        darkBg: "#121212",
        lightBg: "#F9FAFB",
        accent: "#6366F1"
      },
    },
  },
  plugins: [],
};
