'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./webpack.config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const googleMapsApiKey = require('./secrets/googleMapsApiKey.js');

module.exports = merge(
  config,
  {
    mode: 'production',
    entry: {
      app: path.resolve(__dirname, 'src/index.js'),
      admin: path.resolve(__dirname, 'src/components/AdminDashboard'),
      libs: [
        path.resolve(__dirname, 'src/libs'),
        path.resolve(__dirname, 'src/components/LuIcons'),
      ],
      vendor: [
        'prop-types',
        'react',
        'react-dom',
        'react-intl',
        'react-router',
        'redux',
      ],
    },
    output: {
      publicPath: '/', // FIX: Uncaught (in promise) Error: Loading chunk # failed. async
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [
            /node_modules/,
            /secrets/ ,
          ],
          use: [
            'babel-loader'
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(
        'dist',
        {
          root: path.resolve(__dirname),
          verbose: true,
        },
      ),
      new webpack.DefinePlugin({
        'GOOGLE_MAPS_API_KEY': JSON.stringify(googleMapsApiKey),
      }),
      //new webpack.optimize.UglifyJsPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, [ /moment$/, /react-intl$/, /zxcvbn$/ ]),
      new CopyWebpackPlugin(
        [
          {
            from: path.resolve(__dirname, 'public'),
            to: path.resolve(__dirname, 'dist'),
          }
        ],
        {
          ignore: [
            '*.html',
            '.*',
          ],
        },
      ),
      new FaviconsWebpackPlugin({
        logo: path.resolve(__dirname, 'public/favicon.jpg'),
        inject: true,
        title: 'Wonderful App',
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.SplitChunksPlugin({
        chunks: 'async',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
        },
      }),
      new webpack.HashedModuleIdsPlugin({
        hashFunction: 'sha256',
        hashDigest: 'hex',
        hashDigestLength: 20,
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          beautify: false,
          comments: false,
          comparisons: true,
          compress: true,
          conditionals: true,
          dead_code: true,
          evaluate: true,
          ie8: false,
          if_return: true,
          join_vars: true,
          keep_classnames: false,
          mangle: true,
          sequences: true,
          unused: true,
          warnings: false,
          output: {
            comments: false,
            beautify: false,
          },
        },
        exclude: [ /\.min\.js$/gi ], // skip pre-minified libs
      }),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0
      }),
    ],
  }
);