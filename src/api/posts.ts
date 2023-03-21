import { PARAMS, request } from "./github";
import type {
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
      shortsCollectionId: PARAMS.shortsCollectionId,
    }
  );
  const pinnedPost =
    response.repository.pinnedDiscussions.nodes?.[0]?.discussion || null;
  const internalLabels = new Set(["_published"]);

  // Narrow down the type to Discussions only
  const posts = response.search.edges?.map((edge) => {
    if (edge.node.__typename === "Discussion") {
      const { title, labels, number, body, createdAt } = edge.node;
      const data = frontmatter({ body });
      return {
        title,
        createdAt,
        summary: data.description,
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
    return null;
  });
  // const shorts = response.repository.discussion.comments.nodes;

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
    $shortsCollectionId: Int!
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
      discussion(number: $shortsCollectionId) {
        comments(first: 100) {
          nodes {
            createdAt
            body
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
