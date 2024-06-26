const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height :
      {
        'custom-min-h-screen' : 'calc(100vh - 30%)'
      }
    },
  },
  plugins: [],
});