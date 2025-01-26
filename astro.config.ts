import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

import expressiveCode from "astro-expressive-code";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://alvechy.dev",
  markdown: {
    gfm: true,
    syntaxHighlight: false,
  },
  experimental: {
    svg: true,
  },
  vite: {
    ssr: {
      external: ["node:fs", "node:path", "@vercel/og"],
    },
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
