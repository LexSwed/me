import type { HTMLTag, Polymorphic } from "astro/types";

export type ButtonWithLabelProps<Tag extends HTMLTag> = Polymorphic<{
  /** @default 'button' */
  as: Tag;
  label: string;
}>;
