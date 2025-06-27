// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://yorukot.me",
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    locales: ["en", "zh-tw"],
    defaultLocale: "en",

    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [
    icon(),
    sitemap({
      xslURL: "/sitemap.xsl",
    }),
  ],
});
