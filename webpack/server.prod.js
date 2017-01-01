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
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.scss$/,
        loader: 'css/locals?-minimize&modules&camelCase&context=client!postcss!sass',
      },
    ],
  },
};
