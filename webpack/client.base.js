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
      'babel-polyfill',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-actions',
    ],
  },

  output: {
    path: path.join(__dirname, '../public'),
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
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
