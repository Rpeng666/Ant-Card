import { defineDocs, defineConfig, defineCollections } from 'fumadocs-mdx/config';
import { z } from 'zod';


export const author = defineCollections({
    type: 'doc',
    dir: 'content/author',
    schema: z.object({
        name: z.string(),
        bio: z.string(),
        avatar: z.string(),
    })
});


export const category = defineCollections({
    type: 'doc',
    dir: 'content/category',
    schema: z.object({
        name: z.string(),
        description: z.string(),
    })
});


export const blog = defineCollections({
    type: 'doc',
    dir: 'content/blog',
    schema: z.object({
        title: z.string(),
        author: z.string(),
    })
});

export default defineConfig()