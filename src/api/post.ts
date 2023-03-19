import { frontmatter, parse } from "../utils/markdown";
import {
  FragmentPostFragment,
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

  return response.repository.discussions.nodes.map((node) => parsePost(node));
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

  return parsePost(response.repository.discussion);
}

function parsePost(post: FragmentPostFragment) {
  const internalLabels = new Set(["_published"]);
  const { title, labels, number, body, publishedAt } = post;
  const data = frontmatter({ body });
  return {
    title,
    publishedAt,
    summary: data.description,
    slug: number,
    poster: data.poster
      ? {
          img: data.poster,
          alt: data.posterAlt,
        }
      : null,
    tags: labels.nodes.filter((label) => !internalLabels.has(label.name)),
    body: parse(post.body),
  };
}

export type Post = ReturnType<typeof parsePost>;

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
