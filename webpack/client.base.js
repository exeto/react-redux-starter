'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '../client'),

  entry: [
    './index.js',
  ],

  output: {
    path: path.join(__dirname, '../public'),
    publicPath: '/',
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

  postcss: [
    autoprefixer,
  ],

  plugins: [
    new CopyWebpackPlugin([{ from: 'to-root' }]),
    new AssetsPlugin({
      filename: 'assets.json',
      path: './tmp',
    }),
  ],
};
