import { PARAMS, request } from "./github";
import {
  GetHomepageDataQuery,
  GetHomepageDataQueryVariables,
} from "./graphql/graphql";

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
    // not necessary as we know we only request Discussions, but just in case
    .filter((el) => !!el);

  return posts;
}

const query = /* GraphQL */ `
  #graphql
  query GetHomepageData($count: Int!, $searchQuery: String!) {
    search(last: $count, type: DISCUSSION, query: $searchQuery) {
      edges {
        node {
          ... on Discussion {
            __typename
            id
            title
            publishedAt
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
