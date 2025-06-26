import rss from '@astrojs/rss';

export function GET(context) {
  return rss({
    title: 'Yorukot’s Blog',
    description: '17-year-old full-stack developer with 6 years of experience, creating CLI/TUI tools and web apps. Passionate about open-source, anime, and sharing knowledge.',
    site: context.site,
    items: [],
  });
}