/* eslint-disable import/no-dynamic-require */

'use strict';

const path = require('path');
const { readFileSync } = require('fs');
const webpack = require('webpack');
const chalk = require('chalk');
const filesize = require('filesize');
const gzipSize = require('gzip-size').sync;

const config = require(path.join(process.cwd(), process.argv[2]));

function printErrors(errors) {
  console.log(chalk.red('Failed to compile.'));
  console.log();

  errors.forEach((err) => {
    console.log(err.message || err);
    console.log();
  });
}

function printFileSizes(stats) {
  const assets = stats.toJson().assets
    .filter(asset => /\.(js|css)$/.test(asset.name))
    .map((asset) => {
      const fileContents = readFileSync(`${config.output.path}/${asset.name}`);
      const size = gzipSize(fileContents);

      return {
        size,
        sizeLabel: filesize(size),
        folder: path.join(path.parse(config.output.path).name, path.dirname(asset.name)),
        name: path.basename(asset.name),
      };
    });

  assets.sort((a, b) => b.size - a.size);

  const longestSizeLabelLength = Math.max(
    ...assets.map(i => i.sizeLabel.length)
  );

  assets.forEach((asset) => {
    let sizeLabel = asset.sizeLabel;
    const sizeLength = sizeLabel.length;

    if (sizeLength < longestSizeLabelLength) {
      const rightPadding = ' '.repeat(longestSizeLabelLength - sizeLength);
      sizeLabel += rightPadding;
    }

    console.log(
      `  ${sizeLabel}  ${chalk.dim(asset.folder + path.sep)}${chalk.cyan(asset.name)}`
    );
  });
}

console.log('Creating an optimized production build...');

webpack(config).run((err, stats) => {
  if (err) {
    printErrors([err]);
    process.exit(1);
  }

  if (stats.compilation.errors.length) {
    printErrors(stats.compilation.errors);
    process.exit(1);
  }

  if (stats.compilation.warnings.length) {
    printErrors(stats.compilation.warnings);
    process.exit(1);
  }

  console.log(chalk.green('Compiled successfully.'));
  console.log();

  console.log('File sizes after gzip:');
  console.log();
  printFileSizes(stats);
  console.log();
});
