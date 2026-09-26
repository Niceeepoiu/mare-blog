// @ts-check
import { readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import siteConfig from "./site.config";

import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

const sourceExtensions = new Set([".astro", ".js", ".jsx", ".ts", ".tsx"]);

function getSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) return getSourceFiles(entryPath);
    return sourceExtensions.has(extname(entry.name)) ? [entryPath] : [];
  });
}

const sourceFiles = [
  ...getSourceFiles(fileURLToPath(new URL("./src", import.meta.url))),
  fileURLToPath(new URL("./site.config.ts", import.meta.url)),
];
const lucideIcons = [
  ...new Set(
    sourceFiles
      .flatMap((file) => readFileSync(file, "utf8").match(/lucide:[\w-]+/g) ?? [])
      .map((name) => name.slice("lucide:".length)),
  ),
];

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: siteConfig.url,
  integrations: [
    sitemap(),
    mdx(),
    icon({
      include: {
        lucide: lucideIcons,
      },
    }),
  ],
});