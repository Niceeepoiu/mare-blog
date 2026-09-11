export interface SiteConfig {
  /** Site title */
  title: string;
  /** Site description */
  description: string;
  /** Author name */
  author: string;
  /** Author URL */
  authorUrl: string;
  /** Author biography */
  authorBio: string;
  /** Base URL of the site */
  url: string;
  /** Giscus comment system configuration */
  giscus: {
    /** Enable or disable Giscus comments */
    enabled: boolean;
    /** Target GitHub repository in 'owner/repo' format */
    repo: string;
    /** Repository GraphQL Node ID */
    repoId: string;
    /** Discussion category name */
    category: string;
    /** Discussion category GraphQL Node ID */
    categoryId: string;
    /** Theme for light mode */
    theme: string;
    /** Theme for dark mode */
    darkTheme: string;
    /** UI language */
    lang: string;
  };
}

export function defineConfig(config: SiteConfig): SiteConfig {
  return config;
}

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
