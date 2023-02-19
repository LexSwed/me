import { PARAMS, github } from "./github";

export async function getPost(number: number) {
  const response = await github.query({
    repository: {
      __args: {
        name: PARAMS.repo,
        owner: PARAMS.owner,
      },
      discussion: {
        __args: {
          number,
        },
        id: true,
        title: true,
        body: true,
        createdAt: true,
        labels: {
          __args: {
            first: 10,
          },
          nodes: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    },
  });

  return response.repository.discussion;
}
