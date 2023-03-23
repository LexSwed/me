import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";
import vercel from "@astrojs/vercel/serverless";

const shikiResourcePaths = Object.keys(
  import.meta.glob([
    "./node_modules/shiki/languages/*.json",
    "./node_modules/shiki/themes/material-palenight.json",
  ])
);

// https://astro.build/config
export default defineConfig({
  site: "https://alex-vechi.vercel.app",
  integrations: [mdx(), sitemap(), tailwind(), prefetch()],
  output: "server",
  adapter: vercel({
    analytics: true,
    includeFiles: shikiResourcePaths,
  }),
});
