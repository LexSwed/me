import { cloneElement, type ComponentProps, type JSX } from "preact";
import Image from "./Image.astro";

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
    level < 3 ? (
      <a
        href={`#${id}`}
        class="scroll-mt-[100px] align-text-top text-[0.6em] opacity-0 transition-opacity duration-200 focus:opacity-100 group-hover/heading:opacity-100"
        aria-label="section link"
        title="Section link"
      >
        #
      </a>
    ) : null;
  return (
    <Tag class={`mb-4 mt-6 ${headingLevelStyle[level]} group/heading`} id={id}>
      <h2></h2>
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
      class="text-primary outline-primary decoration-2 outline-offset-4 transition-all duration-200 hover:underline focus:outline-2"
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
      class="border-l-on-background/70 text-on-background/70 mb-4 mt-2 border-l-4 border-solid pl-4"
    >
      <slot />
    </blockquote>
  ),
  code: (props) => (
    <code
      {...props}
      class={[
        props.class,
        "bg-on-background/10 rounded-md px-[0.2em] py-[0.1em] font-mono text-[0.8em]",
      ].join(" ")}
    />
  ),
  pre: (props) => (
    <pre
      {...props}
      class={["p-4 mb-4 text-sm rounded-lg", props.class].join(" ")}
    />
  ),
  h1: (props) => <Heading level={1} {...props} />,
  h2: (props) => <Heading level={2} {...props} />,
  h3: (props) => <Heading level={3} {...props} />,
  h4: (props) => <Heading level={4} {...props} />,
  h5: (props) => <Heading level={5} {...props} />,
  h6: (props) => <Heading level={6} {...props} />,
  img: Image,
  a: Link,
  ul: (props) => <ul {...props} class="mb-4 list-disc pl-6" />,
  ol: (props) => <ul {...props} class="mb-4 list-decimal pl-6" />,
  li: (props) => <li {...props} class="list-item" />,
  p: (props) => <p {...props} class="mb-4" />,
  kbd: (props) => (
    <kbd
      {...props}
      class="inline-block rounded-md border-[1px] border-slate-500 bg-slate-800 px-1 py-0.5 align-middle font-mono text-[0.7rem] leading-none text-slate-300 shadow-[inset_0_-1px_0_theme(colors.slate.500)]"
    />
  ),
};
