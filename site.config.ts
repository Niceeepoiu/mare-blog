export interface SiteConfig {
  siteTitle: string;
  Author: string;
  AuthorUrl: string;
}

export function defineConfig(config: SiteConfig): SiteConfig {
  return config;
}

export default defineConfig({
  siteTitle: "Mare Blog",
  Author: "Niceeepoiu",
  AuthorUrl: "https://github.com/Niceeepoiu",
});
