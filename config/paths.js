'use strict';

const path = require('path');

const resolveApp = relativePath => path.resolve(process.cwd(), relativePath);

module.exports = {
  publicUrl: '/',
  appBuild: resolveApp('build/client'),
  serverBuild: resolveApp('build/server'),
  appIndexJs: resolveApp('src/index.js'),
  serverIndexJs: resolveApp('server/index.js'),
  appPackageJson: resolveApp('package.json'),
  appPublic: resolveApp('public'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
};
