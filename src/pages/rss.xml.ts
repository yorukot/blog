import rss from "@astrojs/rss";
import { getCollection, type CollectionEntry } from "astro:content";
import { config } from "@/config";

export async function GET() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  // Sort posts by publication date (newest first)
  const sortedPosts = posts.sort((a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) =>
    new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );

  return rss({
    title: config.personal.name,
    description: config.personal.description.intro,
    site: config.website,
    items: sortedPosts.map((post: CollectionEntry<'blog'>) => {
      // Extract the actual slug without the language prefix
      const actualSlug = post.slug.split('/').slice(1).join('/');

      return {
        link: `${config.website}/${post.data.lang}/blog/${actualSlug}`,
        title: post.data.title,
        description: post.data.description,
        pubDate: new Date(post.data.updatedDate ?? post.data.pubDate),
      };
    }),
  });
}
