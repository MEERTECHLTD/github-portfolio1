import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
const writing = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/writing" }),
  schema: z.object({ title: z.string(), description: z.string().min(60).max(170), date: z.coerce.date(), category: z.string(), systems: z.array(z.string()).default([]) }),
});
export const collections = { writing };
