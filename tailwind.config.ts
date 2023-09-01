import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config = {
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
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(0.5rem)" },
          "100%": { transform: "none" },
        },
      },
      animation: {
        slideUp: "slideUp 0.3s 0.1s ease-in-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
