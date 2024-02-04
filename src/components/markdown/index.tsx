import ParagraphWithMaybeImage from "./ParagraphWithMaybeImage.astro";
import Quote from "./Quote.astro";
import Link from "./Link.astro";
import Code from "./Code.astro";
import H1 from "./H1.astro";
import H2 from "./H2.astro";
import H3 from "./H3.astro";
import H4 from "./H4.astro";
import H5 from "./H5.astro";
import H6 from "./H6.astro";
import UL from "./UL.astro";
import OL from "./OL.astro";
import LI from "./LI.astro";
import KBD from "./KBD.astro";

export const components = {
  blockquote: Quote,
  code: Code,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: Link,
  ul: UL,
  ol: OL,
  li: LI,
  p: ParagraphWithMaybeImage,
  kbd: KBD,
};
