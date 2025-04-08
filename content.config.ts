import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    works: defineCollection({
      type: "page",
      source: "works/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
      }),
    }),
  },
});
