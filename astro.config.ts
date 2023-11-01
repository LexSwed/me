import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";
import preact from "@astrojs/preact";
import cloudflare from "@astrojs/cloudflare";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://alvechy.dev",
  markdown: {
    gfm: true,
    shikiConfig: {
      theme: "material-theme-palenight",
      wrap: false
    }
  },
  integrations: [mdx(), sitemap(), tailwind(), prefetch(), preact(), robotsTxt()],
  output: "hybrid",
  adapter: cloudflare()
});