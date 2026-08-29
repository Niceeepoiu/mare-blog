export interface SiteConfig {
  siteTitle: string;
  author: string;
  authorUrl: string;
}

export function defineConfig(config: SiteConfig): SiteConfig {
  return config;
}

export default defineConfig({
  siteTitle: "Mare Blog",
  author: "Niceeepoiu",
  authorUrl: "https://github.com/Niceeepoiu",
});
