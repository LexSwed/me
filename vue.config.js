module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-preset-env')({
            stage: 3,
            features: {
              'nesting-rules': true
            }
          })
        ]
      }
    }
  },
  publicPath: '/dist',
  indexPath: '../index.html',
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: true
};
