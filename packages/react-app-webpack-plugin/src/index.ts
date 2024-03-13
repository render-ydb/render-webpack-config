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

const openBrowser = require('react-dev-utils/openBrowser');

export default class BuildReactComponentWebpackPlugin extends WebpackBuilderPluginClass {
  run(compiler: Compiler, config: ChainConfig, options: PluginOptions) {
    const { context, hooks } = compiler;
    const { command, commandArgs, pkg, rootDir, appConfig, mockConfig } =
      context;
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
      getDevConfig(config, https, pageConfigInfo);
    } else if (command === 'build') {
      getBuildConfig(config, rootDir);
    }

    hooks.afterServerStarted.tap('afterServerStarted', ({ url }) => {
      openBrowser(url);
    });
    return config;
  }
}
export * from './types';
