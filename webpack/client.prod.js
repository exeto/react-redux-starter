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
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'css?-minimize&modules&camelCase!postcss!resolve-url!sass?sourceMap'
        ),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loaders: [
          'file?name=static/img/[hash:15].[ext]',
          'image-webpack?{progressive:true,svgo:{plugins:[{removeUselessDefs:false}]}}',
        ],
      },
      {
        test: /\.(eot|woff2?|ttf)$/,
        loader: 'file?name=static/fonts/[hash:15].[ext]',
      },
    ],
  },

  postcss: [
    require('postcss-flexbugs-fixes'),
    require('autoprefixer'),
    require('postcss-csso'),
  ],

  plugins: [
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
  ],
}, baseConfig, mergeCustomizer);
