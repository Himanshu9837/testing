'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// http://webpack.github.io/docs/configuration.html
// http://webpack.github.io/docs/webpack-dev-server.html
module.exports = {
  output: {
    chunkFilename: '[id].[hash].js',
    // https://reactjs.org/docs/cross-origin-errors.html
    crossOriginLoading: "anonymous",
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        // https://github.com/jtangelder/sass-loader
        test: /\.scss$/,
        loader: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
    }),
    new HtmlWebpackPlugin({
      cache: true,
      title: 'Loogup',
      template: path.join(__dirname, 'public', 'index.html'),
      favicon: path.join(__dirname, 'public', 'favicon.jpg'),
      description: 'Just copy/paste my actuall stuff here',
      // url: 'whatever',
      output:path.resolve(__dirname, 'dist'),
      xhtml: true,
    }),
  ]
};