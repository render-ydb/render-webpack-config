import Chain from 'webpack-chain';
import path = require('path');
import { AppConfig, PageConfig } from '../types';

const getDevConfig = (
  config: Chain,
  https: boolean,
  pageConfigInfo: PageConfig[],
  appConfig: AppConfig,
  VConsole: boolean,
) => {
  const { metas = [], scripts = [], window = {} } = appConfig || {};
  config.devServer.hot(true);
  config.devServer.https(Boolean(https));
  config.devServer.historyApiFallback(false);
  config.devServer.merge({
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      devServer.app.set('views', path.join(__dirname, '../', 'views'));
      devServer.app.set('view engine', 'ejs');
      pageConfigInfo.forEach((pageConfig) => {
        const { pageTitle, pageName, pageRealRoutePath } = pageConfig;
        devServer.app.get(pageRealRoutePath, (req, res) => {
          res.render('template', {
            title: pageTitle,
            devChunkJs: pageName + '.js',
            meta: metas.join('\n'),
            script: scripts.join('\n'),
            vconsole: VConsole,
          });
        });
      });

      devServer.app.use((req, res, next) => {
        if (req.path.split('.').length === 1) {
          res.status(404).render('404', { items: pageConfigInfo });
        } else {
          next();
        }
      });

      return middlewares;
    },
  });
};

export = getDevConfig;
