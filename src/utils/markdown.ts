import matter from "gray-matter";
import { marked } from "marked";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import shiki from "shiki";

type Frontmatter = {
  poster?: string;
  posterAlt?: string;
};

export function frontmatter<T = Frontmatter>(post: { body: string }): T {
  const { data } = matter(post.body, { delimiters: ["<!--", "-->"] });
  return data as T;
}

const highlighter = await shiki.getHighlighter({
  theme: "material-palenight",
});

const renderer = {
  heading(text, level) {
    return /*html*/ `
            <h${level} class="text-xl">
              ${text}
            </h${level}>`;
  },
} satisfies marked.RendererObject;

marked.use({ renderer });

const options = {
  highlight: (code, lang) => {
    return highlighter.codeToHtml(code, { lang });
  },
} satisfies marked.MarkedOptions;

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export function parse(source: string) {
  const unsanitizedContent = marked.parse(source, options);
  const content = DOMPurify.sanitize(unsanitizedContent);

  return content;
}
