const {
  cssLoaderResolve,
  sassLoaderResolve,
  MiniCssExtractPlugin
} = require('weldable/lib/packages');

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(sa|sc)ss$/i,
        use: [sassLoaderResolve]
      }
    ]
  }
});
