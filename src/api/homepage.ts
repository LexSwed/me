import { PARAMS, request } from "./github";
import type {
  GetHomepageDataQuery,
  GetHomepageDataQueryVariables,
} from "./generated/graphql";

export async function getPosts(count: number) {
  const response = await request<
    GetHomepageDataQuery,
    GetHomepageDataQueryVariables
  >(query, {
    searchQuery: PARAMS.query,
    count,
  });

  // Narrow down the type to Discussions only
  const posts = response.search.edges
    ?.map((edge) => {
      if (edge.node.__typename === "Discussion") {
        return edge.node;
      }
      return null;
    })
    .filter((el) => !!el)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return posts;
}

const query = /* GraphQL */ `
  #graphql
  query GetHomepageData($count: Int!, $searchQuery: String!) {
    search(last: $count, type: DISCUSSION, query: $searchQuery) {
      edges {
        node {
          __typename
          ... on Discussion {
            id
            title
            createdAt
            number
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
