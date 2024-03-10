import Chain from 'webpack-chain';
import createDemoPathAndEntryPath = require('../utils/createDemoPathAndEntryPath');
import { APP_DEMO_DIR_PATH, TARGET_FAVICON_PATH } from '../constants';
import { PluginOptions } from '../types';
import { AppConfig, MockConfig } from '@x.render/render-builder';

const HtmlWebpackPlugin = require('html-webpack-plugin');

const getDevConfig = (
  config: Chain,
  https: boolean,
  isDevelopment: boolean,
  options: PluginOptions,
  appConfig: AppConfig,
  mockConfig: MockConfig,
) => {
  const { VConsole = true } = options;
  const { metas = [], scripts = [], window = {} } = appConfig || {};

  const VConsoleScript =
    isDevelopment && VConsole
      ? `  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vConsole/3.15.1/vconsole.min.js"></script>
  <script>
    new VConsole();
  </script>`
      : '';

  config.entryPoints.clear();
  createDemoPathAndEntryPath(mockConfig, options.entryDir);
  config.merge({ entry: { index: APP_DEMO_DIR_PATH } });
  config.plugin('HtmlWebpackPlugin').use(HtmlWebpackPlugin, [
    {
      inject: 'body',
      favicon: TARGET_FAVICON_PATH,
      templateContent: () => `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
              
                ${metas.join('\n')}
                <title>${window.title || 'render-app'}</title>
            </head>
            <body>
                <div id="root"></div>
                ${scripts}
                ${VConsoleScript}
            </body>
            </html>
          `,
    },
  ]);

  config.devServer.hot(true);
  config.devServer.https(Boolean(https));
};

export = getDevConfig;
