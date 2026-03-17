export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          400: 'rgb(var(--theme-primary-400) / <alpha-value>)',
          500: 'rgb(var(--theme-primary-500) / <alpha-value>)',
          600: 'rgb(var(--theme-primary-600) / <alpha-value>)',
        },
        blue: {
          400: 'rgb(var(--theme-secondary-400) / <alpha-value>)',
          500: 'rgb(var(--theme-secondary-500) / <alpha-value>)',
          600: 'rgb(var(--theme-secondary-600) / <alpha-value>)',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        archivo: ['Archivo', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
