import setAssetsPath = require('../utils/setAssetsPath');
import Chain from 'webpack-chain';
import path = require('path');
import { ConfigParams, PluginOptions } from '../types';
import getDemoEntryFilename = require('../utils/getDemoEntryFilename');

const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

export = (config: Chain, options: ConfigParams) => {
  const { rootDir, pluginOptions } = options;
  const {
    splitChunks = {} as PluginOptions['splitChunks'],
    useAnalyzer = false,
  } = pluginOptions;

  // entry
  const appIndexPath = path.resolve(rootDir as string, 'src');
  const entryFileName = getDemoEntryFilename(path.resolve(appIndexPath, 'src'));
  const entryPath = path.join(appIndexPath, entryFileName);
  config.entryPoints.clear();
  config.merge({ entry: { index: entryPath } });
  setAssetsPath(config);

  config.output
    .filename('[name].[contenthash].js')
    .chunkFilename('js/[name].[contenthash].js');

  useAnalyzer &&
    config.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin);

  // splitChunks
  config.optimization.splitChunks({
    ...splitChunks,
  });
};
