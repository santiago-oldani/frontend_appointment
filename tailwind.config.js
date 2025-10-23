// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Asegúrate de que esta ruta escanee todos tus archivos de React (TSX/JSX)
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}