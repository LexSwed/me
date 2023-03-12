import { Client, isFullBlock, isFullPage } from "@notionhq/client";
import {
  BlockObjectResponse,
  ListBlockChildrenResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { slugify } from "../utils/slugify";

// Initializing a client
const notion = new Client({
  auth: import.meta.env.NOTION_TOKEN,
});

const DATABASE_ID = "955ba45cd025434bb7edbd3fe5c07e12";

export async function getPages(
  count = 10,
  { topic, fetchContent }: { topic?: string; fetchContent?: boolean } = {}
): Promise<NotionPage[]> {
  try {
    const data = await notion.databases.query({
      database_id: DATABASE_ID,
      page_size: count,
      filter: {
        and: [
          {
            property: "Status",
            select: {
              equals: "Published",
            },
          },
          {
            property: "Tags",
            multi_select: {
              contains: topic || "",
            },
          },
        ],
      },
      sorts: [
        {
          timestamp: "created_time",
          direction: "descending",
        },
      ],
    });
    const results: NotionPage[] = [];

    for (const page of data.results) {
      if (!isFullPage(page)) return;
      const title =
        page.properties["Title"].type === "title"
          ? page.properties["Title"].title[0].plain_text
          : "";
      const pageTopic = page.properties["Topic"];
      const topic =
        pageTopic?.type === "select"
          ? {
              name: pageTopic.select.name,
              color: pageTopic.select.color,
            }
          : {
              name: "Post",
              color: "yellow",
            };
      const pageTags =
        page.properties["Tags"]?.type === "multi_select"
          ? page.properties["Tags"]
          : null;
      const tags = pageTags?.multi_select.map((tag) => tag.name) || [];
      const pageSummary =
        page.properties["Summary"]?.type === "rich_text"
          ? page.properties["Summary"].rich_text
          : [];
      const pageCover = page.cover?.type === "file" ? page.cover.file.url : "";
      const pageCoverAlt =
        page.properties["Cover alt"]?.type === "rich_text"
          ? page.properties["Cover alt"].rich_text.reduce((res, block) => {
              res += block.plain_text;
              return res;
            }, "")
          : null;

      let content: NotionPage["content"] = null;
      if (fetchContent) {
        content = await getPage(page.id);
      }

      results.push({
        id: page.id,
        title,
        slug: slugify(title, page.id),
        topic,
        createdAt: page.created_time,
        summary: pageSummary,
        cover: pageCover
          ? {
              image: pageCover,
              alt: pageCoverAlt,
            }
          : null,
        pinned:
          page.properties["Pinned"]?.type === "checkbox" &&
          page.properties["Pinned"].checkbox,
        tags,
        content,
      });
    }
    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export type NotionPage = {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  pinned?: boolean;
  summary: Array<RichTextItemResponse>;
  cover: {
    image: string;
    alt: string;
  } | null;
  topic: {
    name: string;
    color: string;
  };
  tags: string[];
  content: Array<BlockObjectResponse> | null;
};

export async function getTopics() {
  const data = await notion.databases.retrieve({
    database_id: DATABASE_ID,
  });
  const tags =
    data.properties["Tags"].type === "multi_select"
      ? data.properties["Tags"]
      : null;
  const pageTopics =
    data.properties["Topic"].type === "select"
      ? data.properties["Topic"]
      : null;

  const topics = tags.multi_select.options
    .map((tag) => tag.name)
    .concat(pageTopics.select.options.map((tag) => tag.name));

  return topics;
}

async function getBlock(blockId: string, cursor?: string) {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
    start_cursor: cursor,
  });
  if (response.has_more) {
    const more = await getBlock(blockId, response.next_cursor);
    response.results.concat(more.results);
  }
  return response;
}

export async function getPage(id: string) {
  const response = await getBlock(id);
  console.log(JSON.stringify(response, null, 2));
  return response.results.filter((block): block is BlockObjectResponse =>
    isFullBlock(block)
  );
}
