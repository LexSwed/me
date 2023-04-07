import { PARAMS, request } from "./github";
import type {
  FragmentPostsPostFragment,
  GetPostsDataQuery,
  GetPostsDataQueryVariables,
} from "./generated/graphql";
import { frontmatter } from "../utils/markdown";

export async function getFeed(
  count: number,
  { topic }: { topic?: string | null } = {}
) {
  let searchQuery = PARAMS.query;
  if (topic) {
    searchQuery += ` label:"${topic}"`;
  }

  const response = await request<GetPostsDataQuery, GetPostsDataQueryVariables>(
    query,
    {
      count,
      searchQuery,
      repo: PARAMS.repo,
      owner: PARAMS.owner,
    }
  );
  const pinned =
    response.repository.pinnedDiscussions.nodes?.[0]?.discussion || null;
  const pinnedPost = pinned ? parsePost(pinned) : null;

  // Narrow down the type to Discussions only
  const posts = response.search.edges?.map((edge) => {
    if (edge.node.__typename === "Discussion") {
      return parsePost(edge.node);
    }
    return null;
  });

  const feed = posts.sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );

  const topics = response.repository.labels.nodes.filter(
    (topic) => !internalLabels.has(topic.name)
  );

  return {
    pinnedPost,
    feed,
    topics,
  } as const;
}

const query = /* GraphQL */ `
  #graphql
  query GetPostsData(
    $count: Int!
    $searchQuery: String!
    $repo: String!
    $owner: String!
  ) {
    repository(name: $repo, owner: $owner) {
      labels(first: 100) {
        nodes {
          id
          color
          name
          description
        }
      }
      pinnedDiscussions(last: 1) {
        nodes {
          discussion {
            ...FragmentPostsPost
          }
        }
      }
    }
    search(last: $count, type: DISCUSSION, query: $searchQuery) {
      edges {
        node {
          __typename
          ...FragmentPostsPost
        }
      }
    }
  }
  fragment FragmentPostsPost on Discussion {
    id
    title
    createdAt
    url
    number
    body
    labels(first: 20) {
      nodes {
        id
        name
        color
      }
    }
  }
`;

const internalLabels = new Set(["_published"]);
function parsePost(post: FragmentPostsPostFragment) {
  const { title, labels, number, body, createdAt } = post;
  const data = body ? frontmatter(post) : {};
  return {
    title,
    createdAt,
    summary: data.summary,
    slug: number,
    poster: data.poster
      ? {
          img: data.poster,
          alt: data.posterAlt,
        }
      : null,
    tags: labels.nodes.filter((label) => !internalLabels.has(label.name)),
  };
}

export type FeedItem = ReturnType<typeof parsePost>;
