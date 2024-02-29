export type Json = Record<string, any>;

export type StyleRule = [
  lang: string,
  test: RegExp,
  exclude?: RegExp,
  useModule?: boolean,
  loaderName?: string,
  loaderOptions?: Json
];

export interface BaseCssOptions {
  importLoaders?: number;
  sourceMap?: boolean;
  modules?: Json;
}

export type Mode = 'development' | 'production';

export interface PluginOptions {
  miniCssExtractPluginLoaderOptions?: Json;
  styleLoaderOptions?: Json;
  cssLoaderOptions?: Json;
  lessLoaderOptions?: Json;
  sassLoaderOptions?: Json;
  postcssLoaderOptions?: Json;
  miniCssExtractPluginOptions?: Json;
  inlineStyle?: boolean;
  styleSourceMap?: boolean;
  useRpx?: boolean;
}
