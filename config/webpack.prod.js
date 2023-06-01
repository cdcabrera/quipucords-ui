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
    output: {
      chunkFilename: '[name].[contenthash:8].chunk.js',
      filename: '[name].[contenthash:8].js'
    },
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
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        // usedExports: true,
        // hidePathInfo: true,
        minSize: 50000,
        maxSize: 250000,
        // name: false,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all'
            // reuseExistingChunk: true,
            // usedExports: true
          }
          /*
          commons: {
            // test: /[\\/]node_modules[\\/](moment|react*|react-dom|react-router*|redux|@patternfly*)[\\/]/,
            test: /[\\/]node_modules[\\/](moment|react*|react-router*|@remix|redux|reselect|@patternfly*)[\\/]/,
            name: 'vendor',
            reuseExistingChunk: true,
            usedExports: true,
            chunks: 'all'
          }
           */
        }
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
