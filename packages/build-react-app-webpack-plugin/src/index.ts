import {
  Compiler,
  ChainConfig,
  WebpackBuilderPluginClass,
} from '@x.render/render-builder';
import StaticAssetsWebpackPlugin from '@x.render/static-assets-webpack-plugin';
import StyleWebpackPlugin from '@x.render/style-webpack-plugin';
import OptimizationWebpackPlugin from '@x.render/optimization-webpack-plugin';
import ReactBabelWebpackPlugin from '@x.render/react-babel-webpack-plugin';
import ReactAppWebpackPlugin from '@x.render/react-app-webpack-plugin';
import { PluginOptions } from './types';

class BuildReactAppWebpackPlugin extends WebpackBuilderPluginClass {
  run(compiler: Compiler, config: ChainConfig, options: PluginOptions = {}) {
    const {
      // react-app-webpack-plugin options
      define,
      VConsole,
      alias,
      splitChunks,
      useAnalyzer,

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
      useRpx,

      // static-assets-webpack-plugin options
      imageSizeLimit,
      imageFilename,
      fontSizeLimit,
      fontFilename,

      // optimization-webpack-plugin options
      terserPluginOptions,
      cssMinimizerPluginOptions,
    } = options;
    ReactAppWebpackPlugin.getConfig(compiler, config, {
      define,
      VConsole,
      alias,
      splitChunks,
      useAnalyzer,
    });
    // Using configurations of other plugins.
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
      useRpx,
    });
    OptimizationWebpackPlugin.getConfig(compiler, config, {
      terserPluginOptions,
      cssMinimizerPluginOptions,
    });
    ReactBabelWebpackPlugin.getConfig(compiler, config, options);
    return config;
  }
}
export = BuildReactAppWebpackPlugin;
