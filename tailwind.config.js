/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage:{
        'bubble-bg': "url('/public/images/login-bg.png)"
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

