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
  ul: (props: object) => <ul {...props} class="mb-8 list-disc pl-6" />,
  ol: (props: object) => <ul {...props} class="mb-8 list-decimal pl-6" />,
  li: (props: object) => <li {...props} class="list-item text-xl" />,
  p: ParagraphWithMaybeImage,
  kbd: (props: object) => (
    <kbd
      {...props}
      class="inline-block rounded-md border-[1px] border-slate-500 bg-slate-800 px-1 py-0.5 align-middle font-mono text-[0.7rem] leading-none text-slate-300 shadow-[inset_0_-1px_0_theme(colors.slate.500)]"
    />
  ),
};
