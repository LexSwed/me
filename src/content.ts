import { getCollection } from "astro:content";

export async function getFeed() {
  const feed = await getCollection(
    "feed",
    import.meta.env.DEV ? undefined : (post) => !post.data.draft
  );
  return feed;
}
