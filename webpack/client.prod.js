'use strict';

const merge = require('lodash.mergewith');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseConfig = require('./client.base');
const mergeCustomizer = require('./utils/mergeCustomizer');

module.exports = merge({
  output: {
    filename: 'static/js/[chunkhash:15].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              minimize: false,
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
        ]),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/img/[hash:15].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: true,
              svgo: {
                plugins: [{ removeUselessDefs: false }],
              },
            },
          },
        ],
      },
      {
        test: /\.(eot|woff2?|ttf)$/,
        loader: 'file-loader',
        options: {
          name: 'static/fonts/[hash:15].[ext]',
        },
      },
    ],
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'static/js/[chunkhash:15].js',
    }),

    new ExtractTextPlugin({
      filename: 'static/css/[contenthash:15].css',
      allChunks: true,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
}, baseConfig, mergeCustomizer);
