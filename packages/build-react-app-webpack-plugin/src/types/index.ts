import { PluginOptions as StylePluginOptions } from '@x.render/style-webpack-plugin';
import { PluginOptions as AssetPluginOptions } from '@x.render/static-assets-webpack-plugin';
import { PluginOptions as OptimizationPluginOptipns } from '@x.render/optimization-webpack-plugin';
import { PluginOptions as ReactComponentWebpackPluginOptions } from '@x.render/react-component-webpack-plugin';

export interface SchemaProperty {
  [key: string]: {
    type: string | 'color' | number | 'textArea' | 'select';
    required: boolean;
    value: any;
    mockValue: any;
  };
}
export type Schema = Partial<{
  title: string;
  properties: SchemaProperty;
}>;

export interface PluginOptions {
  define?: ReactComponentWebpackPluginOptions['define'];
  VConsole?: ReactComponentWebpackPluginOptions['VConsole'];
  alias?: ReactComponentWebpackPluginOptions['alias'];
  entryDir?: ReactComponentWebpackPluginOptions['entryDir'];

  // style-webpack-plugin options
  miniCssExtractPluginLoaderOptions?: StylePluginOptions['miniCssExtractPluginLoaderOptions'];
  styleLoaderOptions?: StylePluginOptions['styleLoaderOptions'];
  cssLoaderOptions?: StylePluginOptions['cssLoaderOptions'];
  lessLoaderOptions?: StylePluginOptions['lessLoaderOptions'];
  sassLoaderOptions?: StylePluginOptions['sassLoaderOptions'];
  postcssLoaderOptions?: StylePluginOptions['postcssLoaderOptions'];
  miniCssExtractPluginOptions?: StylePluginOptions['miniCssExtractPluginOptions'];
  inlineStyle?: StylePluginOptions['inlineStyle'];
  styleSourceMap?: StylePluginOptions['styleSourceMap'];
  useRpx?: StylePluginOptions['useRpx'];

  // static-assets-webpack-plugin options
  imageSizeLimit?: AssetPluginOptions['imageSizeLimit'];
  imageFilename?: AssetPluginOptions['imageFilename'];
  fontSizeLimit?: AssetPluginOptions['fontSizeLimit'];
  fontFilename?: AssetPluginOptions['fontFilename'];

  // optimization-webpack-plugin options
  terserPluginOptions?: OptimizationPluginOptipns['terserPluginOptions'];
  cssMinimizerPluginOptions?: OptimizationPluginOptipns['cssMinimizerPluginOptions'];
}
