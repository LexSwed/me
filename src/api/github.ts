import { graphql } from "@octokit/graphql";
import {
  GetDiscussionsQuery,
  GetDiscussionsQueryVariables,
  GetDiscussionQueryVariables,
  GetDiscussionQuery,
} from "./graphql/graphql";

export const github = graphql.defaults({
  headers: {
    Authorization: `Bearer ${import.meta.env.GITHUB_PAT}`,
  },
});

const PARAMS = {
  categoryId: "DIC_kwDOB0MxVM4CTm8u",
  repo: "lexswed.github.io",
  owner: "LexSwed",
};

export async function getPosts() {
  const response = await github<GetDiscussionsQuery>(Query_GetDiscussions, {
    repo: PARAMS.repo,
    owner: PARAMS.owner,
    categoryId: PARAMS.categoryId,
  } satisfies GetDiscussionsQueryVariables);

  return response.repository.discussions.nodes;
}

export async function getPost(number: number) {
  const response = await github<GetDiscussionQuery>(Query_GetDiscussion, {
    repo: PARAMS.repo,
    owner: PARAMS.owner,
    number,
  } satisfies GetDiscussionQueryVariables);

  return response.repository.discussion;
}

const Query_GetDiscussions = /* GraphQL */ `
  #graphql
  query GetDiscussions($repo: String!, $owner: String!, $categoryId: ID!) {
    repository(name: $repo, owner: $owner) {
      discussions(
        last: 10
        orderBy: { field: CREATED_AT, direction: DESC }
        categoryId: $categoryId
      ) {
        nodes {
          id
          title
          url
          publishedAt
          number
          labels(first: 10) {
            nodes {
              color
              id
              name
            }
          }
        }
      }
    }
  }
`;

const Query_GetDiscussion = /* GraphQL */ `
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
