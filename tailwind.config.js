module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#6BAEC9',
        secondary: '#4A4A4A',
        terciary: '#DDC9A3',
        accent: '#F7A38B',
        neutral: '#FFFFFF',
        primaryHover: '#A8D7E6',
        fondo: '#F8F8F5'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'base': '0 2px 8px 0 rgba(28,37,44,0.1)',
      },
      borderRadius: {
        'base': '12px',
      }
    },
  },
  plugins: [],
  content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
],

}
