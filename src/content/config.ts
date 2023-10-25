import { z, defineCollection } from "astro:content";

const feed = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      draft: z.boolean(),
      title: z.string(),
      summary: z.string(),
      /** first tag is treated as topic */
      tags: z.array(z.string()),
      poster: image(),
      posterAlt: z.string(),
      publishDate: z.date(),
      pinned: z.string().optional(),
      devTo: z.string().optional(),
    }),
});

export const collections = {
  feed,
};

const topic = z.enum(["web", "fxtrot"]);

export type Topic = z.infer<typeof topic>;

export const topicColor = new Map<Topic, `#${string}`>([
  ["fxtrot", "#1e3a8a"],
  ["web", "#155e75"],
]);
