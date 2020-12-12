export default {
  target: 'static',
  build: {
    postcss: {
      preset: {
        stage: 3,
        features: {
          'nesting-rules': true
        }
      }
    }
  },
  components: {
    dirs: [
      '~/components',
      {
        path: '~/components/lib/',
        prefix: 'Lib'
      }
    ]
  }
};
