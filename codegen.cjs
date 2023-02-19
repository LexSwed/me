/** @type {import("@graphql-codegen/cli").CodegenConfig} */
const config = {
  schema: "./src/api/github.graphql",
  documents: ["src/**/*.ts"],
  ignoreNoDocuments: true,
  emitLegacyCommonJSImports: false,
  generates: {
    "./src/api/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        preResolveTypes: true,
        dedupeOperationSuffix: true,
        exportFragmentSpreadSubTypes: true,
        useTypeImports: true,
        skipTypename: true,
        scalars: {
          DateTime: "string",
        },
      },
    },
  },
};

module.exports = config;
