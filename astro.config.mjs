import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Sitio estático: cada página se genera como HTML para que Google la lea completa.
export default defineConfig({
  site: 'https://zolutionsai.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) => !/\/(gracias|404)$/.test(page),
    }),
  ],
});
