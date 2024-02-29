import Chain from 'webpack-chain';

import { ConfigParams } from '../types';

export = (config: Chain, options: ConfigParams) => {
  const { https } = options;
  config.devServer.hot(true);
  config.devServer.historyApiFallback(true);
  config.devServer.https(Boolean(https));
};
