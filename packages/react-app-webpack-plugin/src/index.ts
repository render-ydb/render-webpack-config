import {
  Compiler,
  ChainConfig,
  WebpackBuilderPluginClass,
} from '@x.render/render-builder';
import getbaseConfig from './configs/base';
import getDevConfig from './configs/dev';
import getBuildConfig from './configs/build';
import { AppConfig, PluginOptions } from './types';
import getPageConfigInfo from './utils/getPageConfigInfo';
import { log } from '@x.render/render-node-utils';
import chalk = require('chalk');

const openBrowser = require('react-dev-utils/openBrowser');

export default class BuildReactComponentWebpackPlugin extends WebpackBuilderPluginClass {
  run(compiler: Compiler, config: ChainConfig, options: PluginOptions) {
    const { context, hooks } = compiler;
    const { command, commandArgs, rootDir, appConfig } = context;
    const { https } = commandArgs;

    const mode = command === 'start' ? 'development' : 'production';

    config.mode(mode);

    const pageConfigInfo = getPageConfigInfo(appConfig as AppConfig, rootDir);

    getbaseConfig(
      config,
      rootDir,
      options,
      appConfig,
      pageConfigInfo,
      mode === 'development',
    );

    if (command === 'start') {
      getDevConfig(config, https, pageConfigInfo, appConfig, options.VConsole);
    } else if (command === 'build') {
      getBuildConfig(config, rootDir);
    }

    hooks.afterServerStarted.tap('afterServerStarted', ({ url }) => {
      openBrowser(url);
    });
    hooks.afterBuild.tap('afterBuild', ({ urls }) => {
      const { lanUrlForBrowser, localUrlForBrowser } = urls;
      const printUrl = (url) => {
        pageConfigInfo.forEach((pageConfig) => {
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
    return config;
  }
}
export * from './types';
