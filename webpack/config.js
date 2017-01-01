'use strict';

module.exports = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',

  get publicPath() {
    return `http://${this.host}:${this.port}/`;
  },
};
