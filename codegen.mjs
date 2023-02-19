/* eslint-disable no-undef */
import { generate } from "@genql/cli";
import { config } from "dotenv";

config();

try {
  generate({
    endpoint: "https://api.github.com/graphql",
    headers: {
      "Authorization": `Bearer ${process.env.GITHUB_PAT}`,
      "User-Agent": "GraphQL Codegen - Personal Website",
    },
    output: "src/api/graphql",
    scalarTypes: {
      DateTime: "string",
    },
  });
} catch (error) {
  console.error(error);
}
