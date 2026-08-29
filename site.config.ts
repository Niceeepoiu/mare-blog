export interface SiteConfig {
  siteTitle: string;
}

export function defineConfig(config: SiteConfig): SiteConfig {
  return config;
}

export default defineConfig({
  siteTitle: "Mare Blog",
});
