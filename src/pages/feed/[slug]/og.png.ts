import { ImageResponse } from "@vercel/og";
import path from "node:path";
import fs from "node:fs";
import sharp from "sharp";
import { html } from "satori-html";
import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getFeed } from "../../../content";
import tailwindConfig from "../../../../tailwind.config";

const Inter = fs.readFileSync(path.resolve("public/og/Inter-Medium.ttf"));
const InterBold = fs.readFileSync(path.resolve("public/og/Inter-SemiBold.ttf"));
const icon = fs.readFileSync(path.resolve("public/logo-inner.svg"));

// 1. get image, transform to png, get as a buffer
// 2. insert as `data:

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
          ? path.resolve(
              post.data.poster.src.replace("/", "dist/$server_build/"),
            )
          : path.resolve(
              post.data.poster.src.split("?")[0].replace("/@fs", ""),
            ),
      );

      const image = await sharp(postCover)
        .resize({ width: 400, height: 400 })
        .png()
        .toBuffer();
      return {
        params: { slug: post.slug },
        props: {
          post: {
            title: post.data.title,
            summary: post.data.summary,
            image,
          },
        },
      };
    }),
  );
  return posts;
}

export type Props = InferGetStaticPropsType<typeof getStaticPaths>;

const { colors } = tailwindConfig.theme.extend;

export const GET: APIRoute<Props> = async ({ props }) => {
  const { post } = props;
  const { title, summary, image } = post;

  const markup = html`
    <div
      style="font-family: 'Inter'"
      tw="relative bg-[${colors.primary}] p-12 w-full h-full flex rounded-3xl flex-col text-[${colors[
        "on-primary"
      ]}]"
    >
      <div tw="flex items-center absolute right-8 top-8 text-xl">
        <div tw="flex items-end mr-4">alvechy.dev</div>
        <div
          class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[${colors[
            "on-primary"
          ]}] p-2"
        >
          <img
            src="${`data:image/svg+xml;base64,${icon.toString("base64")}`}"
            tw="max-h-full"
          />
        </div>
      </div>
      <div tw="relative flex h-full flex-row items-center">
        <img
          src="${`data:image/png;base64,${image.toString("base64")}`}"
          width="400"
          height="400"
          tw="shadow-xl rounded-2xl"
        />
        <div tw="flex flex-col gap-2 ml-12 w-[600px]">
          <h1 tw="text-6xl">${title}</h1>
          <p tw="text-xl">${summary}</p>
        </div>
      </div>
    </div>
  `;

  return new ImageResponse(markup, {
    width: 1200,
    height: 630,

    fonts: [
      {
        name: "Inter",
        data: Inter.buffer,
        weight: 400,
        style: "normal",
      },
      {
        name: "Inter",
        data: InterBold.buffer,
        weight: 600,
        style: "normal",
      },
    ],
  });
};
