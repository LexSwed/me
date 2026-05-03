import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

import expressiveCode from "astro-expressive-code";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://alvechy.dev",
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
      formats: ["woff2", "woff"],
    },
  ],
  markdown: {
    gfm: true,
    syntaxHighlight: false,
  },
  vite: {
    build: {
      minify: false,
      cssMinify: "lightningcss",
    },
    plugins: [tailwindcss()],
    css: {
      transformer: "lightningcss",
      lightningcss: {
        drafts: {
          customMedia: true,
        },
      },
    },
  },
  integrations: [
    expressiveCode({
      themes: ["material-theme-palenight"],
      styleOverrides: {
        frames: {
          tooltipSuccessBackground: "var(--color-primary)",
          tooltipSuccessForeground: "var(--color-on-primary)",
        },
      },
    }),
    mdx(),
    sitemap(),
    robotsTxt(),
  ],
  output: "static",
});
