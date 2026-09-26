import { defineCollection, z } from 'astro:content';

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    summary: z.string(),
    date: z.string(),
    updated: z.string().optional(),
    category: z.enum(['basics', 'privacy', 'security', 'technical', 'buying']),
    readTime: z.number(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.string(),
  }),
});

export const collections = { guides, pages };
