module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        ident: "postcss",
        plugins: () => [
          require("postcss-preset-env")({
            stage: 3,
            features: {
              "nesting-rules": true
            }
          })
        ]
      }
    }
  },

  baseUrl: "/docs",
  outputDir: "docs",
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined
};
