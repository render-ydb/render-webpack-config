import Chain from 'webpack-chain';
import path = require('path');
import createDemoPathAndEntryPath = require('../utils/createDemoPathAndEntryPath');
import { APP_DEMO_DIR_PATH } from '../constants';
import { PageConfig, PluginOptions } from '../types';
import { AppConfig, MockConfig } from '@x.render/render-builder';

const HtmlWebpackPlugin = require('html-webpack-plugin');

const getDevConfig = (
  config: Chain,
  https: boolean,
  pageConfigInfo: PageConfig[],
) => {
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
          res.render('dev', {
            title: pageTitle,
            jsPath: pageName + '.js',
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
