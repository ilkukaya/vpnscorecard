import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import pagefind from 'astro-pagefind';

export default defineConfig({
  site: 'https://vpnscorecard.com',
  integrations: [
    tailwind(),
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.8,
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          es: 'es-ES',
          tr: 'tr-TR',
        },
      },
    }),
    pagefind()
  ],
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'tr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
