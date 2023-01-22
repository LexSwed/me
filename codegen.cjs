/** @type {import("@graphql-codegen/cli").CodegenConfig} */
const config = {
  schema: {
    "https://api.github.com/graphql": {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_PAT}`,
      },
    },
  },
  documents: ["src/api/**/*.ts"],
  generates: {
    "./src/api/graphql/": {
      preset: "client",
      plugins: ["typescript"],
    },
  },
};

module.exports = config;
