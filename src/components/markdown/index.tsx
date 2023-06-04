import { Code } from "./Code";
import MultilineCode from "./MultilineCode.astro";
import ParagraphWithMaybeImage from "./ParagraphWithMaybeImage.astro";
import Quote from "./Quote.astro";
import Link from "./Link.astro";
import { Heading } from "./Heading";

export const components = {
  blockquote: Quote,
  code: Code,
  pre: MultilineCode,
  h1: (props) => <Heading level={1} {...props} />,
  h2: (props) => <Heading level={2} {...props} />,
  h3: (props) => <Heading level={3} {...props} />,
  h4: (props) => <Heading level={4} {...props} />,
  h5: (props) => <Heading level={5} {...props} />,
  h6: (props) => <Heading level={6} {...props} />,
  a: Link,
  ul: (props) => <ul {...props} class="mb-8 list-disc pl-6" />,
  ol: (props) => <ul {...props} class="mb-8 list-decimal pl-6" />,
  li: (props) => <li {...props} class="list-item" />,
  p: ParagraphWithMaybeImage,
  kbd: (props) => (
    <kbd
      {...props}
      class="inline-block rounded-md border-[1px] border-slate-500 bg-slate-800 px-1 py-0.5 align-middle font-mono text-[0.7rem] leading-none text-slate-300 shadow-[inset_0_-1px_0_theme(colors.slate.500)]"
    />
  ),
};
