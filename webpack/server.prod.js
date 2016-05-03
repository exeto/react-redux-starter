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
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.css$/,
        loader: 'css/locals?modules&camelCase&context=client!postcss',
      },
    ],
  },
};
