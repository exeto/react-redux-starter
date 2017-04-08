'use strict';

const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  context: path.join(__dirname, '../server'),

  entry: './index.js',

  output: {
    path: path.resolve(__dirname, '../tmp'),
    filename: 'server.bundle.js',
  },

  target: 'node',
  externals: [nodeExternals()],

  node: {
    __filename: false,
    __dirname: false,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              camelCase: true,
              minimize: false,
              context: 'client',
            },
          },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
