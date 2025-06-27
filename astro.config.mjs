// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yorukot.me',
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    locales: ['en', 'zh-tw'],
    defaultLocale: 'en',

    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [
    mdx({
      syntaxHighlight: 'prism',
    }),
    icon(),
    sitemap(),
  ],
});
