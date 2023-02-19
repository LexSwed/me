import { config } from "dotenv";
import { createClient } from "./graphql";

config();

export const PARAMS = {
  repo: "lexswed.github.io",
  owner: "LexSwed",
  query: 'repo:"LexSwed/lexswed.github.io" label:_published',
};

export const github = createClient({
  url: "https://api.github.com/graphql",
  headers: {
    "Authorization": `Bearer ${process.env.GITHUB_PAT}`,
    "User-Agent": "GraphQL Codegen - Personal Website",
  },
});
