/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        georgia: ['Georgia', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        customRed1: 'rgb(239, 77, 72)',
        customRed2: 'rgb(217, 7, 0)',
        customDark: 'rgb(43, 22, 27)',
        customGray: 'rgb(69, 62, 62)',
        lightGray: '#F4F4F5',
        white: '#FFFFFF',
        reddishWhite: '#F7F3F5',
      },
    },
  },
  plugins: [],
};
