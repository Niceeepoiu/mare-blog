---
title: "About"
description: "A minimal and fast blog built with Astro."
---

## 🛜 Tech Stack

- [Astro](https://astro.build)
- [TailwindCSS](https://tailwindcss.com)

## 🚀 Getting Started

```bash
pnpm install  # Install dependencies
pnpm dev      # Start local dev server at localhost:4321
```

## ⚙️ Configuration

Customizing your blog is super easy. Simply modify the configuration file located at the root of the project:

- **Config file:** `./site.config.ts`

## ✍️ Content Management

All blog contents and static pages are managed using Astro Content Collections.

### 📝 Adding Blog Posts

Create new Markdown (`.md`) or MDX (`.mdx`) files inside the `src/content/blog/` directory:

```markdown
---
title: "My First Blog Post"
description: "This is a brief summary of the post."
pubDate: 2026-08-29
---

Your blog content goes here...
```

### 📄 Editing Pages (About, Privacy, etc.)

Static pages like the "About" page are stored in `src/content/pages/`. To modify the About page, edit `src/content/pages/about.md`:

```markdown
---
title: "About Me"
description: "Learn more about the author and this site."
---

Your page content goes here...
```

> **Note:** Any new Markdown file added to `src/content/pages/` (e.g. `friends.md`) will automatically generate its corresponding route (e.g. `/friends`).

## 🧞 Commands

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

## 🖼️ Preview

![Preview of Mare Blog](../../assets/preview.png)
