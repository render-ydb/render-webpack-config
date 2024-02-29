import {
  Compiler,
  WebpackBuilderPluginClass,
  ChainConfig,
} from '@x.render/render-builder';
import { PluginOptions } from './types';

const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

export default class OptimizationWebpackPlugin extends WebpackBuilderPluginClass {
  run(compiler: Compiler, config: ChainConfig, options: PluginOptions) {
    const { terserPluginOptions = {}, cssMinimizerPluginOptions = {} } =
      options;

    const { context } = compiler;
    const { command } = context;
    if (command === 'build') {
      config.optimization.minimizer('TerserPlugin').use(TerserPlugin, [
        {
          parallel: true,
          extractComments: false,
          terserOptions: {
            sourceMap: true,
            keep_classnames: true,
            keep_fnames: true,
            compress: {
              unused: false,
            },
            output: {
              ascii_only: true,
              comments: false,
              beautify: false,
            },
            mangle: true,
          },
          ...terserPluginOptions,
        },
      ]);

      config.optimization
        .minimizer('CssMinimizerPlugin')
        .use(CssMinimizerPlugin, [
          {
            minimizerOptions: {
              preset: [
                'default',
                {
                  discardComments: {
                    removeAll: true,
                  },
                },
              ],
            },
            parallel: true,
            ...cssMinimizerPluginOptions,
          },
        ]);
    }
    return config;
  }
}

export * from './types';
