// source.config.ts
import { defineConfig, defineCollections } from "fumadocs-mdx/config";
import { z } from "zod";
var author = defineCollections({
  type: "doc",
  dir: "content/author",
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    avatar: z.string()
  })
});
var category = defineCollections({
  type: "doc",
  dir: "content/category",
  schema: z.object({
    name: z.string(),
    description: z.string()
  })
});
var blog = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: z.object({
    title: z.string(),
    author: z.string()
  })
});
var source_config_default = defineConfig();
export {
  author,
  blog,
  category,
  source_config_default as default
};
