module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          200: '#C5DBFF',
          600: '#3774DB',
          700: '#3461B6',
          900: '#2C3764'
        }
      }
    },
    fontFamily: {
      sans: [
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
      ]
    }
  },
  plugins: [require('flowbite/plugin')]
};
