const {
  // cssLoaderResolve,
  // sassLoaderResolve,
  EslintWebpackPlugin
  // MiniCssExtractPlugin
} = require('weldable/lib/packages');

module.exports = ({ SRC_DIR } = {}) => ({
  /*
  module: {
    rules: [
      {
        test: /\.(sa|sc)ss$/i,
        use: [MiniCssExtractPlugin.loader, cssLoaderResolve, sassLoaderResolve]
      }
    ]
  },
  */
  plugins: [
    new EslintWebpackPlugin({
      context: SRC_DIR,
      failOnError: false
    })
  ]
});
