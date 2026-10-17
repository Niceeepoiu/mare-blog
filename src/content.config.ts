import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    featured: z.boolean().default(false),
    tags: z.array(z.string().trim().min(1)).default([]),
  }),
});

const page = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/page" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/journal" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
  }),
});

const friend = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/friend" }),
  schema: z.object({
    name: z.string().trim().min(1),
    url: z.string().trim().min(1),
    description: z.string().trim().min(1),
    avatar: z.string().trim().min(1).optional(),
    darkAvatar: z.string().trim().min(1).optional(),
  }),
});

export const collections = { blog, page, journal, friend };
