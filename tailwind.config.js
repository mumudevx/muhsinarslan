/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue", // Include root app file
    "./content/**/*.md" // Include Markdown content files
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f6f7f9',
          100: '#eceff2',
          200: '#d4dbe3',
          300: '#afbcca',
          400: '#8399ad',
          500: '#647d93',
          600: '#4f647a',
          700: '#415163',
          800: '#384554',
          900: '#323c48',
          950: '#21272f',
        },
        accent: {
          50: '#faf8f2',
          100: '#f4f0e0',
          200: '#e8e0c0',
          300: '#d9ca98',
          400: '#ceb77d',
          500: '#bd9a52',
          600: '#af8647',
          700: '#926c3c',
          800: '#765736',
          900: '#60482e',
          950: '#33241f',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], // Default sans-serif
        serif: ['Merriweather', 'serif'], // For headings
      },
    },
  },
  plugins: [],
}

