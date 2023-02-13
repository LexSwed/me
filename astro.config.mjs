import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";
import vercel from "@astrojs/vercel/serverless";
import commonjs from "vite-plugin-commonjs";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), tailwind(), prefetch()],
  output: "server",
  adapter: vercel({
    analytics: true,
  }),
  vite: {
    plugins: [commonjs()],
  },
});
