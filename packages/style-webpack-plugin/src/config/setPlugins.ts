import Chain from 'webpack-chain';
import { PluginOptions } from '../types';
import {
  CSS,
  CSS_MODULE,
  LESS,
  LESS_MODULE,
  SASS,
  SASS_MODULE,
  SCSS,
  SCSS_MODULE,
} from '../constants';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPxToViewPort = require('postcss-px-to-viewport');

const setPlugins = (config: Chain, pluginOptions: PluginOptions) => {
  const {
    inlineStyle,
    miniCssExtractPluginOptions,
    useRpx = true,
  } = pluginOptions;
  if (!inlineStyle) {
    config.plugin('MiniCssExtractPlugin').use(MiniCssExtractPlugin, [
      {
        filename: '[name].css',
        ...miniCssExtractPluginOptions,
      },
    ]);
  }

  if (useRpx) {
    const styles = [
      CSS,
      CSS_MODULE,
      LESS,
      LESS_MODULE,
      SASS,
      SASS_MODULE,
      SCSS,
      SCSS_MODULE,
    ];
    styles.forEach((style) => {
      config.module
        .rule(style)
        .use('postcss-loader')
        .tap((options) => {
          return {
            ...options,
            postcssOptions: {
              plugins: [
                postcssPxToViewPort({
                  unitToConvert: 'rpx',
                  viewportWidth: 750,
                  unitPrecision: 5,
                  propList: ['*'],
                  viewportUnit: 'vw',
                  fontViewportUnit: 'vw',
                  selectorBlackList: [],
                  minPixelValue: 1,
                  mediaQuery: true,
                  replace: true,
                  exclude: [],
                }),
              ],
            },
          };
        });
    });
  }
};

export = setPlugins;
