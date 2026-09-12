---
title: "Getting Started with Mare Blog: Configuration and Usage Guide"
description: "A comprehensive guide on configuring your site, managing pages, publishing posts, and using CLI commands in Mare Blog."
pubDate: 2026-08-30
author: "Niceeepoiu"
---

Welcome to **Mare Blog**! This post serves as a complete walkthrough to help you set up, customize, and maintain your new blog. Whether you are modifying global configurations, managing your pages, or creating fresh content, you will find all the essential steps below.

## 1. Configuring Your Site

All global site metadata and third-party integrations (such as the Giscus comment system) are managed inside `/site.config.ts`.

Open `/site.config.ts` and update the values to match your personal details:

```typescript
export default defineConfig({
  title: "Mare Blog",
  description: "A minimal and fast blog built with Astro.",
  author: "Niceeepoiu",
  authorUrl: "https://github.com/Niceeepoiu",
  authorBio: "A passionate developer.",
  url: "https://mare-blog.niceeepoiu.workers.dev",

  giscus: {
    enabled: false,
    repo: "your-username/your-repo-name",
    repoId: "YOUR_GISCUS_REPO_ID",
    category: "Announcements",
    categoryId: "YOUR_GISCUS_CATEGORY_ID",
    theme: "light",
    darkTheme: "dark",
    lang: "en",
  },
});
```

### Configuration Options Breakdown

#### Main Site Metadata

- `title`: The global title of your blog used in SEO meta tags and header.
- `description`: Default meta description for social sharing and search engines.
- `author`: The name displayed in post footers and copyright claims.
- `authorUrl`: External link to your GitHub, Twitter, or personal portfolio.
- `authorBio`: Brief introduction featured in author cards.
- `url`: The public base URL (e.g., `https://mare-blog.cn.eu.org`).

#### Giscus Comment System Settings

- `enabled`: Toggle `true` or `false` to show or hide comments globally.
- `repo`: GitHub repository path.
- `repoId`: Unique repository ID generated from giscus.app.
- `category`: Discussion category dedicated to blog comments.
- `categoryId`: Unique category ID generated from giscus.app.
- `theme`: Preset theme name applied in light mode.
- `darkTheme`: Preset theme name applied in dark mode.
- `lang`: Two-letter ISO language code for the comment UI.

## 2. Modifying the About Page

The About page content is managed via Markdown and located at `src/content/page/about.md`.

To update your personal bio:

1. Open the About Markdown file.
2. Update the Frontmatter metadata at the top if needed.
3. Edit the Markdown body below the Frontmatter to update your personal intro, project showcase, or social media links.

```markdown
---
title: "Title"
description: "description..."
---

Write your Markdown content here.
```

## 3. Writing & Publishing Posts

Blog articles live inside the content directory: `src/content/blog/`.

To publish a new article:

1. Create a new `.md` or `.mdx` file in `src/content/blog/` (e.g., `my-first-post.md`).
2. Add the required Frontmatter metadata at the top of the file:

```markdown
---
title: "Blog Title"
description: "description..."
pubDate: 2026-08-30
---

Write your Markdown content here.
```

The new post will automatically appear on your homepage and blog list.

## 4. Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                         |
| :--------------------- | :--------------------------------------------- |
| `pnpm install`         | Installs dependencies                          |
| `pnpm dev`             | Starts local dev server at `localhost:4321`    |
| `pnpm build`           | Builds your production site to `./dist/`       |
| `pnpm preview`         | Previews your build locally, before deploying  |
| `pnpm format`          | Formats code across the project using Prettier |
| `pnpm astro ...`       | Runs Astro CLI commands                        |
| `pnpm astro -- --help` | Gets help using the Astro CLI                  |
