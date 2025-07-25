import rss from "@astrojs/rss";
import { config } from "@/config";

export async function GET() {
  return rss({
    title: `${config.personal.name} - RSS Feed Index`,
    description: `${config.personal.description.intro} - Available in multiple languages`,
    site: config.website,
    items: [
      {
        title: "English RSS Feed",
        link: `${config.website}/rss-en.xml`,
        description: "RSS feed for English blog posts",
        pubDate: new Date(),
      },
      {
        title: "繁體中文 RSS Feed",
        link: `${config.website}/rss-zh-tw.xml`,
        description: "RSS feed for Traditional Chinese blog posts",
        pubDate: new Date(),
      },
    ],
    customData: `
      <language>en-us</language>
      <atom:link href="${config.website}/rss-en.xml" rel="alternate" type="application/rss+xml" title="English RSS Feed" />
      <atom:link href="${config.website}/rss-zh-tw.xml" rel="alternate" type="application/rss+xml" title="繁體中文 RSS Feed" />
    `,
  });
}
