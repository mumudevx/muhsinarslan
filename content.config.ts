import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    works: defineCollection({
      type: "page",
      source: "works/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        coverImage: z.string(),
        slug: z.string(),
      }),
    }),
    blog: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        title: z.string(),
        coverImage: z.string(),
        publishDate: z.string(),
        slug: z.string(),
      }),
    }),
  },
});
