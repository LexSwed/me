import { graphql } from "@octokit/graphql";

export const github = graphql.defaults({
  headers: {
    Authorization: `Bearer ${import.meta.env.GITHUB_PAT}`,
  },
});

export function getPosts() {
  const categoryId = "DIC_kwDOB0MxVM4CTm8u";

  return github<GetDiscussions>(
    `#graphql 
    query GetDiscussions($categoryId: ID!) {
      repository(name: "lexswed.github.io", owner: "LexSwed") {
    discussions(last: 10, orderBy: {field: CREATED_AT, direction: DESC}, categoryId: $categoryId) {
      nodes {
        id
        title
        url
        publishedAt
        body
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
`,
    {
      categoryId,
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
  // category: Category;
  body: string;
  labels: {
    nodes: Array<Label>;
  };
}

interface GetDiscussions {
  repository: {
    discussions: {
      nodes: Array<Post>;
    };
  };
}
