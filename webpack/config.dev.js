'use strict';

const merge = require('lodash.merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./config.base');

module.exports = merge(baseConfig, {
  entry: [
    'webpack-hot-middleware/client?reload=true',
  ].concat(baseConfig.entry),

  output: {
    filename: 'static/bundle.js',
  },

  module: {
    loaders: baseConfig.module.loaders.concat([
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&sourceMap&localIdentName=[name]---[local]---[hash:base64:5]',
          'postcss',
        ],
      },
    ]),
  },

  devtool: 'cheap-module-eval-source-map',

  plugins: baseConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({ template: 'template.html', hash: true, inject: false }),
  ]),
});
