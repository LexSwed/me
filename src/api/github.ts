import { graphql } from "@octokit/graphql";

export const github = graphql.defaults({
  headers: {
    Authorization: `Bearer ${import.meta.env.GITHUB_PAT}`,
  },
});

export function getPosts() {
  const query = "repo:LexSwed/lexswed.github.io label:published author:LexSwed";

  return github<GetDiscussions>(
    `#graphql
    query GetDiscussions($search: String!) {
  search(
    query: $search,
    last: 10
    type: DISCUSSION
  ) {
    discussionCount
    edges {
      node {
        ... on Discussion {
          id
          title
          url
					publishedAt
        }
      }
    }
  }
}
`,
    {
      search: query,
    }
  );
}

interface GetDiscussions {
  search: {
    discussionsCount: number;
    edges: Array<{
      node: {
        id: string;
        title: string;
        url: string;
        publishedAt: string;
      };
    }>;
  };
}
