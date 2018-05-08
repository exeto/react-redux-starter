'use strict';

const AssetsPlugin = require('assets-webpack-plugin');

const paths = require('./paths');

module.exports = {
  mode: 'production',
  bail: true,
  entry: paths.appIndexJs,

  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[chunkhash:8].js',
    publicPath: paths.publicUrl,
  },

  resolve: {
    alias: {
      '@': paths.appSrc,
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
  },

  plugins: [
    new AssetsPlugin({
      filename: 'assets.json',
      path: './build',
    }),
  ],

  performance: {
    hints: false,
  },
};
