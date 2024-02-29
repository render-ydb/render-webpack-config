import { ChainConfig } from '@x.render/render-builder';

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const setPlugins = (config: ChainConfig) => {
  config.devtool('cheap-module-source-map');
  config.plugin('ReactRefreshWebpackPlugin').use(ReactRefreshWebpackPlugin, [
    {
      overlay: true,
    },
  ]);
};
export = setPlugins;
