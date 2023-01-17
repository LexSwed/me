const defaultTheme = require("tailwindcss/defaultTheme");

/** @satisfies {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "salmon": "#FDBA74",
        "background": "#b8c1ec",
        "on-background": "#232946",
        // "primary": "#8EC1D6",
        "primary": "#eebbc3",
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
