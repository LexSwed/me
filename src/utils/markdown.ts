import matter from "gray-matter";
import { marked } from "marked";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import shiki from "shiki";
import { gfmHeadingId } from "marked-gfm-heading-id";

type Frontmatter = {
  poster?: string;
  posterAlt?: string;
  summary?: string;
};

export function frontmatter<T = Frontmatter>(post: { body: string }): T {
  const { data } = matter(post.body, {
    delimiters: ["<!--", "-->"],
  });
  return data as T;
}

const highlighter = await shiki.getHighlighter({
  theme: "material-palenight",
});

const headingLevelStyle = {
  1: "text-4xl font-medium",
  2: "text-3xl font-medium",
  3: "text-xl font-semibold",
  4: "text-lg font-semibold",
  5: "text-md font-bold",
  6: "text-md font-bold",
} satisfies Record<1 | 2 | 3 | 4 | 5 | 6, string>;

const renderer = {
  heading(text, level, raw, slugger) {
    const id = slugger.slug(raw);
    const link =
      level < 3
        ? `<a href="#${id}" class="scroll-mt-[100px] opacity-0 group-hover/heading:opacity-100 align-text-top transition-opacity duration-200 focus:opacity-100 text-[0.6em]" aria-label="section link" title="Section link">#</a>`
        : "";
    return /*html*/ `
  <h${level} class="mt-6 mb-4 ${headingLevelStyle[level]} group/heading" id="${id}">
    ${text}
    ${link}
  </h${level}>`;
  },
  blockquote(quote) {
    return /*html*/ `
    <blockquote class="border-solid mb-4 mt-2 border-l-4 border-l-on-background/70 pl-4 text-on-background/70">
      ${quote}
    </blockquote>`;
  },
  paragraph(text) {
    return /*html*/ `
    <p class="mb-4">
      ${text}
    </p>`;
  },
  link(href, title, text) {
    let external = false;
    try {
      if (href) {
        // absolute URL - external
        new URL(href);
        external = true;
      }
    } catch {
      external = false;
    }
    return /*html*/ `
    <a href="${href}" class="hover:underline decoration-2 transition-all text-primary duration-200 focus:outline-2 outline-offset-4 outline-primary"  ref="${
      external ? "noopener noreferrer" : "prefetch"
    }">
      ${text}
    </a>`;
  },
  list(body, ordered) {
    const tag = ordered ? "ol" : "ul";
    return /*html*/ `
    <${tag} class="mb-4 pl-6 ${ordered ? "list-decimal" : "list-disc"}">
      ${body}
    </${tag}>`;
  },
  listitem(text) {
    return /*html*/ `<li class="list-item">${text}</li>`;
  },
  codespan(code) {
    return /*html*/ `<code class="text-[0.8em] font-mono rounded-md bg-on-background/10 py-[0.1em] px-[0.2em]">${code}</code>`;
  },
  image(href, title, text) {
    return /*html*/ `<img src="${href}"${title ? `title="${title}"` : ""}${
      text ? `alt="${text}"` : ""
    } class="rounded-lg max-w-full shadow-md" />`;
  },
} satisfies marked.RendererObject;

marked.use(gfmHeadingId());
marked.use({
  renderer,
  highlight: (code, lang) => {
    const tokens = highlighter.codeToThemedTokens(
      code,
      lang,
      "material-palenight"
    );
    return shiki.renderToHtml(tokens, {
      bg: highlighter.getBackgroundColor(),
      fg: highlighter.getForegroundColor(),
      elements: {
        pre({ className, style, children }) {
          return `<pre class="p-4 text-sm rounded-lg ${className}"${
            style ? `style="${style}"` : ""
          }">${children}</pre>`;
        },
      },
    });
  },
});

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export function parse(source: string) {
  const unsanitizedContent = marked.parse(source);
  const content = DOMPurify.sanitize(unsanitizedContent);
  const toc = marked
    .lexer(source)
    .filter((item) => item.type === "heading" && item.depth < 3);

  return { content, toc };
}

export function parseInline(source: string) {
  const unsanitizedContent = marked.parseInline(source);
  const content = DOMPurify.sanitize(unsanitizedContent);
  return content;
}
