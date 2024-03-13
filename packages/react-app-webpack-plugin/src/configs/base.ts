import path = require('path');
import { Json } from '@x.render/render-builder';
import Chain from 'webpack-chain';
import webpack from 'webpack';
import getPageConfigInfo = require('../utils/getPageConfigInfo');
import { AppConfig, PageConfig, PluginOptions } from '../types';
import setEntry = require('./setEntry');
import setHtmlTemplate = require('./setHtmlTemplate');
import createDemoPathAndEntryPath = require('../utils/createDemoPathAndEntryPath');

const WebpackBar = require('webpackbar');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const getbaseConfig = (
  config: Chain,
  rootDir: string,
  options: PluginOptions,
  appConfig: AppConfig,
  pageConfigInfo: PageConfig[],
  isDevelopment: boolean,
) => {
  const { define = {}, alias = {}, VConsole = true } = options;

  createDemoPathAndEntryPath(pageConfigInfo);
  setEntry(config, pageConfigInfo);

  setHtmlTemplate(pageConfigInfo, config, appConfig, VConsole, isDevelopment);

  config.target('web');
  config.context(rootDir);
  config.resolve.modules
    .add('node_modules')
    .add(path.join(rootDir, 'node_modules'))
    .add(path.resolve(__dirname, '../../node_modules'));
  config.optimization.splitChunks({ cacheGroups: {} });

  const defineMap = {};
  Object.entries(define).forEach(([key, value]) => {
    defineMap[key] = JSON.stringify(value);
  });
  config.plugin('define').use(webpack.DefinePlugin, [defineMap]);

  [
    '.js',
    '.jsx',
    '.json',
    '.html',
    '.ts',
    '.tsx',
    'css',
    'less',
    'sass',
    'scss',
  ].forEach((extension) => {
    config.resolve.extensions.add(extension);
  });

  // add packagename to webpack alias
  config.resolve.alias.set('@', path.resolve(rootDir, 'src'));
  Object.keys(alias).forEach((key) => {
    config.resolve.alias.set(key, path.resolve(rootDir, alias[key]));
  });

  config.output.filename('[name].js');

  config
    .plugin('WebpackBar')
    .use(WebpackBar)
    .end()
    .plugin('CaseSensitivePathsPlugin')
    .use(CaseSensitivePathsPlugin);
};

export = getbaseConfig;
