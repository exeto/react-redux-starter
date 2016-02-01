'use strict';

const browserSync = require('browser-sync').create();
const history     = require('connect-history-api-fallback');
const webpack     = require('webpack');
const webpackDev  = require('webpack-dev-middleware');
const webpackHot  = require('webpack-hot-middleware');

const config  = require('./webpack/config.dev');

const compiler = webpack(config);

browserSync.init({
  open: false,
  notify: false,

  server: {
    baseDir: '.',

    middleware: [
      history(),
      webpackDev(compiler, {
        noInfo: true,
        stats: {
          colors: true,
        },
      }),
      webpackHot(compiler),
    ],
  },

  files: [
    'source/*.html',
  ],
});
