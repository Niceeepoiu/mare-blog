export interface SiteConfig {
  /** The title of your blog displayed in the header and metadata */
  siteTitle: string;
  /** The name of the blog owner or author */
  author: string;
  /** Link to the author's personal website or GitHub profile */
  authorUrl: string;
  /** Giscus comments system configuration */
  giscus: {
    /** Enable or disable the Giscus comment system globally */
    enable: boolean;
    /** Your GitHub repository for comments (e.g., 'username/repo-name') */
    repo: string;
    /** Your GitHub repository GraphQL Node ID */
    repoId: string;
    /** The Discussion category name (e.g., 'Announcements') */
    category: string;
    /** The Discussion category GraphQL Node ID */
    categoryId: string;
    /** Theme for Giscus iframe (e.g., 'light', 'dark', 'preferred_color_scheme') */
    theme: string;
    /** Language for the Giscus widget UI (e.g., 'en', 'zh-CN') */
    lang: string;
  };
}

export function defineConfig(config: SiteConfig): SiteConfig {
  return config;
}

export default defineConfig({
  // Main Site Metadata
  siteTitle: "Mare Blog",
  author: "Niceeepoiu",
  authorUrl: "https://github.com/Niceeepoiu",

  // Giscus Comment System Settings
  // Visit https://giscus.app to generate your repository & category details.
  giscus: {
    enable: false, // Set to true to display comments on your blog posts
    repo: "Niceeepoiu/mare-blog",
    repoId: "R_kgDOUH3Ucg",
    category: "Announcements",
    categoryId: "DIC_kwDOUH3Ucs4DEfws",
    theme: "light",
    lang: "en",
  },
});
