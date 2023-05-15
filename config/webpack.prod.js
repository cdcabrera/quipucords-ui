const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const { setupWebpackDotenvFilesForEnv, setupDotenvFilesForEnv } = require('./build.dotenv');

const { NODE_ENV: MODE, _BUILD_RELATIVE_DIRNAME: RELATIVE_DIRNAME } = setupDotenvFilesForEnv({
  env: process.env.NODE_ENV
});

const webpackCommon = require('./webpack.common');

module.exports = merge(
  {
    plugins: [
      ...setupWebpackDotenvFilesForEnv({
        directory: RELATIVE_DIRNAME,
        env: MODE
      })
    ]
  },
  webpackCommon(MODE),
  {
    mode: MODE,
    devtool: 'source-map',
    optimization: {
      minimize: true,
      minimizer: [
        new TerserJSPlugin({}),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: ['default', { mergeLonghand: false }]
          }
        })
      ],
      splitChunks: {
        chunks: 'all'
      }
    }
  }
);
