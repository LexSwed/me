import { graphql } from "@octokit/graphql";
import { RequestParameters } from "@octokit/graphql/dist-types/types";

const github = graphql.defaults({
  headers: {
    Authorization: `Bearer ${import.meta.env.GITHUB_PAT}`,
  },
});

export const PARAMS = {
  repo: "me",
  owner: "LexSwed",
  query: 'repo:"LexSwed/me" label:_published',
};

export async function request<Q, V extends RequestParameters>(
  query: string,
  variables: V
) {
  return await github<Q>(query, variables);
}
