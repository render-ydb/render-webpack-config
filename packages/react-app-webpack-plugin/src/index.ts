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
import getTemplateConfigInfo from './utils/getTemplateConfigInfo';

import createDemoPathAndEntryPath = require('./utils/createDemoPathAndEntryPath');

export default class BuildReactComponentWebpackPlugin extends WebpackBuilderPluginClass {
  run(compiler: Compiler, config: ChainConfig, options: PluginOptions) {
    const { context, hooks } = compiler;
    const { command, rootDir, appConfig } = context;
    const mode = command === 'start' ? 'development' : 'production';

    const pageConfigInfo = getPageConfigInfo(appConfig as AppConfig, rootDir);

    createDemoPathAndEntryPath(pageConfigInfo);

    // set entry
    config.entryPoints.clear();
    pageConfigInfo.forEach((pageConfig) => {
      const { pageRealEntryPath, pageName } = pageConfig;
      config.entry(pageName).add(pageRealEntryPath);
    });

    getbaseConfig(config, rootDir, options, mode);

    const templateConfigInfo = getTemplateConfigInfo(
      pageConfigInfo,
      appConfig,
      options.VConsole,
    );

    command === 'start' && getDevConfig(config, templateConfigInfo, hooks);
    command === 'build' &&
      getBuildConfig(config, templateConfigInfo, rootDir, hooks, options);

    return config;
  }
}
export * from './types';
