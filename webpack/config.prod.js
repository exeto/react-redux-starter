'use strict';

const merge = require('lodash.merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./config.base');

module.exports = merge(baseConfig, {
  output: {
    filename: 'static/[chunkhash].js',
  },

  module: {
    loaders: baseConfig.module.loaders.concat([
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css?modules!postcss'),
      },
    ]),
  },

  plugins: baseConfig.plugins.concat([
    new ExtractTextPlugin('static/[contenthash].css', { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),

    new HtmlWebpackPlugin({
      template: 'template.html',
      inject: false,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      comments: false,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ]),
});
