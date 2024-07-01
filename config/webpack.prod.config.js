// const {
//  sassLoaderResolve,
//  MiniCssExtractPlugin
// } = require('weldable/lib/packages');

module.exports = () => ({
  ignoreWarnings: [
    {
      message: /mini-css-extract-plugin/
    }
  ]
  /*
  module: {
    rules: [
      {
        test: /\.(sa|sc)ss$/i,
        use: [sassLoaderResolve]
      }
    ]
  }
  */
  /*
  plugins: [
    new MiniCssExtractPlugin({
      chunkFilename: '[name].[contenthash:8].chunk.css',
      filename: '[name].[contenthash:8].css',
      ignoreOrder: true
    })
  ]
  */
});
