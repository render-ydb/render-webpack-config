import path = require('path');
import Chain from 'webpack-chain';
import webpack from 'webpack';
import { PluginOptions } from '../types';

const WebpackBar = require('webpackbar');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const getbaseConfig = (
  config: Chain,
  rootDir: string,
  options: PluginOptions,
  mode: 'development' | 'production',
) => {
  const { define = {}, alias = {} } = options;

  config.mode(mode);
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

  config
    .plugin('WebpackBar')
    .use(WebpackBar)
    .end()
    .plugin('CaseSensitivePathsPlugin')
    .use(CaseSensitivePathsPlugin);
};

export = getbaseConfig;
