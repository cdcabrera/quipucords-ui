const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
    devtool: undefined,
    optimization: {
      minimize: true,
      minimizer: [
        new TerserJSPlugin({
          parallel: true
        }),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: ['default', { mergeLonghand: false }]
          }
        })
      ],
      splitChunks: {
        chunks: 'all'
      }
      /*
      ,
      splitChunks: {
        chunks: 'all',
        minSize: 25000,
        maxInitialSize: 100000,
        name: false
      }
      */
      /*
      splitChunks: {
        chunks: 'all',
        // minSize: 25000,
        maxSize: 1000000,
        // maxInitialSize: 100000,
        name: false,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](react|react-dom|regenerator|@patternfly)[\\/]/,
            name: 'vendor',
            chunks: 'all'
          }
        }
      }
      */
    },
    plugins: [
      new MiniCssExtractPlugin({
        chunkFilename: '[name].[contenthash:8].chunk.css',
        filename: '[name].[contenthash:8].css'
      })
    ]
  }
);
