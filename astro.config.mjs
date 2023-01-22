import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";
import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), tailwind(), prefetch()],
  output: "static",
  adapter: vercel(),
});
