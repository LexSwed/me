import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import prefetch from '@astrojs/prefetch';
import preact from '@astrojs/preact';
import { remarkShiki } from './plugins/shiki';
const shikiResourcePaths = Object.keys(
  import.meta.glob([
    './node_modules/shiki/languages/*.json',
    './node_modules/shiki/themes/material-palenight.json',
  ]),
);

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: 'https://alvechy.vercel.app',
  markdown: {
    syntaxHighlight: false,
    gfm: true,
    remarkPlugins: [
      [
        remarkShiki,
        {
          theme: 'material-theme-palenight',
        },
      ],
    ],
  },
  integrations: [mdx(), sitemap(), tailwind(), prefetch(), preact()],
  output: 'hybrid',
  experimental: {
    assets: true,
    viewTransitions: true,
  },
  adapter: vercel({
    analytics: true,
    includeFiles: shikiResourcePaths,
  }),
});
