import { PluginOptions as StylePluginOptions } from '@x.render/style-webpack-plugin';
import { PluginOptions as AssetPluginOptions } from '@x.render/static-assets-webpack-plugin';
import { PluginOptions as OptimizationPluginOptipns } from '@x.render/optimization-webpack-plugin';
import { PluginOptions as ReactAppWebpackPluginOptions } from '@x.render/react-app-webpack-plugin';

export type PluginOptions = Partial<{
  // react-app-webpack-plugin options
  define: ReactAppWebpackPluginOptions['define'];
  VConsole: ReactAppWebpackPluginOptions['VConsole'];
  alias: ReactAppWebpackPluginOptions['alias'];
  splitChunks: ReactAppWebpackPluginOptions['splitChunks'];
  useAnalyzer: ReactAppWebpackPluginOptions['useAnalyzer'];

  // style-webpack-plugin options
  miniCssExtractPluginLoaderOptions: StylePluginOptions['miniCssExtractPluginLoaderOptions'];
  styleLoaderOptions: StylePluginOptions['styleLoaderOptions'];
  cssLoaderOptions: StylePluginOptions['cssLoaderOptions'];
  lessLoaderOptions: StylePluginOptions['lessLoaderOptions'];
  sassLoaderOptions: StylePluginOptions['sassLoaderOptions'];
  postcssLoaderOptions: StylePluginOptions['postcssLoaderOptions'];
  miniCssExtractPluginOptions: StylePluginOptions['miniCssExtractPluginOptions'];
  inlineStyle: StylePluginOptions['inlineStyle'];
  styleSourceMap: StylePluginOptions['styleSourceMap'];
  useRpx: StylePluginOptions['useRpx'];

  // static-assets-webpack-plugin options
  imageSizeLimit: AssetPluginOptions['imageSizeLimit'];
  imageFilename: AssetPluginOptions['imageFilename'];
  fontSizeLimit: AssetPluginOptions['fontSizeLimit'];
  fontFilename: AssetPluginOptions['fontFilename'];

  // optimization-webpack-plugin options
  terserPluginOptions: OptimizationPluginOptipns['terserPluginOptions'];
  cssMinimizerPluginOptions: OptimizationPluginOptipns['cssMinimizerPluginOptions'];
}>;

export interface ConfigParams {
  rootDir: string;
  pkg: Record<string, any>;
  https: string;
  pluginOptions: PluginOptions;
}
