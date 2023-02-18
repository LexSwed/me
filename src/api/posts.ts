import { PARAMS, request } from "./github";
import {
  GetPostsDataQuery,
  GetPostsDataQueryVariables,
} from "./graphql/graphql";

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

  // Narrow down the type to Discussions only
  const posts = response.search.edges
    ?.map((edge) => {
      if (edge.node.__typename === "Discussion") {
        return edge.node;
      }
      return null;
    })
    // not necessary as we know we only request Discussions, but just in case
    .filter((el) => !!el);

  const topics = response.repository.labels.nodes.filter(
    (topic) => topic.name !== "_published"
  );

  return {
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
    }
    search(last: $count, type: DISCUSSION, query: $searchQuery) {
      edges {
        node {
          ... on Discussion {
            __typename
            id
            title
            publishedAt
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
        }
      }
    }
  }
`;
