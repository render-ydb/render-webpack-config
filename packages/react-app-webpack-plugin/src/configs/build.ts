import Chain from 'webpack-chain';
import path = require('path');
import { TemplateConfigInfo } from '../types';

const HtmlWebpackPlugin = require('html-webpack-plugin');

const getBuildConfig = (
  config: Chain,
  templateConfigInfo: TemplateConfigInfo,
  rootDir: string,
) => {
  config.devtool(false);
  config.output
    .path(path.resolve(rootDir, 'build'))
    .filename('[name].[contenthash].js')
    .chunkFilename('[id].[contenthash].js');

  templateConfigInfo.config.forEach((templateConfig) => {
    const { pageTitle, pageName, meta, script } = templateConfig;
    config.plugin('html-' + pageName).use(HtmlWebpackPlugin, [
      {
        inject: 'body',
        favicon: path.resolve(process.cwd(), 'public', 'favicon.ico'),
        filename: `${pageName}.html`,
        chunks: [pageName],
        template: path.resolve(__dirname, '../views', 'template.ejs'),
        templateParameters: () => ({
          title: pageTitle,
          devChunkJs: '',
          meta,
          script,
          vconsole: false,
        }),
      },
    ]);
  });
};
export = getBuildConfig;
