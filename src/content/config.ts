import { z, defineCollection } from "astro:content";

const feed = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.discriminatedUnion("draft", [
      z.object({
        title: z.string(),
        summary: z.string(),
        tags: z.array(z.string()),
        publishDate: z.date(),
        pinned: z.string().optional(),
        devTo: z.string().optional(),
        draft: z.literal(false),
        poster: image(),
        posterAlt: z.string(),
      }),
      z.object({
        draft: z.literal(true),
        poster: image().optional(),
        posterAlt: z.string().optional(),
        title: z.string(),
        summary: z.string(),
        tags: z.array(z.string()),
        publishDate: z.date(),
        pinned: z.string().optional(),
        devTo: z.string().optional(),
      }),
    ]),
});

export const collections = {
  feed,
};

export const topic = z.enum(["web", "fxtrot"]);

export type Topic = z.infer<typeof topic>;

export const topicColor = new Map<Topic, `#${string}`>([
  ["fxtrot", "#1e3a8a"],
  ["web", "#155e75"],
]);
