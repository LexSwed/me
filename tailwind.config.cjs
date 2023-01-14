const defaultTheme = require("tailwindcss/defaultTheme");

/** @satisfies {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "background": "#16161a",
        "on-background": "#fffffe",
        "accent": "#7f5af0",
        "on-accent": "#fffffe",
        "stroke": "#010101",
      },
      fontFamily: {
        sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
