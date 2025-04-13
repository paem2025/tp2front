const animate = require("tailwindcss-animate");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // Activa modo oscuro por clase
  theme: {
    extend: {
      colors: {
        // Colores opcionales personalizados (por si querés usarlos más adelante)
        primary: {
          light: '#3b82f6', // azul claro
          dark: '#2563eb',  // azul oscuro
        },
        background: {
          light: '#f3f4f6',
          dark: '#111827',
        },
      },
    },
  },
  plugins: [animate],
};
