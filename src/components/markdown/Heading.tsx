import type { ComponentProps } from "preact";
import type { JSX } from "preact/jsx-runtime";

const headingLevelStyle = {
  1: "text-5xl font-medium",
  2: "text-4xl font-medium",
  3: "text-2xl font-semibold",
  4: "text-xl font-semibold",
  5: "text-lg font-bold",
  6: "text-lg font-bold",
} satisfies Record<1 | 2 | 3 | 4 | 5 | 6, string>;

export const Heading = ({
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
    <Tag
      class={`mb-[0.8em] mt-[1.4em] [text-wrap:balance] ${headingLevelStyle[level]} group/heading`}
      id={id}
    >
      {children}
      {link}
    </Tag>
  );
};
