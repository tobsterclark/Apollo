module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Lekton', 'sans-serif']
    },
    extend: {
        colors: {
          transparent: 'transparent',
          current: 'currentColor',
          theme: {
            black: '#17252A',
            dark: '#2B7A78',
            DEFAULT: '#3AAFA9',
            light: '#DEF2F1',
            white: '#FEFFFF'
          }
        },
    }
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
