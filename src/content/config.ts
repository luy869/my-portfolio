import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        order: z.number().default(0),
        url: z.string().url().optional(),
        github: z.string().url().optional(),
        image: z.string().optional(),
        featured: z.boolean().default(false),
    }),
});

export const collections = { projects };
