/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "very-dark": "hsl(0, 0%, 17%)",
        "dark-grey": "hsl(0, 0%, 59%)"
      },
      fontSize: {
        input: "18px"
      },
      fontFamily: {
        sans: "var(--font-rubik);"
      },
      screens: {
        desktop: "1440px",
        tablet: "768px"
      },
      backgroundImage: {
        desktop: 'url(/pattern-bg-desktop.png);',
        mobile: 'url(/pattern-bg-mobile.png);'
      }
    },
  },
  plugins: [],
};
