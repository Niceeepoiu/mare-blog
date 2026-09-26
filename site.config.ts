export interface NavItem {
  /** Navigation item display label */
  name: string;
  /** Navigation target path or URL */
  href: string;
  /** Icon identifier (e.g., 'lucide:home') */
  icon?: string;
}
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
  /** Number of posts to show on each blog archive page */
  postsPerPage: number;
  /** Header navigation items */
  nav: NavItem[];
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
  authorUrl: "https://www.github.com/Niceeepoiu",
  authorBio: "A passionate developer.",
  url: "https://mare-blog.pages.dev",
  postsPerPage: 6,
  nav: [
    { name: "Home", href: "/", icon: "lucide:home" },
    { name: "Blog", href: "/blog", icon: "lucide:book-open" },
    { name: "Tags", href: "/blog/tags", icon: "lucide:tags" },
    { name: "About", href: "/about", icon: "lucide:user" },
  ],
  giscus: {
    enabled: true,
    repo: "Niceeepoiu/mare-blog",
    repoId: "R_kgDOUH3Ucg",
    category: "Announcements",
    categoryId: "DIC_kwDOUH3Ucs4DEfws",
    theme: "light",
    darkTheme: "dark",
    lang: "en",
  },
});
