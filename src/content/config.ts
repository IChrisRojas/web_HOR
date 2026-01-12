import { defineCollection, z } from 'astro:content';

const portfolio = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),
        client: z.string(),
        type: z.enum(['corporate', 'event']),
        description: z.string(),
        coverImage: z.string().optional(),
        gallery: z.array(z.string()).optional(),
    }),
});

const services = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        type: z.enum(['corporate', 'social', 'concert', 'other']),
        coverImage: z.string().optional(),
    }),
});

export const collections = {
    portfolio,
    services,
};
