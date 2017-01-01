'use strict';

const plugins = [
  require('postcss-flexbugs-fixes'),
  require('autoprefixer'),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    require('postcss-csso')({ comments: false })
  );
}

module.exports = { plugins };
