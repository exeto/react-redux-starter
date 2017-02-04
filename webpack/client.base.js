'use strict';

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '../client'),

  entry: {
    main: [
      './index.js',
    ],
    vendor: [
      'isomorphic-fetch',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-actions',
      'redux-apist',
      'redux-thunk',
    ],
  },

  output: {
    path: path.join(__dirname, '../public'),
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },

  plugins: [
    new CopyWebpackPlugin([{ from: 'to-root' }]),

    new AssetsPlugin({
      filename: 'assets.json',
      path: './tmp',
    }),
  ],
};
