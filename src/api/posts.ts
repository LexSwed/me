import { PARAMS, github } from "./github";

export async function getPostsData(
  count: number,
  { topic }: { topic?: string | null } = {}
) {
  let searchQuery = PARAMS.query;
  if (topic) {
    searchQuery += ` label:"topic:${topic}"`;
  }

  const response = await github.query({
    repository: {
      __args: {
        name: PARAMS.repo,
        owner: PARAMS.owner,
      },
      labels: {
        __args: {
          first: 100,
        },
        nodes: {
          id: true,
          name: true,
          color: true,
        },
      },
    },
    search: {
      __args: {
        last: count,
        type: "DISCUSSION",
        query: searchQuery,
      },
      edges: {
        node: {
          __typename: true,
          on_Discussion: {
            id: true,
            title: true,
            createdAt: true,
            url: true,
            number: true,
            body: true,
            labels: {
              __args: {
                first: 20,
              },
              nodes: {
                id: true,
                name: true,
                color: true,
              },
            },
          },
        },
      },
    },
  });

  const posts = response.search.edges
    ?.map((edge) => {
      if (edge.node.__typename === "Discussion") {
        return edge.node;
      }
      return null;
    })
    .filter((el) => !!el)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  const topics = response.repository.labels.nodes.filter(
    (topic) => topic.name !== "_published"
  );

  return {
    posts,
    topics,
  };
}
