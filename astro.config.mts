// @ts-check
import siteConfig from "./site.config";

import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: siteConfig.siteUrl,
  integrations: [sitemap()],
});