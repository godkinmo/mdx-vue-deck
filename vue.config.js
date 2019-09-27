module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /.mdx?$/,
          use: [
            'babel-loader',
            {
              loader: require.resolve('./markdown-loader')
            },
            '@mdx-js/vue-loader'
          ]
        }
      ]
    },
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@deck', process.env.SRC_DECK)
  }
}
