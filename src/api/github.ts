import { graphql } from "@octokit/graphql";
import {
  GetDiscussionsQuery,
  GetDiscussionsQueryVariables,
  GetDiscussionQueryVariables,
  GetDiscussionQuery,
  GetLabelsQuery,
  GetLabelsQueryVariables,
} from "./graphql/graphql";

const github = graphql.defaults({
  headers: {
    Authorization: `Bearer ${import.meta.env.GITHUB_PAT}`,
  },
});

const PARAMS = {
  categoryId: "DIC_kwDOB0MxVM4CTm8u",
  repo: "lexswed.github.io",
  owner: "LexSwed",
  query: 'repo:"LexSwed/lexswed.github.io" label:_published',
};

export async function getPosts(
  count: number,
  { topic }: { topic?: string | null } = {}
) {
  let searchQuery = PARAMS.query;
  if (topic) {
    searchQuery += ` label:"topic:${topic}"`;
  }

  const response = await github<GetDiscussionsQuery>(Query_GetDiscussions, {
    searchQuery,
    count,
  } satisfies GetDiscussionsQueryVariables);

  // Narrow down the type to Discussions only
  const posts = response.search.edges
    ?.map((edge) => {
      if (edge.node.__typename === "Discussion") {
        return edge.node;
      }
      return null;
    })
    .filter((el) => !!el);

  return posts;
}

export async function getPost(number: number) {
  const response = await github<GetDiscussionQuery>(Query_GetDiscussion, {
    repo: PARAMS.repo,
    owner: PARAMS.owner,
    number,
  } satisfies GetDiscussionQueryVariables);

  return response.repository.discussion;
}

export async function getTopics() {
  const response = await github<GetLabelsQuery>(Query_GetLabels, {
    repo: PARAMS.repo,
    owner: PARAMS.owner,
  } satisfies GetLabelsQueryVariables);

  return response.repository.labels.nodes.filter(
    (topic) => topic.name !== "_published"
  );
}

const Query_GetDiscussions = /* GraphQL */ `
  #graphql
  query GetDiscussions($count: Int!, $searchQuery: String!) {
    search(last: $count, type: DISCUSSION, query: $searchQuery) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          ... on Discussion {
            __typename
            id
            title
            publishedAt
            url
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

const Query_GetLabels = /* GraphQL */ `
  #graphql
  query GetLabels($repo: String!, $owner: String!) {
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
  }
`;
