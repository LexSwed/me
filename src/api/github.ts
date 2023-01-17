import { graphql } from "@octokit/graphql";

export const github = graphql.defaults({
  headers: {
    Authorization: `Bearer ${import.meta.env.GITHUB_PAT}`,
  },
});

export function getPosts() {
  const query = "repo:LexSwed/lexswed.github.io label:published author:LexSwed";

  // I use search instead of Discussions to only get last 10 by author (me)
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
          category {
            id
            name
          }
          labels(first: 10) {
            nodes {
              name
              id
              color
            }
          }
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

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  category: Category;
  labels: {
    nodes: Array<Label>;
  };
}

interface GetDiscussions {
  search: {
    discussionsCount: number;
    edges: Array<{
      node: Post;
    }>;
  };
}
