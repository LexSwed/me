import path from "node:path";
import fs from "node:fs";
import satori, { type Font } from "satori";
import sharp from "sharp";
import { html } from "satori-html";
import {
  experimental_getFontFileURL,
  fontData,
  type FontData,
} from "astro:assets";
import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getFeed } from "../../../content";
import logo from "../../../../public/logo-inner.svg?raw";

const icon = Buffer.from(logo.replace(`fill="currentColor"`, `fill="#232946"`));
const dimensions = {
  width: 1200,
  height: 630,
} as const;
const posterSize = 320;
const lexend = fontData["--font-lexend"];

const fonts = Promise.all([
  loadFont(lexend, { weight: 400, style: "normal" }),
  loadFont(lexend, { weight: 600, style: "normal" }),
]);

async function loadFont(
  data: FontData[],
  options: Pick<Font, "weight" | "style">,
): Promise<Font> {
  const font = data.find(
    ({ weight, style }) =>
      weight === String(options.weight) && style === options.style,
  );
  const source = font?.src.find(({ format }) => format === "woff");

  if (!source) {
    throw new Error(`Missing Inter ${options.weight} ${options.style} font`);
  }

  return {
    name: "Inter",
    data: await fetch(experimental_getFontFileURL(source.url)).then(
      (response) => response.arrayBuffer(),
    ),
    ...options,
  };
}

function getTitleSize(title: string) {
  if (title.length <= 24) {
    return 96;
  }

  if (title.length <= 34) {
    return 86;
  }

  return 78;
}

export async function getStaticPaths() {
  const feed = await getFeed();
  const posts = await Promise.all(
    feed.map(async (post) => {
      /**
       * We need the actual path to the image file, while Astro always compiles
       * images to the path the images can be resolved by Vite.
       */
      const postCover = fs.readFileSync(
        import.meta.env.PROD
          ? path.resolve(post.data.poster!.src.replace("/", "dist/"))
          : path.resolve(
              post.data.poster!.src.split("?")[0].replace("/@fs", ""),
            ),
      );

      const image = await sharp(postCover)
        .resize({ width: posterSize, height: posterSize })
        .png()
        .toBuffer();
      return {
        params: { slug: post.id },
        props: {
          post: {
            title: post.data.title,
            image,
          },
        },
      };
    }),
  );
  return posts;
}

export type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = async ({ props }) => {
  const { post } = props;
  const { title, image } = post;
  const titleSize = getTitleSize(title);

  /**
   * - [theme colors]({@link "file://./../../../theme.css"})
   */
  const bg = `bg-[#fdba74]`;
  const text = `text-[#232946]`;

  const markup = html`
    <div
      style="font-family: 'Lexend'"
      tw="relative p-12 w-full h-full flex rounded-3xl ${bg} ${text}"
    >
      <div tw="flex items-center absolute right-12 top-12 text-2xl">
        <img
          src="${`data:image/svg+xml;base64,${icon.toString("base64")}`}"
          tw="h-8"
        />
        <div tw="flex font-mono items-end ml-2">alvechy.dev</div>
      </div>
      <div tw="absolute left-14 top-24 w-[760px] h-[440px] flex items-center">
        <h1
          style="font-size: ${titleSize}px; line-height: 0.96; font-weight: 600; letter-spacing: 0;"
        >
          ${title}
        </h1>
      </div>
      <img
        src="${`data:image/png;base64,${image.toString("base64")}`}"
        width="${posterSize}"
        height="${posterSize}"
        tw="absolute right-12 bottom-12 shadow-xl rounded-2xl"
      />
    </div>
  `;

  const svg = await satori(markup, {
    ...dimensions,
    fonts: await fonts,
  });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
