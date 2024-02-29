import { Mode, PluginOptions, Json, StyleRule, BaseCssOptions } from '../types';
import Chain from 'webpack-chain';
import {
  CSS,
  CSS_MODULE_REGEX,
  CSS_REGEX,
  CSS_MODULE,
  SCSS,
  SCSS_REGEX,
  SCSS_MODULE,
  SCSS_MODULE_REGEX,
  LESS,
  LESS_REGEX,
  LESS_MODULE,
  LESS_MODULE_REGEX,
  SASS,
  SASS_MODULE,
  SASS_MODULE_REGEX,
  SASS_REGEX,
} from '../constants';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const createCSSRule = (
  isEnvDevelopment: boolean,
  config: Chain,
  lang: string,
  test: RegExp,
  exclude?: RegExp,
  useModule?: boolean,
  loaderName?: string,
  loaderOptions?: Json,
  pluginOptions?: PluginOptions,
) => {
  const baseRule = config.module.rule(lang).test(test);
  if (exclude) {
    baseRule.exclude.add(exclude);
  }
  if (useModule) {
    applyLoaders(baseRule, true);
  } else {
    applyLoaders(baseRule, false);
  }

  function applyLoaders(rule: Chain.Rule<Chain.Module>, modules: boolean) {
    const {
      inlineStyle = false,
      styleSourceMap = true,
      cssLoaderOptions = {},
      lessLoaderOptions = {},
      miniCssExtractPluginLoaderOptions = {},
      sassLoaderOptions = {},
      styleLoaderOptions = {},
      postcssLoaderOptions = {},
    } = pluginOptions;

    if (inlineStyle) {
      rule
        .use('style-loader')
        .loader(require.resolve('style-loader'))
        .options({
          ...styleLoaderOptions,
        });
    } else {
      rule
        .use(MiniCssExtractPlugin.loader)
        .loader(MiniCssExtractPlugin.loader)
        .options({
          esModule: false, // Using require syntax to import style files
          ...miniCssExtractPluginLoaderOptions,
        });
    }

    const baseCssOptions: BaseCssOptions = {
      importLoaders: 1,
      // In development environment, source maps are outputted by default. In other environments, the output of source maps is determined by the configuration.
      sourceMap: !isEnvDevelopment ? styleSourceMap : true,
    };
    modules &&
      (baseCssOptions.modules = {
        localIdentName: '[folder]-[local]-[contenthash:8]',
      });

    rule
      .use('css-loader')
      .loader(require.resolve('css-loader'))
      .options({
        ...baseCssOptions,
        ...cssLoaderOptions,
      });
    rule
      .use('postcss-loader')
      .loader(require.resolve('postcss-loader'))
      .options({
        sourceMap: styleSourceMap,
        ...postcssLoaderOptions,
      });

    if (loaderName) {
      const resRule = rule.use(loaderName).loader(require.resolve(loaderName));
      if (loaderOptions) {
        if (loaderName.includes('less-loader')) {
          resRule.options({
            ...loaderOptions,
            ...lessLoaderOptions,
          });
        }
        if (loaderName.includes('sass-loader')) {
          resRule.options({
            ...loaderOptions,
            ...sassLoaderOptions,
          });
        }
      }
    }
  }
};

const setLoaders = (
  env: Mode = 'development',
  config: Chain,
  options: PluginOptions = {},
) => {
  const isEnvDevelopment = env === 'development';
  const styleRules: StyleRule[] = [
    [CSS, CSS_REGEX, CSS_MODULE_REGEX, false],
    [CSS_MODULE, CSS_MODULE_REGEX, undefined, true],
    [
      LESS,
      LESS_REGEX,
      LESS_MODULE_REGEX,
      false,
      'less-loader',
      { lessOptions: { javascriptEnabled: true } },
    ],
    [
      LESS_MODULE,
      LESS_MODULE_REGEX,
      undefined,
      true,
      'less-loader',
      { lessOptions: { javascriptEnabled: true } },
    ],
    [SCSS, SCSS_REGEX, SCSS_MODULE_REGEX, false, 'sass-loader'],
    [SCSS_MODULE, SCSS_MODULE_REGEX, undefined, true, 'sass-loader'],
    [SASS, SASS_REGEX, SASS_MODULE_REGEX, false, 'sass-loader'],
    [SASS_MODULE, SASS_MODULE_REGEX, undefined, true, 'sass-loader'],
  ];
  styleRules.forEach((item) => {
    const [lang, test, exclude, useModule, loaderName, loaderOptions] = item;
    createCSSRule(
      isEnvDevelopment,
      config,
      lang,
      test,
      exclude,
      useModule,
      loaderName,
      loaderOptions,
      options,
    );
  });
};
export = setLoaders;
