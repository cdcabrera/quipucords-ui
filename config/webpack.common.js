const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');
const { setupWebpackDotenvFilesForEnv, setupDotenvFilesForEnv } = require('./build.dotenv');

const {
  _BUILD_DIST_DIR: DIST_DIR,
  _BUILD_FAVICON: FAVICON,
  _BUILD_OUTPUT_ONLY: OUTPUT_ONLY,
  _BUILD_PUBLIC_PATH: PUBLIC_PATH,
  _BUILD_RELATIVE_DIRNAME: RELATIVE_DIRNAME,
  _BUILD_SRC_DIR: SRC_DIR,
  _BUILD_STATIC_DIR: STATIC_DIR,
  _BUILD_UI_NAME: UI_NAME
} = setupDotenvFilesForEnv({ env: process.env.NODE_ENV });

if (OUTPUT_ONLY !== true) {
  console.info(
    `\nPrepping files...\n  SRC DIR: ${SRC_DIR}\n  OUTPUT DIR: ${DIST_DIR}\n  PUBLIC PATH: ${PUBLIC_PATH}\n`
  );
}

module.exports = env => ({
  optimization: {
    minimize: env === 'production'
  },
  entry: {
    app: path.join(SRC_DIR, 'index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: DIST_DIR,
    publicPath: PUBLIC_PATH,
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js)?$/,
        include: [SRC_DIR],
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: 'asset/inline'
      },
      {
        test: /\.svg$/i,
        type: 'asset/inline',
        generator: {
          dataUrl: content => svgToMiniDataURI(content.toString())
        }
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/i,
        type: 'asset/inline'
      }
    ]
  },
  plugins: [
    ...setupWebpackDotenvFilesForEnv({
      directory: RELATIVE_DIRNAME
    }),
    new CopyPlugin({
      patterns: (() => {
        try {
          return (
            fs
              .readdirSync(STATIC_DIR)
              ?.filter(fileDir => !/^(\.|index)/.test(fileDir))
              ?.map(fileDir => ({
                from: path.join(STATIC_DIR, fileDir),
                to: path.join(DIST_DIR, fileDir)
              })) || []
          );
        } catch (e) {
          console.error(`webpack copy plugin error: ${e.message}`);
          return [];
        }
      })()
    }),
    new HtmlWebpackPlugin({
      template: path.join(STATIC_DIR, 'index.html'),
      ...(UI_NAME && { title: UI_NAME }),
      ...(FAVICON && { favicon: path.resolve(RELATIVE_DIRNAME, FAVICON) })
    }),
    new HtmlReplaceWebpackPlugin([
      {
        pattern: /%([A-Z_]+)%/g,
        replacement: (match, $1) => process.env?.[$1] || match
      }
    ]),
    new MiniCssExtractPlugin({
      chunkFilename: '[name].css',
      filename: '[id].css'
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
    symlinks: false,
    cacheWithContext: false
  }
});
