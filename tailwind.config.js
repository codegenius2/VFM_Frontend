const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      letterSpacing: {
        tighter: '-0.02em',
        normal: '0',
        wide: '0.5em',
      },
      colors: {
        header: 'rgba(217, 217, 217, 0.5)',
        navbar: 'rgba(200, 200, 200, 1.0)',
        primary: '#1E40AF', // Custom primary color
        secondary: '#1E3A8A', // Custom secondary color
        accent: '#1D4ED8', // Custom accent color
        'primary': '#000', // Custom primary text color
        'secondary': '#A0AEC0',
        badge: '#024DBE',
        back: '#DEDEDE',

        box: '#eee'
      },
      textShadow: {
        default: '0 2px 4px rgba(0, 0, 0, 0.10)',
        md: '0 4px 6px rgba(0, 0, 0, 0.10)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.10)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.10)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.10)',
      },
      width: {
        '1/10': '10%',
        '1/15': '15%',
        '1/90': '90%',
        '1/40': '40%',
        '1/12': '12%',
        '1/52': '52%',
        '1/50': '50%',
        '200': '200px',
        '246': '246px',
        '340': '340px',
        '350': '350px',
        '460': '460px'
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 4px gray',
        },
        '.text-shadow-md': {
          textShadow: '0 4px 6px gray',
        },
        '.text-shadow-lg': {
          textShadow: '0 10px 5px gray',
        },
        '.text-shadow-xl': {
          textShadow: '0 20px 25px gray',
        },
        '.text-shadow-2xl': {
          textShadow: '0 25px 50px gray',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ],
}