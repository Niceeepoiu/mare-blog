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
import { satteri } from "@astrojs/markdown-satteri";

const sourceExtensions = new Set([".astro", ".js", ".jsx", ".ts", ".tsx"]);

const getSourceFiles = (directory: string): string[] => {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) return getSourceFiles(entryPath);
    return sourceExtensions.has(extname(entry.name)) ? [entryPath] : [];
  });
};

const sourceFiles = [
  ...getSourceFiles(fileURLToPath(new URL("./src", import.meta.url))),
  fileURLToPath(new URL("./site.config.ts", import.meta.url)),
];
const lucideIcons = [
  ...new Set(
    sourceFiles
      .flatMap(
        (file) => readFileSync(file, "utf8").match(/lucide:[\w-]+/g) ?? [],
      )
      .map((name) => name.slice("lucide:".length)),
  ),
];

// https://astro.build/config
export default defineConfig({
  markdown: {
    processor: satteri({
      hastPlugins: [
        {
          name: "github-alerts",
          element: {
            filter: ["blockquote"],
            visit(node, context) {
              const firstParagraph = node.children.find(
                (child) => child.type === "element" && child.tagName === "p",
              );
              if (
                firstParagraph?.type !== "element" ||
                firstParagraph.tagName !== "p"
              ) {
                return;
              }

              const firstText = firstParagraph.children[0];
              if (firstText?.type !== "text") return;

              const match = firstText.value.match(
                /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?=$|[\t\r\n ])/,
              );
              if (!match) return;

              const alertType = match[1].toLowerCase();
              const remainingText = firstText.value
                .slice(match[0].length)
                .replace(/^[\t\r\n ]+/, "");
              const remainingChildren = [...firstParagraph.children];

              if (remainingText) {
                remainingChildren[0] = { ...firstText, value: remainingText };
              } else {
                remainingChildren.shift();
              }
              context.setProperty(
                firstParagraph,
                "children",
                remainingChildren,
              );

              const rawClasses = node.properties.className as unknown;
              const classNames = Array.isArray(rawClasses)
                ? rawClasses
                : typeof rawClasses === "string"
                  ? rawClasses.split(/\s+/)
                  : [];
              context.setProperty(node, "className", [
                ...classNames,
                "markdown-alert",
                `markdown-alert-${alertType}`,
              ]);
              context.insertBefore(firstParagraph, {
                type: "element",
                tagName: "p",
                properties: { className: ["markdown-alert-title"] },
                children: [{ type: "text", value: match[1] }],
              });

              if (remainingChildren.length === 0) {
                context.removeNode(firstParagraph);
              }
            },
          },
        },
      ],
    }),
  },
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
