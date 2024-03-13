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
  const VConsoleScript =
    isDevelopment && VConsole
      ? `  
<script src="https://cdnjs.cloudflare.com/ajax/libs/vConsole/3.15.1/vconsole.min.js"></script>
<script>
  new VConsole();
</script>`
      : '';
  pageConfigInfo.forEach((pageConfig) => {
    const { pageTitle, pageName } = pageConfig;
    config.plugin('html-' + pageName).use(HtmlWebpackPlugin, [
      {
        inject: 'body',
        favicon: pageConfig.pageRealFaviconPath,
        filename: `${pageName}.html`,
        chunks: [pageName],
        templateContent: () => `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
                        ${metas.join('\n')}
                        <title>${
  pageTitle || window.title || 'render-app'
}</title>
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
  });
};

export = setHtmlTemplate;
