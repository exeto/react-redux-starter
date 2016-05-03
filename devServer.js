'use strict';

const bs = require('browser-sync').create();
const express = require('express');
const webpack = require('webpack');

const config = require('./webpack/client.dev');

const app = express();
const compiler = webpack(config);
const bsConfig = {
  open: false,
  notify: false,
  server: 'public',
  middleware: [app],
};
let launched = false;

app.set('views', './client');
app.set('view engine', 'ejs');

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.render('template', { assets: require('./tmp/assets'), data: {} });
});

compiler.plugin('done', () => {
  if (!launched) {
    bs.init(bsConfig);
    launched = true;
  }
});
