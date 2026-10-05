# Mare Blog

A fast, minimal personal blog built with **Astro**. Publish articles, short
journal entries, and standalone pages with a responsive reading experience,
instant search, and no server-side runtime.

## 🖼️ Preview

![Mare Blog Preview](./src/assets/preview.png)

👉 [View Live Demo →](https://mare-blog.pages.dev)

## ✨ Key Features

- **Static and fast**: Astro generates pages at build time, with no client-side JavaScript by default.
- **Full-text search**: Pagefind indexes the site during the production build.
- **Responsive themes**: Tailwind CSS styling with light and dark modes.
- **Comments**: Optional Giscus comments backed by GitHub Discussions.
- **RSS feed**: Subscribe to new posts at `/rss.xml`.
- **Three content types**: Publish blog posts, timeline-style journal entries, and standalone pages.

## 🧰 Tech Stack

- [Astro](https://astro.build) · [Tailwind CSS](https://tailwindcss.com) · [Pagefind](https://pagefind.app) · [Giscus](https://giscus.app)

## 🚀 Deploy to Cloudflare Pages

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy%20to-Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white)](https://dash.cloudflare.com/?to=/:account/pages/new/provider/github)

Open the Cloudflare Pages setup, authorize GitHub, and select your copy of this
repository. Use these build settings:

| Setting                | Value                               |
| :--------------------- | :---------------------------------- |
| Framework preset       | Astro                               |
| Build command          | `pnpm build`                        |
| Build output directory | `dist`                              |
| Environment variable   | `NODE_VERSION` = `22.12.0` or later |

The `pnpm build` command also generates the Pagefind search index. Cloudflare
Pages will build and deploy the site whenever you push changes to the connected
Git branch.

## 💻 Run Locally

Requires Node.js `22.12.0` or later and [pnpm](https://pnpm.io/).

```bash
git clone https://github.com/Niceeepoiu/mare-blog.git
cd mare-blog
pnpm install
pnpm dev
```

The development server runs at `http://localhost:4321`. Before publishing,
update [`site.config.ts`](./site.config.ts) with your site details and
integrations.

## 📖 Documentation

See the [configuration and usage guide](https://mare-blog.pages.dev/blog/guide/)
for site settings, Giscus setup, and instructions for publishing content.

## 🧞 Commands

| Command                | Action                                         |
| :--------------------- | :--------------------------------------------- |
| `pnpm install`         | Installs dependencies                          |
| `pnpm dev`             | Starts local dev server at `localhost:4321`    |
| `pnpm build`           | Builds your production site to `./dist/`       |
| `pnpm preview`         | Previews your production build locally         |
| `pnpm format`          | Formats code across the project using Prettier |
| `pnpm astro ...`       | Runs Astro CLI commands                        |
| `pnpm astro -- --help` | Gets help using the Astro CLI                  |
