import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
import robotsTxt from "astro-robots-txt";

import expressiveCode from "astro-expressive-code";
import tailwindConfig from "./tailwind.config";

// https://astro.build/config
export default defineConfig({
  site: "https://alvechy.dev",
  markdown: {
    gfm: true,
    syntaxHighlight: false,
  },
  vite: {
    ssr: {
      external: ["node:fs", "node:path", "@vercel/og"],
    },
  },
  integrations: [
    expressiveCode({
      themes: ["material-theme-palenight"],
      styleOverrides: {
        frames: {
          tooltipSuccessBackground: tailwindConfig.theme.extend.colors.primary,
          tooltipSuccessForeground:
            tailwindConfig.theme.extend.colors["on-primary"],
        },
      },
    }),
    mdx(),
    sitemap(),
    tailwind(),
    robotsTxt(),
  ],
  output: "hybrid",
  adapter: cloudflare({
    imageService: "compile",
  }),
});
