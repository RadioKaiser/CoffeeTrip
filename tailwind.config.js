/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          dark: '#1a0f0a',
          medium: '#2d1810',
          light: '#4a2c1a',
        },
        beige: {
          light: '#F5F5DC',
          medium: '#e8e4d0',
          dark: '#d4cfb8',
        },
        gold: '#c9a961',
        terracotta: '#c77251',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}