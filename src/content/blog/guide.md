---
title: "Getting Started with Mare Blog: Configuration and Usage Guide"
description: "A comprehensive guide on configuring your site, managing pages, publishing posts, and using CLI commands in Mare Blog."
pubDate: 2026-08-30
author: "Niceeepoiu"
---

Welcome to **Mare Blog**! This post serves as a complete walkthrough to help you set up, customize, and maintain your new blog. Whether you are modifying global configurations, managing your pages, or creating fresh content, you will find all the essential steps below.

## 1. Configuring Your Site

All global site metadata and third-party integrations (such as the Giscus comment system) are managed inside `src/site.config.ts`.

Open `src/site.config.ts` and update the values to match your personal details:

```typescript
export default defineConfig({
  siteTitle: "Mare Blog",
  author: "Niceeepoiu",
  authorUrl: "https://github.com/Niceeepoiu",

  giscus: {
    enable: false,
    repo: "Niceeepoiu/mare-blog",
    repoId: "R_kgDOUH3Ucg",
    category: "Announcements",
    categoryId: "DIC_kwDOUH3Ucs4DEfws",
    theme: "light",
    lang: "en",
  },
});
```

### Configuration Options Breakdown

#### Main Site Metadata

- **`siteTitle`**: Sets the global display name for your blog across the header.
- **`author`**: The default author name displayed on blog posts and footer copyright notices.
- **`authorUrl`**: The link attached to the author's name (e.g., your personal website or GitHub profile).

#### Giscus Comment System Settings

- **`enable`**: Toggle `true` to enable or `false` to globally disable the comment widget on blog posts.
- **`repo`**: Your GitHub repository path in `owner/repo` format where comments will be stored as Discussions.
- **`repoId`**: The unique GraphQL Node ID of your target GitHub repository.
- **`category`**: The target GitHub Discussion category name (e.g., `Announcements`).
- **`categoryId`**: The unique GraphQL Node ID of your chosen Discussion category.
- **`theme`**: The visual theme for the Giscus comment box (e.g., `light`, `dark`, `preferred_color_scheme`).
- **`lang`**: The interface language tag for the Giscus widget UI (e.g., `en`, `zh-CN`, `ja`).

## 2. Modifying the About Page

The About page content is managed via Markdown and located at `src/content/about.md`.

To update your personal bio:

1. Open the About Markdown file.
2. Update the Frontmatter metadata at the top if needed.
3. Edit the Markdown body below the Frontmatter to update your personal intro, project showcase, or social media links.

```markdown
---
title: "About Me"
description: "Learn more about Niceeepoiu and Mare Blog."
---

Hello! I'm **Niceeepoiu**, a software developer passionate about minimal design and open-source software.

### Projects & Showcase

- **Mare Blog**: A minimal, high-performance Astro blog template.
- **Project Two**: Another open-source initiative.

### Connect

- GitHub: [Niceeepoiu](https://github.com/Niceeepoiu)
- Twitter: [@your_handle](https://twitter.com)
```

## 3. Writing & Publishing Posts

Blog articles live inside the content directory: `src/content/blog/`.

To publish a new article:

1. Create a new `.md` or `.mdx` file in `src/content/blog/` (e.g., `my-first-post.md`).
2. Add the required Frontmatter metadata at the top of the file:

```markdown
---
title: "My First Blog Post"
description: "This is a short summary of my first blog post."
pubDate: 2026-08-30
---

Write your Markdown content here. You can use **bold text**, _italics_, code snippets, and lists.
```

The new post will automatically appear on your homepage and blog list.

## 4. Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                            |
| :--------------------- | :------------------------------------------------ |
| `pnpm install`         | Installs dependencies                             |
| `pnpm dev`             | Starts local dev server at `localhost:4321`       |
| `pnpm build`           | Builds your production site to `./dist/`          |
| `pnpm preview`         | Previews your build locally, before deploying     |
| `pnpm format`          | Formats code across the project using Prettier    |
| `pnpm astro ...`       | Runs CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Gets help using the Astro CLI                     |
