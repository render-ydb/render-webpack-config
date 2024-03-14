import { AppConfig, PageConfig } from '../types';
import path from 'path';

const HtmlWebpackPlugin = require('html-webpack-plugin');

const setHtmlTemplate = (
  pageConfigInfo: PageConfig[],
  config,
  appConfig: AppConfig,
  VConsole: boolean,
  isDevelopment: Boolean,
) => {
  const { metas = [], scripts = [], window = {} } = appConfig || {};
  pageConfigInfo.forEach((pageConfig) => {
    const { pageTitle, pageName } = pageConfig;
    config.plugin('html-' + pageName).use(HtmlWebpackPlugin, [
      {
        inject: 'body',
        favicon: pageConfig.pageRealFaviconPath,
        filename: `${pageName}.html`,
        chunks: [pageName],
        template: path.resolve(__dirname, '../views', 'template.ejs'),
        templateParameters: () => ({
          title: pageTitle || window.title || 'render-app',
          devChunkJs: '',
          meta: metas.join('\n'),
          script: scripts.join('\n'),
          vconsole: isDevelopment && VConsole,
        }),
      },
    ]);
  });
};

export = setHtmlTemplate;
