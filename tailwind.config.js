/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f2ff',
          100: '#ece6ff',
          200: '#d9ccff',
          300: '#b6a0ff',
          400: '#8b69ff',
          500: '#6a35ff',
          600: '#5c18ff',
          700: '#4b0ed9',
          800: '#3a0aa8',
          900: '#230a66'
        },
        accent: {
          500: '#ff3b6b'
        }
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(0,0,0,0.15)',
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial']
      }
    },
  },
  plugins: [],
}