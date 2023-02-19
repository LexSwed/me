import { PARAMS, request } from "./github";
import type {
  GetPostsDataQuery,
  GetPostsDataQueryVariables,
} from "./generated/graphql";

export async function getPostsData(
  count: number,
  { topic }: { topic?: string | null } = {}
) {
  let searchQuery = PARAMS.query;
  if (topic) {
    searchQuery += ` label:"topic:${topic}"`;
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
  const pinnedPost =
    response.repository.pinnedDiscussions.nodes?.[0]?.discussion || null;
  const internalLabels = new Set(["_published"]);

  // Narrow down the type to Discussions only
  const posts = response.search.edges
    ?.map((edge) => {
      if (edge.node.__typename === "Discussion") {
        edge.node.labels.nodes = edge.node.labels.nodes.filter((label) =>
          internalLabels.has(label.name)
        );
        return edge.node;
      }
      return null;
    })
    .filter((post) => (post && pinnedPost ? pinnedPost.id !== post.id : !!post))
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  const topics = response.repository.labels.nodes.filter(
    (topic) => !internalLabels.has(topic.name)
  );

  return {
    pinnedPost,
    posts,
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
