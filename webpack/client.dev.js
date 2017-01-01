'use strict';

const merge = require('lodash.mergewith');
const webpack = require('webpack');

const baseConfig = require('./client.base');
const mergeCustomizer = require('./utils/mergeCustomizer');
const config = require('./config');

module.exports = merge({
  entry: {
    main: [
      'react-hot-loader/patch',
      'react-dev-utils/webpackHotDevClient',
    ],
  },

  output: {
    filename: 'static/js/bundle.js?[hash:15]',
    publicPath: config.publicPath,
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&camelCase&sourceMap&localIdentName=[name]---[local]---[hash:base64:5]',
          'postcss',
          'resolve-url',
          'sass?sourceMap',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file?name=static/img/[name].[hash:5].[ext]',
      },
      {
        test: /\.(eot|woff2?|ttf)$/,
        loader: 'file?name=static/fonts/[name].[hash:5].[ext]',
      },
    ],
  },

  devtool: 'cheap-module-source-map',

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'static/js/vendor.bundle.js?[hash:15]'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
}, baseConfig, mergeCustomizer);
