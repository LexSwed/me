import shiki from "shiki";

import { visit } from "unist-util-visit";
import {
  getHighlighter,
  type Highlighter,
  type HighlighterOptions,
} from "shiki";
import { type RemarkPlugin } from "@astrojs/markdown-remark";

const highlighters = new Map<"default", Promise<Highlighter>>();

/** provides source code to the components */
export const remarkShiki: RemarkPlugin<HighlighterOptions[]> = (options) => {
  // plugin cannot be async
  highlighters.set("default", getHighlighter(options));

  const transformer: ReturnType<RemarkPlugin<HighlighterOptions[]>> = async (
    markdownAST,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const highlighter = await highlighters.get("default")!;
    const loadedLanguages = highlighter.getLoadedLanguages();
    const loadedTheme = highlighter.getTheme();

    visit(markdownAST, "code", (node) => {
      const lang = !loadedLanguages.includes(node.lang as shiki.Lang)
        ? null
        : node.lang;
      const source = node.value;
      const tokens = highlighter.codeToThemedTokens(
        node.value,
        lang as shiki.Lang,
      );

      (node as { type: string }).type = "html";
      node.value = shiki.renderToHtml(tokens, {
        themeName: loadedTheme.name,
        fg: loadedTheme.fg,
        bg: loadedTheme.bg,
        elements: {
          pre({ children, className, style }) {
            return `<pre ${parseMeta(
              node.meta,
            )} lang="${lang}" source="${escapeHtml(
              source,
            )}" class="${className}" style="${style}">${children}</pre>`;
          },
          code({ children }) {
            return `<code shiki="true">${children}</code>`;
          },
        },
      });
    });
  };

  return transformer;
};

function parseMeta(str: string | null | undefined) {
  if (!str || str.length === 0) return "";
  try {
    const kvs = str.split(" ");
    return kvs
      .map((pair) => {
        const [key, value] = pair.split("=");
        if (!value) return `${key}="true"`;
        return pair;
      })
      .join(" ");
  } catch {
    return "";
  }
}

const htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
function escapeHtml(html: string) {
  return html.replace(
    /[&<>"']/g,
    (chr) => htmlEscapes[chr as keyof typeof htmlEscapes],
  );
}
