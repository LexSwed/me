import {
  GetDiscussionQuery,
  GetDiscussionQueryVariables,
} from "./generated/graphql";
import { PARAMS, request } from "./github";

export async function getPost(number: number) {
  const response = await request<
    GetDiscussionQuery,
    GetDiscussionQueryVariables
  >(query, {
    repo: PARAMS.repo,
    owner: PARAMS.owner,
    number,
  } satisfies GetDiscussionQueryVariables);

  return response.repository.discussion;
}
const query = /* GraphQL */ `
  #graphql
  query GetDiscussion($number: Int!, $repo: String!, $owner: String!) {
    repository(name: $repo, owner: $owner) {
      discussion(number: $number) {
        id
        title
        body
        publishedAt
        labels(first: 10) {
          nodes {
            id
            name
            description
          }
        }
      }
    }
  }
`;
