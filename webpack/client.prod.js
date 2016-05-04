'use strict';

const merge = require('lodash.merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./client.base');

module.exports = merge(baseConfig, {
  output: {
    filename: 'static/js/[chunkhash:15].js',
  },

  module: {
    loaders: baseConfig.module.loaders.concat([
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css?modules&camelCase!postcss'),
      },
    ]),
  },

  plugins: baseConfig.plugins.concat([
    new ExtractTextPlugin('static/css/[contenthash:15].css', { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),

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
