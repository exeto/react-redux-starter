'use strict';

const merge = require('lodash.mergewith');
const webpack = require('webpack');

const baseConfig = require('./client.base');
const mergeCustomizer = require('./utils/mergeCustomizer');

module.exports = merge({
  entry: [
    'webpack-hot-middleware/client?reload=true',
  ],

  output: {
    filename: 'static/js/bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&camelCase&sourceMap&localIdentName=[name]---[local]---[hash:base64:5]',
          'postcss',
        ],
      },
    ],
  },

  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
}, baseConfig, mergeCustomizer);
