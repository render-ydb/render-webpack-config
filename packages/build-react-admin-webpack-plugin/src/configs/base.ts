import path = require('path');
import Chain from 'webpack-chain';
import { ConfigParams } from '../types';
import { HTML_TEMPLATE } from '../const';

const HtmlWebpackPlugin = require('html-webpack-plugin');

export = (config: Chain, { rootDir, pluginOptions }: ConfigParams) => {
  config.target('web');
  config.context(rootDir);

  config.plugin('HtmlWebpackPlugin').use(HtmlWebpackPlugin, [
    {
      inject: 'body',
      template: HTML_TEMPLATE,
    },
  ]);

  config.resolve.modules
    .add('node_modules')
    .add(path.join(rootDir, 'node_modules'))
    .add(path.resolve(__dirname, '../../node_modules'));

  // disable vendor
  config.optimization.splitChunks({ cacheGroups: {} });

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
  config.resolve.alias.set('@', path.resolve(rootDir, 'src'));

  const outputPath = path.resolve(rootDir as string, 'dist');

  config.output.path(outputPath).filename('index.js');
};
