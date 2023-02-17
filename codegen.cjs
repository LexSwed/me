/** @type {import("@graphql-codegen/cli").CodegenConfig} */
const config = {
  schema: {
    "https://api.github.com/graphql": {
      headers: {
        "Authorization": `Bearer ${process.env.GITHUB_PAT}`,
        "User-Agent": "GraphQL Codegen - Personal Website",
      },
    },
  },
  documents: ["src/**/*.ts"],
  generates: {
    "./src/api/graphql/": {
      preset: "client",
      plugins: ["typescript"],
    },
  },
};

module.exports = config;
