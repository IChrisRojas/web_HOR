import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/services" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(), // Using string for now (e.g. icon name), or could be image
    type: z.enum(['corporate', 'event']),
    coverImage: image().optional(),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/portfolio" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    client: z.string(),
    gallery: z.array(image()),
    type: z.enum(['corporate', 'event']),
    description: z.string(),
  }),
});

export const collections = {
  services,
  portfolio,
};
