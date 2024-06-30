const { EslintWebpackPlugin } = require('weldable/lib/packages');

module.exports = ({ SRC_DIR } = {}) => ({
  plugins: [
    new EslintWebpackPlugin({
      context: SRC_DIR,
      failOnError: false
    })
  ]
});
