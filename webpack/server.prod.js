'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  context: path.join(__dirname, '../server'),

  entry: './index.js',

  output: {
    path: path.resolve(__dirname, '../tmp'),
    filename: 'server.bundle.js',
  },

  target: 'node',

  externals: fs.readdirSync(path.resolve(__dirname, '../node_modules')).concat([
    'react-dom/server',
  ]).reduce((ext, mod) => {
    ext[mod] = `commonjs ${mod}`;
    return ext;
  }, {}),

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
