import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";
import preact from "@astrojs/preact";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://alvechy.pages.dev",
  markdown: {
    gfm: true,
    shikiConfig: {
      theme: "material-theme-palenight",
      wrap: false,
    },
  },
  integrations: [mdx(), sitemap(), tailwind(), prefetch(), preact()],
  output: "hybrid",
  adapter: cloudflare(),
});
