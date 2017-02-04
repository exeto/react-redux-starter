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
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              sourceMap: true,
              localIdentName: '[name]---[local]---[hash:base64:5]',
            },
          },
          { loader: 'postcss-loader' },
          { loader: 'resolve-url-loader' },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'static/img/[name].[hash:5].[ext]',
        },
      },
      {
        test: /\.(eot|woff2?|ttf)$/,
        loader: 'file-loader',
        options: {
          name: 'static/fonts/[name].[hash:5].[ext]',
        },
      },
    ],
  },

  devtool: 'cheap-module-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'static/js/vendor.bundle.js?[hash:15]',
    }),
  ],
}, baseConfig, mergeCustomizer);
