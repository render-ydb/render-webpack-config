import { ChainConfig, Json } from '@x.render/render-builder';
import { Mode } from '../types';
import getBabelConfig from '../babel';

const setLoaders = (
  mode: Mode = 'development',
  config: ChainConfig,
  options: Json,
) => {
  const babelConfig = getBabelConfig(mode === 'development');
  config.module
    .rule('babel-react')
    .test(/\.(js|mjs|jsx|ts|tsx)$/)
    .use('babel-loader')
    .loader(require.resolve('babel-loader'))
    .options(babelConfig);
};

export = setLoaders;
