import {
  Compiler,
  ChainConfig,
  WebpackBuilderPluginClass,
} from '@x.render/render-builder';

import baseConfig = require('./configs/base');
import devConfig = require('./configs/dev');
import buildConfig = require('./configs/build');

import { PluginOptions, ConfigParams } from './types';

import ReactBabelWebpackPlugin from '@x.render/react-babel-webpack-plugin';
import StaticAssetsWebpackPlugin from '@x.render/static-assets-webpack-plugin';
import StyleWebpackPlugin from '@x.render/style-webpack-plugin';
import OptimizationWebpackPlugin from '@x.render/optimization-webpack-plugin';

const openBrowser = require('react-dev-utils/openBrowser');

export default class BuildComponentPlugin extends WebpackBuilderPluginClass {
  run(compiler: Compiler, config: ChainConfig, options: PluginOptions) {
    const { context, hooks } = compiler;
    const { command, pkg, commandArgs, rootDir } = context;
    const { https } = commandArgs;

    const mode = command === 'start' ? 'development' : 'production';
    config.mode(mode);

    const {
      // style-webpack-plugin options
      miniCssExtractPluginLoaderOptions,
      styleLoaderOptions,
      cssLoaderOptions,
      lessLoaderOptions,
      sassLoaderOptions,
      postcssLoaderOptions,
      miniCssExtractPluginOptions,
      inlineStyle,
      styleSourceMap,

      // static-assets-webpack-plugin options
      imageSizeLimit,
      imageFilename,
      fontSizeLimit,
      fontFilename,

      // optimization-webpack-plugin options
      terserPluginOptions,
      cssMinimizerPluginOptions,
    } = options;

    StaticAssetsWebpackPlugin.getConfig(compiler, config, {
      imageSizeLimit,
      imageFilename,
      fontSizeLimit,
      fontFilename,
    });

    StyleWebpackPlugin.getConfig(compiler, config, {
      miniCssExtractPluginLoaderOptions,
      styleLoaderOptions,
      cssLoaderOptions,
      lessLoaderOptions,
      sassLoaderOptions,
      postcssLoaderOptions,
      miniCssExtractPluginOptions,
      inlineStyle,
      styleSourceMap,
      useRpx: false,
    });
    OptimizationWebpackPlugin.getConfig(compiler, config, {
      terserPluginOptions,
      cssMinimizerPluginOptions,
    });

    const params: ConfigParams = {
      rootDir,
      pkg,
      https: https as string,
      pluginOptions: options,
    };

    ReactBabelWebpackPlugin.getConfig(compiler, config, options);

    baseConfig(config, params);

    if (command === 'start') {
      devConfig(config, params);
    } else if (command === 'build') {
      buildConfig(config, params);
    }

    hooks.afterServerStarted.tap('afterStartCompile', ({ url }) => {
      openBrowser(url);
    });

    return config;
  }
}
