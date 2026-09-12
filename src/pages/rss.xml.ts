import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import siteConfig from "@config";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");

  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  );

  return rss({
    title: siteConfig.title,
    description: siteConfig.description || "Mare's Personal Blog",
    site: context.site!,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en</language>`,
  });
}
