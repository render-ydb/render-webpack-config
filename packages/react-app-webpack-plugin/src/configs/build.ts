import Chain from 'webpack-chain';
import path = require('path');
import getDemoEntryFilename = require('../utils/getDemoEntryFilename');

const getBuildConfig = (config: Chain, rootDir: string) => {
  const outputPath = path.resolve(rootDir, 'build');

  config.devtool(false);

  config.output
    .path(outputPath)
    .filename('[name].[contenthash].js')
    .chunkFilename('[id].[contenthash].js');
};
export = getBuildConfig;
