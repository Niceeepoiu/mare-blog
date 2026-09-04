import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);

  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${sitemapURL.href}\n`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
};
