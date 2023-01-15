const defaultTheme = require("tailwindcss/defaultTheme");

/** @satisfies {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "salmon": "#FDBA74",
        "background": "#3D4B5F",
        "on-background": "#fffffe",
        "primary": "#8EC1D6",
        "on-primary": "#000000",
        "stroke": "#010101",
      },
      fontFamily: {
        sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
