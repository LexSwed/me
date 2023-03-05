import {
  GetDiscussionQuery,
  GetDiscussionQueryVariables,
  GetDiscussionsQuery,
  GetDiscussionsQueryVariables,
} from "./generated/graphql";
import { PARAMS, request } from "./github";

export async function getPosts(count: number) {
  const response = await request<
    GetDiscussionsQuery,
    GetDiscussionsQueryVariables
  >(postsQuery, {
    repo: PARAMS.repo,
    owner: PARAMS.owner,
    count,
  });

  return response.repository.discussions.nodes;
}

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

const FragmentPost = /* GraphQL */ `
  #graphql
  fragment FragmentPost on Discussion {
    id
    title
    body
    publishedAt
    number
    labels(first: 10) {
      nodes {
        id
        name
        description
      }
    }
  }
`;

const query = /* GraphQL */ `
  #graphql
  ${FragmentPost}
  query GetDiscussion($number: Int!, $repo: String!, $owner: String!) {
    repository(name: $repo, owner: $owner) {
      discussion(number: $number) {
        ...FragmentPost
      }
    }
  }
`;

const postsQuery = /* GraphQL */ `
  #graphql
  ${FragmentPost}
  query GetDiscussions($count: Int!, $repo: String!, $owner: String!) {
    repository(name: $repo, owner: $owner) {
      discussions(first: $count) {
        nodes {
          ...FragmentPost
        }
      }
    }
  }
`;
