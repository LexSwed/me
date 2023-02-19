import { PARAMS, github } from "./github";

export async function getPosts(count: number) {
  const response = await github.query({
    search: {
      __args: {
        last: count,
        type: "DISCUSSION",
        query: PARAMS.query,
      },
      edges: {
        node: {
          __typename: true,
          on_Discussion: {
            id: true,
            title: true,
            createdAt: true,
            number: true,
            labels: {
              __args: {
                first: 10,
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

  // Narrow down the type to Discussions only
  const posts = response.search.edges
    ?.map((edge) => {
      if (edge.node.__typename === "Discussion") {
        return edge.node;
      }
      return null;
    })
    .filter((el) => !!el)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return posts;
}
