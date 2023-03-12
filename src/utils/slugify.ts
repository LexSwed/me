import createSlug from "slugify";

export function slugify(string: string, id: string) {
  return createSlug(`${string}-${id.replaceAll("-", "")}`, {
    lower: true,
  });
}
