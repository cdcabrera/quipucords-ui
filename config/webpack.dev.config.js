const { EslintWebpackPlugin } = require('weldable/lib/packages');

module.exports = ({ SRC_DIR, MOCK_PORT, HOST } = {}) => ({
  plugins: [
    new EslintWebpackPlugin({
      context: SRC_DIR,
      failOnError: false
    })
  ],
  devServer: {
    proxy: [
      {
        context: ['/api'],
        target: `http://${HOST}:${MOCK_PORT}`,
        secure: false
      }
    ]
  }
});
