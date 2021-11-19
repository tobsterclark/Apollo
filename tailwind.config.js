module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors: {
          transparent: 'transparent',
          current: 'currentColor',
          black: {
            DEFAULT: '#1A1A1D',
          },
          gray: {
            DEFAULT: '#4E4E50',
          },
          red: {
            dark: '#6F2232',
            DEFAULT: '#950740',
            vibrant: '#C3073F'
          }
        }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
