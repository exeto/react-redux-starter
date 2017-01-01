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
      'babel-polyfill',
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
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  plugins: [
    new CopyWebpackPlugin([{ from: 'to-root' }]),
    new AssetsPlugin({
      filename: 'assets.json',
      path: './tmp',
    }),
  ],
};
