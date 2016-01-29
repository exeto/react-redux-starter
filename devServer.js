'use strict';

const path       = require('path');
const express    = require('express');
const history    = require('connect-history-api-fallback');
const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');
const webpack    = require('webpack');

const config  = require('./webpack/config.dev');

const app = express();
const compiler = webpack(config);

app.use(history());

app.use(webpackDev(compiler, {
  noInfo: true,
  stats: {
    colors: true,
  },
}));

app.use(webpackHot(compiler));

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('==> 🌎  Listening at http://localhost:3000\n');
});
