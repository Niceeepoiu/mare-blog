---
title: "Getting Started with Mare Blog: Configuration and Usage Guide"
description: "A comprehensive guide on configuring your site, managing pages, publishing posts, and using CLI commands in Mare Blog."
pubDate: 2026-08-30
featured: false
tags: [astro, blogging]
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
  url: "https://mare-blog.pages.dev",
  nav: [
    { name: "Home", href: "/", icon: "lucide:home" },
    { name: "Blog", href: "/blog", icon: "lucide:book-open" },
    { name: "Journal", href: "/journal", icon: "lucide:calendar-days" },
    { name: "Tags", href: "/blog/tags", icon: "lucide:tags" },
    { name: "About", href: "/about", icon: "lucide:user" },
  ],

  giscus: {
    enabled: true,
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

The project defaults to Giscus enabled, but comments only render if the repo, repository ID, category, and category ID are all valid. If any of them are missing or invalid, the site shows a disabled notice instead of crashing during build or navigation.

### Configuration Options Breakdown

#### Main Site Metadata

- `title`: The global title of your blog used in SEO meta tags and header.
- `description`: Default meta description for social sharing and search engines.
- `author`: The name displayed in post footers and copyright claims.
- `authorUrl`: External link to your GitHub, Twitter, or personal portfolio.
- `authorBio`: Brief introduction featured in author cards.
- `url`: The public base URL.
- `nav`: Array of header links. Each item requires `name` (visible label) and
  `href` (destination path); `icon` is optional and accepts an icon identifier
  such as `lucide:home`. Add, remove, or reorder items in this array to customize
  the header navigation. Lucide icons referenced by the site are collected
  automatically during the build.

#### Giscus Comment System Settings

- `enabled`: Toggle `true` or `false` to show or hide comments globally. The default template uses `true`.
- `repo`: GitHub repository path formatted as `owner/repo`.
- `repoId`: Unique repository ID generated from giscus.app.
- `category`: Discussion category dedicated to blog comments.
- `categoryId`: Unique category ID generated from giscus.app.
- `theme`: Preset theme name applied in light mode.
- `darkTheme`: Preset theme name applied in dark mode.
- `lang`: Two-letter ISO language code for the comment UI.

When `enabled` is on but the repo credentials are incomplete, the UI shows a clear disabled state and keeps navigation working smoothly without breaking the page.

---

### Step-by-Step Guide: How to Obtain Giscus Credentials

Follow these steps to generate your required `repoId` and `categoryId`:

1. **Prepare Your GitHub Repository**:
   - Ensure your repository is **Public** (Giscus will not work with private repositories).
   - Enable the **Discussions** feature: Navigate to your repository **Settings** -> **General** -> check **Discussions**.

2. **Install the Giscus App**:
   - Grant Giscus permission to access your repository by visiting [github.com/apps/giscus](https://github.com/apps/giscus).

3. **Generate Credentials via Giscus Website**:
   - Head over to [giscus.app](https://giscus.app).
   - Scroll down to the **Repository** field and enter your repository path.
   - Choose a Discussion Category.
   - Scroll down to the **Enable giscus** section. Giscus will automatically generate a script tag containing your unique `data-repo-id` and `data-category-id`.
   - Copy these two values into your `/site.config.ts` file and set `enabled: true`.

---

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
2. Add the required Frontmatter metadata at the top of the file. Set `featured` to
   `true` if the post should appear in the homepage's featured section; it defaults
   to `false` when omitted.

```markdown
---
title: "Blog Title"
description: "description..."
pubDate: 2026-08-30
featured: true
tags: [astro, writing]
---

Write your Markdown content here.
```

Every new post appears in the blog list. Only posts with `featured: true` appear
in the homepage's featured section. If no posts are featured, the section shows
an empty-state message.

Use the optional `tags` field to group related posts. Tags appear on article
cards and article pages, link to their tag archive, and are listed at
`/blog/tags`. Posts without tags remain valid and are omitted from the tag index.

```yaml
tags:
  - astro
  - writing
```

## 4. Keeping a Journal

Short notes and moments can be published on the Journal timeline without
appearing in the blog archive. Create a `.md` or `.mdx` file in
`src/content/journal/` with a title and date/time:

```markdown
---
title: "A small note"
pubDate: 2026-09-26T14:30:00Z
---

Write a short note here. Markdown content appears directly on the timeline.
```

Entries are sorted newest first. The date and time appear beside each entry on
the left in UTC; its title and content appear on the right.

## 5. Commands

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
