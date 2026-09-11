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

- **`title`**: The global title of your blog.
- **`description`**: The primary summary and description of your site.
- **`author`**: The name of the site author or owner.
- **`authorUrl`**: Link to the author's profile or personal website.
- **`authorBio`**: A short biography or intro text for the author.
- **`url`**: The base production URL where your website is hosted.

#### Giscus Comment System Settings

- **`enabled`**: Set to `true` to enable Giscus comments on post pages, or `false` to disable.
- **`repo`**: Target GitHub repository in `owner/repo` format.
- **`repoId`**: The unique GraphQL Node ID of your repository.
- **`category`**: The Discussion category name (e.g., `Announcements`).
- **`categoryId`**: The unique GraphQL Node ID of your chosen category.
- **`theme`**: Theme for the Giscus widget in light mode.
- **`darkTheme`**: Theme for the Giscus widget in dark mode.
- **`lang`**: The interface language for the Giscus UI (e.g., `en`, `zh-CN`).

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
