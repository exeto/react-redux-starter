'use strict';

const nodeExternals = require('webpack-node-externals');

const paths = require('./paths');

module.exports = {
  mode: 'production',
  bail: true,
  target: 'node',
  externals: [nodeExternals({ whitelist: ['jss', 'react-jss'] })],
  entry: paths.serverIndexJs,

  output: {
    path: paths.serverBuild,
    filename: 'bundle.js',
  },

  optimization: {
    minimize: false,
  },

  resolve: {
    alias: {
      '@': paths.appSrc,
    },
  },

  node: {
    __filename: false,
    __dirname: false,
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

  performance: {
    hints: false,
  },
};
