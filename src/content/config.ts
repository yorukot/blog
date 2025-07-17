import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    lang: z.enum(['en', 'zh-tw']),
    draft: z.boolean().default(false),
    featured: z.boolean().optional(),
    postSlug: z.string().optional(),
    image: z
      .object({
        url: z.string().optional(),
        alt: z.string(),
        filename: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = {
  blog,
};
