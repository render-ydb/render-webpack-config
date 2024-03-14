import Chain from 'webpack-chain';
import path = require('path');
import { TemplateConfigInfo } from '../types';
import { Compiler } from '@x.render/render-builder';
import { log } from '@x.render/render-node-utils';
import chalk = require('chalk');

const openBrowser = require('react-dev-utils/openBrowser');

const getDevConfig = (
  config: Chain,
  templateConfigInfo: TemplateConfigInfo,
  hooks: Compiler['hooks'],
) => {
  config.output.filename('[name].js');
  config.devServer.hot(true);
  config.devServer.historyApiFallback(false);

  config.devServer.merge({
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      devServer.app.set('views', path.join(__dirname, '../', 'views'));
      devServer.app.set('view engine', 'ejs');
      templateConfigInfo.config.forEach((templateConfig) => {
        const { pageTitle, pageName, pageRealRoutePath, meta, script } =
          templateConfig;
        devServer.app.get(pageRealRoutePath, (req, res) => {
          res.render('template', {
            title: pageTitle,
            devChunkJs: pageName + '.js',
            meta,
            script,
            vconsole: templateConfigInfo.extra.vconsole,
          });
        });
      });

      devServer.app.use((req, res, next) => {
        if (req.path.split('.').length === 1) {
          res.status(404).render('404', { items: templateConfigInfo.config });
        } else {
          next();
        }
      });

      return middlewares;
    },
  });

  hooks.afterServerStarted.tap('afterServerStarted', ({ url }) => {
    openBrowser(url);
  });
  hooks.afterBuild.tap('afterBuild', ({ urls }) => {
    const { lanUrlForBrowser, localUrlForBrowser } = urls;
    const printUrl = (url) => {
      templateConfigInfo.config.forEach((pageConfig) => {
        log.info(
          chalk.blue.underline(
            `${url}${pageConfig.pageRealRoutePath.replace('/', '')}`,
          ),
        );
      });
    };
    setImmediate(() => {
      console.log();
      log.info('-Local:');
      printUrl(localUrlForBrowser);
      console.log();
      log.info('-Network:');
      printUrl(lanUrlForBrowser);
    });
  });
};

export = getDevConfig;
