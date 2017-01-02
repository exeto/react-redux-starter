'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const openBrowser = require('react-dev-utils/openBrowser');

const webpackConfig = require('../webpack/client.dev');
const config = require('../webpack/config');

const compiler = webpack(webpackConfig);
let isFirstCompile = true;

const devServer = new WebpackDevServer(compiler, {
  compress: true,
  clientLogLevel: 'none',
  hot: true,
  quiet: true,
  contentBase: webpackConfig.output.path,
  publicPath: config.publicPath,

  watchOptions: {
    ignored: /node_modules/,
  },

  setup(app) {
    app.set('views', './server');
    app.set('view engine', 'ejs');
  },
});

devServer.use((req, res) => {
  if (req.method === 'GET') {
    res.render('template', { assets: require('../tmp/assets'), data: {} });
  }
});

devServer.listen(config.port, (err) => {
  if (err) {
    return console.log(err);
  }

  clearConsole();
  console.log(chalk.cyan('Starting the development server...'));
  console.log();

  openBrowser(config.publicPath);
});

compiler.plugin('invalid', () => {
  clearConsole();
  console.log('Compiling...');
});

compiler.plugin('done', (stats) => {
  clearConsole();

  const messages = formatWebpackMessages(stats.toJson({}, true));
  const isSuccessful = !messages.errors.length && !messages.warnings.length;
  const showInstructions = isSuccessful && isFirstCompile;

  if (isSuccessful) {
    console.log(chalk.green('Compiled successfully!'));
  }

  if (showInstructions) {
    console.log();
    console.log('The app is running at:');
    console.log();
    console.log(chalk.cyan(`  ${config.publicPath}`));
    console.log();
    console.log('Note that the development build is not optimized.');
    console.log(`To create a production build, use ${chalk.cyan('npm run build')}.`);
    console.log();

    isFirstCompile = false;
  }

  if (messages.errors.length) {
    console.log(chalk.red('Failed to compile.'));
    console.log();

    messages.errors.forEach((message) => {
      console.log(message);
      console.log();
    });

    return;
  }

  if (messages.warnings.length) {
    console.log(chalk.yellow('Compiled with warnings.'));
    console.log();

    messages.warnings.forEach((message) => {
      console.log(message);
      console.log();
    });
  }
});
