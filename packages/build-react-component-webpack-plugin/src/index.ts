import {
  Compiler,
  ChainConfig,
  WebpackBuilderPluginClass,
} from "@x.render/render-builder";
import EmitEsmCjsWebpackPlugin from "@x.render/emit-esm-cjs-webpack-plugin";
import StaticAssetsWebpackPlugin from "@x.render/static-assets-webpack-plugin";
import StyleWebpackPlugin from "@x.render/style-webpack-plugin";
import OptimizationWebpackPlugin from "@x.render/optimization-webpack-plugin";
import ReactBabelWebpackPlugin from "@x.render/react-babel-webpack-plugin";
import ReactComponentWebpackPlugin from "@x.render/react-component-webpack-plugin";
import { PluginOptions } from "./types";

class BuildReactComponentWebpackPlugin extends WebpackBuilderPluginClass {
  run(compiler: Compiler, config: ChainConfig, options: PluginOptions = {}) {
    const {
      // react-component-webpack-plugin options
      define,
      VConsole,
      alias,
      entryDir,
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
    ReactComponentWebpackPlugin.getConfig(compiler, config, {
      define,
      VConsole,
      alias,
      entryDir,
    });
    // Using configurations of other plugins.
    EmitEsmCjsWebpackPlugin.getConfig(compiler, config, { alias });
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
export = BuildReactComponentWebpackPlugin;
