import { type ComponentProps, type JSX } from "preact";
import { Code } from "./Code";
import MultilineCode from "./MultilineCode.astro";
import ParagraphWithMaybeImage from "./ParagraphWithMaybeImage.astro";

const headingLevelStyle = {
  1: "text-4xl font-medium",
  2: "text-3xl font-medium",
  3: "text-xl font-semibold",
  4: "text-lg font-semibold",
  5: "text-md font-bold",
  6: "text-md font-bold",
} satisfies Record<1 | 2 | 3 | 4 | 5 | 6, string>;

const Heading = ({
  level = 1,
  id,
  children,
}: ComponentProps<"h1"> & { level?: keyof typeof headingLevelStyle }) => {
  const Tag = `h${level}` as JSX.ElementType<ComponentProps<"h1">>;

  const link =
    level < 4 ? (
      <a
        href={`#${id}`}
        class="-ms-2 inline-block scroll-mt-[100px] px-2 text-[0.8em] opacity-0 transition-all duration-200 focus:translate-x-2 focus:opacity-100 group-hover/heading:translate-x-2 group-hover/heading:opacity-100"
        aria-label="section link"
        title="Section link"
      >
        #
      </a>
    ) : null;

  return (
    <Tag class={`mb-4 mt-6 ${headingLevelStyle[level]} group/heading`} id={id}>
      {children}
      {link}
    </Tag>
  );
};

const Link = ({ href, children }: ComponentProps<"a">) => {
  let external = false;
  try {
    if (href) {
      // absolute URL - external
      new URL(`${href}`);
      external = true;
    }
  } catch {
    external = false;
  }
  return (
    <a
      href={href}
      class="text-primary decoration-2 outline-offset-4 outline-primary transition-all duration-200 hover:underline focus:outline-2"
      rel={external ? "noopener noreferrer" : "prefetch"}
    >
      {children}
    </a>
  );
};

export const components = {
  blockquote: (props) => (
    <blockquote
      {...props}
      class="mb-4 mt-2 border-l-4 border-solid border-l-on-background/70 pl-4 text-on-background/70"
    >
      <slot />
    </blockquote>
  ),
  code: Code,
  pre: MultilineCode,
  h1: (props) => <Heading level={1} {...props} />,
  h2: (props) => <Heading level={2} {...props} />,
  h3: (props) => <Heading level={3} {...props} />,
  h4: (props) => <Heading level={4} {...props} />,
  h5: (props) => <Heading level={5} {...props} />,
  h6: (props) => <Heading level={6} {...props} />,
  a: Link,
  ul: (props) => <ul {...props} class="mb-4 list-disc pl-6" />,
  ol: (props) => <ul {...props} class="mb-4 list-decimal pl-6" />,
  li: (props) => <li {...props} class="list-item" />,
  p: ParagraphWithMaybeImage,
  kbd: (props) => (
    <kbd
      {...props}
      class="inline-block rounded-md border-[1px] border-slate-500 bg-slate-800 px-1 py-0.5 align-middle font-mono text-[0.7rem] leading-none text-slate-300 shadow-[inset_0_-1px_0_theme(colors.slate.500)]"
    />
  ),
};
