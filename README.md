# Mare Blog 🥳

A minimal, lightning-fast personal blog built with **Astro**, **Tailwind CSS**, and **Pages CMS**.

## 🖼️ Preview

![Mare Blog Preview](./src/assets/preview.png)

👉 **[View Live Demo →](https://mare-blog.pages.dev)**

## ✨ Key Features

- **⚡ Lightning Fast**: Built on Astro for optimized static site generation and zero JS by default.
- **🔍 Pagefind Search**: Instant, zero-config full-text search powered by Pagefind with zero server runtime.
- **🎨 Minimal & Responsive**: Clean design powered by Tailwind CSS, with seamlessly integrated **Light & Dark theme toggle**.
- **💬 Giscus Comments**: Powered by GitHub Discussions—lightweight, secure, and privacy-friendly.
- **📡 RSS Feed Support**: Built-in RSS feed generation out of the box (`/rss.xml`).
- **✍️ Headless Git-CMS**: Pre-configured with **Pages CMS** for visual Markdown/MDX editing without local code setups.
- **📂 Multi-Collection**: Built-in support for Blog articles, Journal entries (timeline notes), and standalone Pages.

## 🛜 Tech Stack

- **Framework**: [Astro](https://astro.build)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Search**: [Pagefind](https://pagefind.app)
- **CMS**: [Pages CMS](https://pagescms.org)
- **Comments**: [Giscus](https://giscus.app)

## 🚀 Getting Started

```bash
pnpm install  # Install dependencies
pnpm dev      # Start local dev server at localhost:4321
```

## 📖 Documentation & Usage

For detailed guides on site configuration, writing posts, managing pages, and setting up Giscus comments, refer to the documentation post:

👉 [Read the Getting Started & Configuration Guide →](https://mare-blog.pages.dev/blog/guide/)

## 🧞 Commands

| Command                | Action                                         |
| :--------------------- | :--------------------------------------------- |
| `pnpm install`         | Installs dependencies                          |
| `pnpm dev`             | Starts local dev server at `localhost:4321`    |
| `pnpm build`           | Builds your production site to `./dist/`       |
| `pnpm preview`         | Previews your build locally, before deploying  |
| `pnpm format`          | Formats code across the project using Prettier |
| `pnpm astro ...`       | Runs Astro CLI commands                        |
| `pnpm astro -- --help` | Gets help using the Astro CLI                  |
