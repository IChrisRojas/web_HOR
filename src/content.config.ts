import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/services" }),
  schema: () => z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    type: z.enum(['corporate', 'event']),
    coverImage: z.string().optional(),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/portfolio" }),
  schema: () => z.object({
    title: z.string(),
    date: z.coerce.date(),
    client: z.string(),
    gallery: z.array(z.string()).optional(),
    type: z.enum(['corporate', 'event']),
    description: z.string().optional(),
    coverImage: z.string().optional(),
  }),
});

export const collections = {
  services,
  portfolio,
};
