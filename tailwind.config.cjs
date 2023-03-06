const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
      colors: {
        // "background": "#232946", // just dark
        // "on-background": "#fffffe",
        // "background": "#b8c1ec", // blueish
        // "on-background": "#232946",
        "background": "#16161a", // blue-dark
        "on-background": "#F8FBFE",
        // "primary": "#8EC1D6", // aqua-ish
        "primary": "#FDBA74", // yellow-ish
        // "primary": "#eebbc3", // pink-ish
        // "primary": "#b8c1ec", // blue-ish
        "on-primary": "#232946",
        "stroke": "#010101",
      },
      fontFamily: {
        sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
