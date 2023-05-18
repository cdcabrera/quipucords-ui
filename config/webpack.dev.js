// const path = require('path');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const { setupWebpackDotenvFilesForEnv, setupDotenvFilesForEnv } = require('./build.dotenv');

const {
  _BUILD_DIST_DIR: DIST_DIR,
  _BUILD_HOST: HOST,
  _BUILD_RELATIVE_DIRNAME: RELATIVE_DIRNAME,
  _BUILD_PORT: PORT,
  _BUILD_SRC: SRC_DIR
} = setupDotenvFilesForEnv({ env: 'development' });

const webpackCommon = require('./webpack.common');

const devWebpack = merge(
  {
    plugins: [
      ...setupWebpackDotenvFilesForEnv({
        directory: RELATIVE_DIRNAME,
        env: 'development'
      }),
      new ESLintPlugin({
        context: SRC_DIR,
        failOnError: false
      })
    ]
  },
  webpackCommon('development'),
  {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
      host: HOST,
      port: PORT,
      compress: true,
      historyApiFallback: true,
      hot: true,
      open: true,
      devMiddleware: {
        stats: 'errors-only',
        writeToDisk: true
      },
      client: {
        overlay: false,
        progress: false
      },
      static: {
        directory: DIST_DIR
      },
      watchFiles: {
        paths: ['src/**/*', 'public/**/*']
      }
    },
    module: {}
  }
);

console.log(devWebpack);

module.exports = devWebpack;
